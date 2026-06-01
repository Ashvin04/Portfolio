import React from 'react';
import { motion } from 'framer-motion';

const AJStar = ({ size = 150, className = '', animate = true }) => {
  // SVG coordinates for a perfect centered 5-point star
  // Center is at 100, 100
  // SVG coordinates for an irregular, slanted, and dynamic 5-point star
  // Center is approximately at 100, 100
  const starPath = "M 92 10 L 122 72 L 192 60 L 134 110 L 165 172 L 97 127 L 32 156 L 58 100 L 10 75 L 70 68 Z";

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
        <g transform="translate(100, 100) scale(0.86) translate(-100, -100)">
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
            transform="translate(100, 100) scale(0.85) translate(-100, -100)"
          />

          {/* Inner White Accent Star Outline */}
          <path
            d={starPath}
            fill="none"
            stroke="var(--p5-white)"
            strokeWidth="2"
            strokeLinejoin="miter"
            transform="translate(100, 100) scale(0.72) translate(-100, -100)"
          />

          {/* "A.J" Text overlay styled and rotated */}
          <g transform="translate(100, 110) rotate(-10)">
            {/* Black background text for thick stroke outline */}
            <text
              x="0"
              y="0"
              textAnchor="middle"
              style={{ fontFamily: "'Persona5Menu', Impact, sans-serif" }}
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
              style={{ fontFamily: "'Persona5Menu', Impact, sans-serif" }}
              fontSize="38"
              fontWeight="bold"
              fill="var(--p5-white)"
              letterSpacing="-1"
            >
              A.J
            </text>
          </g>
        </g>
      </svg>
    </motion.div>
  );
};

export default AJStar;
