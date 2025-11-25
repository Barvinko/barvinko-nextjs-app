import { render, screen } from '@testing-library/react';
import { CircularRating } from './CircularRating';
import { ratingColor } from '@utilities/useCircularRatingDrawing';

const resizeWindow = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('CircularRating Component', () => {
  let mockCtx: CanvasRenderingContext2D;

  beforeEach(() => {
    mockCtx = {
      beginPath: jest.fn(),
      arc: jest.fn(),
      stroke: jest.fn(),
      strokeStyle: '',
      lineWidth: 0,
      lineCap: '',
    } as unknown as CanvasRenderingContext2D;

    jest
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue(mockCtx as unknown as CanvasRenderingContext2D);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render with default props', () => {
    const { container } = render(<CircularRating percent={7.5} />);
    const canvas = container.querySelector('canvas');

    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '45');
    expect(canvas).toHaveAttribute('height', '45');
  });

  it('should display rounded percent value', () => {
    render(<CircularRating percent={7.38} />);
    expect(screen.getByText('74')).toBeInTheDocument();
  });

  it('should resize when with < 480 ', () => {
    resizeWindow(460);
    const { container } = render(<CircularRating percent={7} size={100} />);
    const canvas = container.querySelector('canvas');

    expect(canvas).toHaveAttribute('width', '70');
    expect(canvas).toHaveAttribute('height', '70');
  });

  it('should resize when with < 768 ', () => {
    resizeWindow(760);
    const { container } = render(<CircularRating percent={7} size={100} />);
    const canvas = container.querySelector('canvas');

    expect(canvas).toHaveAttribute('width', '85');
    expect(canvas).toHaveAttribute('height', '85');
  });

  describe('Rating Color', () => {
    it('should set green stroke color for high rating (>= 70%)', () => {
      render(<CircularRating percent={70} />);
      expect(mockCtx.strokeStyle).toBe(ratingColor.high);
    });

    it('should set yellow stroke color for high rating (>= 40%)', () => {
      render(<CircularRating percent={4} />);
      expect(mockCtx.strokeStyle).toBe(ratingColor.medium);
    });

    it('should set red stroke color for high rating (<= 40%)', () => {
      render(<CircularRating percent={0} />);
      expect(mockCtx.strokeStyle).toBe(ratingColor.low);
    });
  });
});
