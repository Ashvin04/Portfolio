import React from 'react';
import { motion } from 'framer-motion';

const AJStar = ({ size = 150, className = '', animate = true }) => {
  // SVG coordinates for a perfect centered 5-point star
  // Center is at 100, 100
  const starPath = "M 100 15 L 125 70 L 185 70 L 138 105 L 155 165 L 100 130 L 45 165 L 62 105 L 15 70 L 75 70 Z";

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size, display: 'inline-block' }}
      whileHover={animate ? { 
        scale: 1.15,
        rotate: [0, -8, 8, 0],
        transition: { type: 'spring', stiffness: 500, damping: 10 } 
      } : {}}
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        style={{ filter: 'drop-shadow(4px 6px 0px rgba(0, 0, 0, 0.9))' }}
      >
        {/* Layer 1: Outer Black Star (Shadow/Outline base) */}
        <path
          d={starPath}
          fill="var(--p5-black)"
          stroke="var(--p5-black)"
          strokeWidth="14"
          strokeLinejoin="miter"
          transform="translate(0, 0)"
        />

        {/* Layer 2: White Star Border */}
        <path
          d={starPath}
          fill="var(--p5-white)"
          stroke="var(--p5-white)"
          strokeWidth="8"
          strokeLinejoin="miter"
        />

        {/* Layer 3: Inner Black Star */}
        <path
          d={starPath}
          fill="var(--p5-black)"
          stroke="var(--p5-black)"
          strokeWidth="2"
          strokeLinejoin="miter"
          transform="scale(0.88) translate(13, 15)"
        />

        {/* Inner White Accent Star Outline */}
        <path
          d={starPath}
          fill="none"
          stroke="var(--p5-white)"
          strokeWidth="2"
          strokeLinejoin="miter"
          transform="scale(0.78) translate(28, 30)"
        />

        {/* "A.J" Text overlay styled and rotated */}
        <g transform="translate(100, 110) rotate(-10)">
          {/* Black background text for thick stroke outline */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontFamily="var(--font-p5-menu)"
            fontSize="38"
            fontWeight="bold"
            fill="var(--p5-black)"
            stroke="var(--p5-black)"
            strokeWidth="8"
            letterSpacing="-1"
          >
            A.J
          </text>
          {/* Main White Text */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontFamily="var(--font-p5-menu)"
            fontSize="38"
            fontWeight="bold"
            fill="var(--p5-white)"
            letterSpacing="-1"
          >
            A.J
          </text>
        </g>
      </svg>
    </motion.div>
  );
};

export default AJStar;
