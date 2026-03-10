import React from 'react';

interface BrandLogoProps {
  /** If true, displays the compact "TSD" mark. If false, displays "The Swift Dictionary" */
  short?: boolean;
  /** Pass Tailwind classes to control text size, color, margins, etc. */
  className?: string;
  /** Optional override for the HTML tag, defaults to span */
  as?: React.ElementType;
}

export default function BrandLogo({ short = false, className = '', as: Component = 'span' }: BrandLogoProps) {
  // Core visual logo properties perfectly tuned by the user.
  const coreStyles = "font-branding font-medium ![-webkit-text-stroke:0.5px_currentColor]";
  
  // The short 'TSD' logo uses tight tracking to pull the monolith letters together.
  const tracking = short ? "tracking-[-0.1em]" : "";

  return (
    <Component className={`${coreStyles} ${tracking} ${className}`.trim()}>
      {short ? "TSD" : "The Swift Dictionary"}
    </Component>
  );
}
