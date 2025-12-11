import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PiecesNumbers } from './PiecesNumbers';

describe('PiecesNumbers Component', () => {
  const defaultProps = {
    numberToMultiply: 5,
    value: 3,
    checkOperation: false,
    onClickTable: undefined
  };

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <PiecesNumbers {...defaultProps} {...props} />
      </BrowserRouter>
    );
  };

  it('renders with multiplication expression', () => {
    renderComponent();
    expect(screen.getByText('5×3')).toBeInTheDocument();
  });

  it('shows error color indicator when checkOperation is false', () => {
    renderComponent({ checkOperation: false });
    const article = screen.getByRole('button', { name: /operación: 5 por 3/i });
    const indicator = article.querySelector('span[aria-hidden="true"]');
    expect(indicator).toHaveClass('bg-error');
  });

  it('shows success color indicator when checkOperation is true', () => {
    renderComponent({ checkOperation: true });
    const article = screen.getByRole('button', { name: /operación: 5 por 3/i });
    const indicator = article.querySelector('span[aria-hidden="true"]');
    expect(indicator).toHaveClass('bg-success');
  });

  it('has correct ID attribute', () => {
    renderComponent({ value: 7 });
    const element = screen.getByText('5×7').closest('article');
    expect(element).toHaveAttribute('id', 'number-index-7');
  });

  it('applies correct Tailwind classes', () => {
    renderComponent();
    const element = screen.getByText('5×3').closest('article');

    expect(element).toHaveClass('piece-base');
    expect(element).toHaveClass('piece-interactive');
  });

  it('renders different multiplication values correctly', () => {
    renderComponent({ numberToMultiply: 9, value: 8 });
    expect(screen.getByText('9×8')).toBeInTheDocument();
  });

  it('has accessibility attributes', () => {
    renderComponent();
    const element = screen.getByRole('button');
    expect(element).toHaveAttribute('aria-label', 'Operación: 5 por 3');
    expect(element).toHaveAttribute('tabIndex', '0');
  });
});
