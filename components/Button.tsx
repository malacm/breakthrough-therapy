import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-300 font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-autumn-600 text-white hover:bg-autumn-700 shadow-lg hover:shadow-xl focus:ring-autumn-500",
  secondary: "bg-earth-200 text-earth-800 hover:bg-earth-300 shadow-sm focus:ring-earth-400",
  outline: "border-2 border-autumn-600 text-autumn-700 hover:bg-autumn-50 focus:ring-autumn-500",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => (
  <button
    className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => (
  <a
    className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </a>
);
