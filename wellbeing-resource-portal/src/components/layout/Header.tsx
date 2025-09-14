import React from 'react';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  tagline,
  className = '',
}) => {
  return (
    <header className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-black mb-1" style={{fontFamily: 'serif'}}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-black" style={{fontFamily: 'serif'}}>
              {subtitle}
            </p>
          )}
        </div>
        {tagline && (
          <p className="text-sm text-black" style={{fontFamily: 'serif'}}>
            {tagline}
          </p>
        )}
      </div>
    </header>
  );
};
