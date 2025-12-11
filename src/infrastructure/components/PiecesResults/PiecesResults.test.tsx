import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PiecesResults } from './PiecesResults';

describe('PiecesResults Component', () => {
  const defaultProps = {
    numberToMultiply: 5,
    value: 3,
    checkResult: false
  };

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <PiecesResults {...defaultProps} {...props} />
      </BrowserRouter>
    );
  };

  it('renders with calculated result', () => {
    renderComponent({ numberToMultiply: 5, value: 3 });
    expect(screen.getByText('= 15')).toBeInTheDocument();
  });

  it('calculates different results correctly', () => {
    renderComponent({ numberToMultiply: 9, value: 7 });
    expect(screen.getByText('= 63')).toBeInTheDocument();
  });

  it('shows error color indicator when checkResult is false', () => {
    renderComponent({ checkResult: false });
    const article = screen.getByRole('button', { name: /resultado: igual a 15/i });
    const indicator = article.querySelector('span[aria-hidden="true"]');
    expect(indicator).toHaveClass('bg-error');
  });

  it('shows success color indicator when checkResult is true', () => {
    renderComponent({ checkResult: true });
    const article = screen.getByRole('button', { name: /resultado: igual a 15/i });
    const indicator = article.querySelector('span[aria-hidden="true"]');
    expect(indicator).toHaveClass('bg-success');
  });

  it('renders empty piece when value is undefined', () => {
    renderComponent({ value: undefined });
    expect(screen.queryByText(/=/)).not.toBeInTheDocument();
  });

  it('has correct ID attribute', () => {
    renderComponent({ value: 7 });
    const element = screen.getByText('= 35').closest('article');
    expect(element).toHaveAttribute('id', 'result-index-7');
  });

  it('is draggable when isDraggable is true', () => {
    renderComponent({ isDraggable: true, value: 5 });
    const element = screen.getByText('= 25').closest('article');
    expect(element).toHaveAttribute('draggable', 'true');
  });

  it('has touch-none class when draggable', () => {
    renderComponent({ isDraggable: true, value: 5 });
    const element = screen.getByText('= 25').closest('article');
    expect(element).toHaveClass('touch-none');
  });

  it('applies correct Tailwind classes', () => {
    renderComponent({ value: 3 });
    const element = screen.getByText('= 15').closest('article');

    expect(element).toHaveClass('piece-base');
    expect(element).toHaveClass('piece-interactive');
  });
});
