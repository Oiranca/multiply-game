import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variantStyles = {
  primary:
    'bg-main text-second border-2 border-second hover:bg-second hover:text-main hover:border-main',
  secondary: 'bg-white text-main border-2 border-main hover:bg-main hover:text-second',
  outline:
    'bg-transparent border-4 border-dashed border-second text-second hover:bg-second hover:text-main',
  ghost: 'bg-transparent text-main hover:bg-main/10'
};

const sizeStyles = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'font-bold rounded-lg transition-colors duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';
    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
