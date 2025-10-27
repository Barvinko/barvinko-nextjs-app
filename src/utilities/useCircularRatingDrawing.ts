import { RefObject, useEffect } from 'react';

export const ratingColor = {
  high: '#21d07a',
  medium: '#d2d531',
  low: '#db2360',
};

const getRatingColor = (percentInt: number) => {
  if (percentInt >= 70) return ratingColor.high;
  if (percentInt >= 40) return ratingColor.medium;
  return ratingColor.low;
};

interface DrawingProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  percentInt: number;
  currentSize: number;
  strokeWidth: number;
}

export const useCircularRatingDrawing = ({
  canvasRef,
  percentInt,
  currentSize,
  strokeWidth,
}: DrawingProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = currentSize / 2;
    const centerY = currentSize / 2;
    const radius = (currentSize - strokeWidth) / 2;

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
  }, [canvasRef, percentInt, currentSize, strokeWidth]);
};
