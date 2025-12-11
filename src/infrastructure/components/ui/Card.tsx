import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10 md:p-12'
};

export const Card: React.FC = ({ children, className = '', padding = 'md' }) => {
  const baseStyles =
    'bg-second border-2 border-main shadow-main rounded-lg';

  return (
    <div className={`${baseStyles} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};
