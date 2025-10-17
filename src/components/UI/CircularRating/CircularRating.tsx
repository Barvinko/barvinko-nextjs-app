import React, { useEffect, useRef } from 'react';
import styles from './CircularRating.module.scss';

interface CircularRatingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ratingColor = {
  high: '#21d07a',
  medium: '#d2d531',
  low: '#db2360',
};

export const CircularRating: React.FC<CircularRatingProps> = ({
  percent,
  size = 45,
  strokeWidth = 2.5,
  className = '',
}) => {
  const percentInt = Math.round(percent * 10);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRatingColor = (percentInt: number) => {
    if (percentInt >= 70) return ratingColor.high;
    if (percentInt >= 40) return ratingColor.medium;
    return ratingColor.low;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - strokeWidth) / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#313131ff';
    ctx.lineWidth = strokeWidth;
    ctx.stroke();

    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * percentInt) / 100;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = getRatingColor(percentInt);
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  }, [size, strokeWidth]);

  return (
    <div
      className={`${styles.circularRating} ${className}`}
      style={{ '--size': `${size}px` } as React.CSSProperties}
    >
      <div className={styles.circularRating__circle}>
        <div className={styles.circularRating__percent}>
          <span className={styles.circularRating__percentValue}>
            {percentInt}
          </span>
          <span className={styles.circularRating__percentSign}>%</span>
        </div>
        <canvas
          ref={canvasRef}
          height={size}
          width={size}
          className={styles.circularRating__canvas}
        />
      </div>
    </div>
  );
};
