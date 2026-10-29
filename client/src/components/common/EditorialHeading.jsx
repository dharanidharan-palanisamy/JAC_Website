import React from 'react';

/**
 * EditorialHeading
 * Standard signature typography pairing for JAC MediaLand:
 * Elegant Playfair Display Italic prefix + Bold Modern Manrope suffix.
 * Inspired by the reference: "About" (Playfair Display Italic) + "JAC MediaLand" (Manrope Extrabold).
 *
 * Examples:
 * <EditorialHeading italic="About" bold="JAC MediaLand" />
 * <EditorialHeading italic="Our" bold="Services" />
 * <EditorialHeading italic="Our" bold="Work" />
 * <EditorialHeading italic="About" bold="Us" />
 * <EditorialHeading italic="Our" bold="Mission" />
 * <EditorialHeading italic="Why Choose" bold="Us" />
 * <EditorialHeading italic="Careers at" bold="JAC MediaLand" />
 * <EditorialHeading italic="Contact" bold="Us" />
 * <EditorialHeading italic="Our" bold="Programs" />
 */
const EditorialHeading = ({
  italic = '',
  bold = '',
  as: Component = 'div',
  size = 'default', // 'hero' | 'section' | 'eyebrow' | 'badge' | 'default'
  className = '',
  italicClassName = '',
  boldClassName = '',
  children
}) => {
  let sizeClasses = '';
  switch (size) {
    case 'hero':
      sizeClasses = 'text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[1.08]';
      break;
    case 'section':
      sizeClasses = 'text-3xl sm:text-5xl font-bold tracking-tight leading-[1.15]';
      break;
    case 'eyebrow':
      sizeClasses = 'text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug';
      break;
    case 'badge':
      sizeClasses = 'text-sm sm:text-base tracking-wide';
      break;
    case 'default':
    default:
      sizeClasses = 'text-xl sm:text-2xl md:text-3xl tracking-tight';
      break;
  }

  return (
    <Component className={`${sizeClasses} ${className} inline-flex items-baseline gap-2 flex-wrap`}>
      {italic && (
        <span className={`font-serif-italic font-normal text-neutral-800 ${italicClassName}`}>
          {italic}
        </span>
      )}
      {bold && (
        <span className={`font-sans font-extrabold text-neutral-900 tracking-tight ${boldClassName}`}>
          {bold}
        </span>
      )}
      {children}
    </Component>
  );
};

export default EditorialHeading;

