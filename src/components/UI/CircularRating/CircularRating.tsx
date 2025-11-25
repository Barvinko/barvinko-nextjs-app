import React, { useRef } from 'react';
import { useResponsiveSize } from '@utilities/useResponsiveSize';
import { useCircularRatingDrawing } from '@utilities/useCircularRatingDrawing';
import styles from './CircularRating.module.scss';

interface CircularRatingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const CircularRating: React.FC<CircularRatingProps> = ({
  percent,
  size = 45,
  strokeWidth = 2.5,
  className = '',
}) => {
  const percentInt = React.useMemo(() => Math.round(percent * 10), [percent]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentSize = useResponsiveSize(size);

  useCircularRatingDrawing({
    canvasRef,
    percentInt,
    currentSize,
    strokeWidth,
  });

  return (
    <div
      className={`${styles.circularRating} ${className}`}
      style={{ '--size': `${currentSize}px` } as React.CSSProperties}
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
          height={currentSize}
          width={currentSize}
          className={styles.circularRating__canvas}
        />
      </div>
    </div>
  );
};
