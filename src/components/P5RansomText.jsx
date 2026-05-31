import React from 'react';

const P5RansomText = ({ text, className = '', sizeMultiplier = 1.0 }) => {
  if (!text) return null;

  return (
    <div 
      className={`p5-ransom-text-refactored ${className}`} 
      style={{ 
        display: 'inline-block', 
        fontFamily: 'var(--font-p5-ransom)', 
        fontWeight: 950,
        textTransform: 'uppercase',
        backgroundColor: 'var(--p5-white)',
        color: 'var(--p5-black)',
        padding: '6px 22px',
        border: '3px solid var(--p5-black)',
        boxShadow: '6px 6px 0 var(--p5-red)',
        transform: 'skewX(-12deg) rotate(-1.5deg)',
        fontSize: `${2.2 * sizeMultiplier}rem`,
        lineHeight: 1.1,
        letterSpacing: '-0.5px'
      }}
    >
      {text}
    </div>
  );
};

export default P5RansomText;
