import React from 'react';
import { motion } from 'framer-motion';
import './P5SloganRibbon.css';

const P5SloganRibbon = ({ activeView }) => {
  const isHome = activeView === 'home';

  // Words configuration to get exactly the aesthetic from the reference image
  // Alternating styles, custom offsets, colors, and borders to look like cutout letters
  const sloganData = [
    {
      word: "TAKE",
      letters: [
        { char: "T", bg: "#ffffff", fg: "#080808", rotate: -5, skew: -5, border: "2px solid #080808" },
        { char: "A", bg: "#080808", fg: "#ffffff", rotate: 8, skew: 3, border: "none" },
        { char: "K", bg: "#ffffff", fg: "#080808", rotate: -4, skew: -2, border: "2px solid #080808" },
        { char: "E", bg: "#080808", fg: "#ffffff", rotate: 6, skew: 5, border: "none" }
      ]
    },
    {
      word: "YOUR",
      letters: [
        { char: "Y", bg: "#080808", fg: "#ffffff", rotate: -8, skew: -4, border: "none" },
        { char: "O", bg: "#ffffff", fg: "#080808", rotate: 4, skew: 2, border: "2px solid #080808" },
        { char: "U", bg: "#080808", fg: "#ffffff", rotate: -5, skew: -3, border: "none" },
        { char: "R", bg: "#ffffff", fg: "#080808", rotate: 7, skew: 5, border: "2px solid #080808" }
      ]
    },
    {
      word: "PLAYER",
      letters: [
        { char: "P", bg: "#ffffff", fg: "#080808", rotate: -6, skew: -6, border: "none" },
        { char: "L", bg: "#080808", fg: "#ffffff", rotate: 5, skew: 2, border: "none" },
        { char: "A", bg: "#ffffff", fg: "#080808", rotate: -3, skew: -4, border: "none" },
        { char: "Y", bg: "#080808", fg: "#ffffff", rotate: 8, skew: 5, border: "none" },
        { char: "E", bg: "#ffffff", fg: "#080808", rotate: -4, skew: -2, border: "none" },
        { char: "R", bg: "#080808", fg: "#ffffff", rotate: 6, skew: 4, border: "none" }
      ]
    }
  ];

  return (
    <motion.div 
      className="p5-slogan-ribbon-container"
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 18,
        delay: 0.2
      }}
    >
      <div className="p5-slogan-ribbon">
        <div className="p5-slogan-content">
          {sloganData.map((wordObj, wIdx) => (
            <div key={wIdx} className="p5-slogan-word">
              {wordObj.letters.map((letObj, lIdx) => {
                // Generate deterministic pseudo-random values for organic, offset animations
                const uniqueSeed = (wIdx * 4) + lIdx;
                const animDuration = 1.8 + (uniqueSeed % 3) * 0.4; // 1.8s to 2.6s
                const animDelay = (uniqueSeed % 4) * 0.15;

                return (
                  <motion.span
                    key={lIdx}
                    className="p5-slogan-letter-box"
                    style={{
                      backgroundColor: letObj.bg,
                      color: letObj.fg,
                      border: letObj.border
                    }}
                    initial={{ scale: 0, rotate: letObj.rotate, skewX: letObj.skew }}
                    animate={{
                      scale: 1,
                      y: [0, -7, 4, 0],
                      rotate: [letObj.rotate, letObj.rotate - 3, letObj.rotate + 4, letObj.rotate],
                      skewX: letObj.skew
                    }}
                    transition={{
                      scale: { type: "spring", stiffness: 300, damping: 14, delay: 0.4 + (uniqueSeed * 0.05) },
                      y: {
                        duration: animDuration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: animDelay
                      },
                      rotate: {
                        duration: animDuration * 1.1,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: animDelay
                      }
                    }}
                  >
                    {letObj.char}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default P5SloganRibbon;
