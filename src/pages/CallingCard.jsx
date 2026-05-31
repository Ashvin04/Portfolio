import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import P5RansomText from '../components/P5RansomText';
import AJStar from '../components/AJStar';
import './CallingCard.css';

const CallingCard = ({ onNavClick }) => {
  const [copied, setCopied] = useState(false);

  // Setup motion values for 3D tilt effect
  const x = useMotionValue(200);
  const y = useMotionValue(100);

  // Map mouse positions to degrees of rotation
  const rotateX = useTransform(y, [0, 200], [10, -10]);
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(100);
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('ashvinjeevarasa20@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container" style={{ minHeight: '90vh', padding: '60px 0' }}>
      <div className="p5-card-page-wrapper">
        
        {/* Title */}
        <div style={{ marginBottom: '20px', marginTop: '10px' }}>
          <P5RansomText text="CONTACT" sizeMultiplier={1.5} />
        </div>

        <p style={{ 
          fontFamily: 'var(--font-p5-hand)', 
          fontSize: '1.5rem', 
          color: 'var(--p5-yellow)',
          textAlign: 'center',
          maxWidth: '500px',
          textShadow: '1px 1px 0 var(--p5-black)'
        }}>
          * Hover to inspect card in 3D. Click elements to interact.
        </p>

        {/* 3D Interactive Card Container */}
        <div className="p5-interactive-card-container">
          <motion.div
            className="p5-business-card"
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {/* AJ Star Logo on Card */}
            <div className="p5-card-bg-star">
              <AJStar size={110} animate={true} />
            </div>

            {/* Top row: Name & Subtitle Plate */}
            <div className="p5-card-top-row">
              <div className="p5-card-name-plate">
                <h2>Ashvin Jeevarasa</h2>
                <p>Gameplay and Systems Developer</p>
              </div>
            </div>

            {/* Middle row: Contact Strip (black block) */}
            <div className="p5-card-contact-strip">
              <div>
                <span className="label">EMAIL //</span>
                <span>ashvinjeevarasa20@gmail.com</span>
              </div>
              <div>
                <span className="label">PHONE //</span>
                <span>+44 7554 950625</span>
              </div>
            </div>

            {/* Bottom Row: Linkedin URL */}
            <a 
              href="https://www.linkedin.com/in/ashvin-jeevarasa" 
              target="_blank" 
              rel="noreferrer"
              className="p5-card-url-plate"
              style={{ display: 'block', alignSelf: 'flex-start' }}
            >
              www.linkedin.com/in/ashvin-jeevarasa
            </a>

          </motion.div>
        </div>

        {/* Interactive card controls */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          marginTop: '20px',
          width: '100%',
          maxWidth: '600px'
        }}>
          {/* Copy Email Button */}
          <button 
            onClick={copyEmail}
            style={{
              fontFamily: 'var(--font-p5-header)',
              fontSize: '1.2rem',
              backgroundColor: 'var(--p5-white)',
              color: 'var(--p5-black)',
              padding: '8px 20px',
              border: '3px solid var(--p5-black)',
              boxShadow: '4px 4px 0 var(--p5-red)',
              transform: 'skewX(-10deg)'
            }}
            className="p5-transition-snappy"
          >
            {copied ? 'EMAIL COPIED!' : 'COPY EMAIL ADDRESS'}
          </button>

          {/* Visit Linkedin Button */}
          <a 
            href="https://www.linkedin.com/in/ashvin-jeevarasa" 
            target="_blank" 
            rel="noreferrer"
            style={{
              fontFamily: 'var(--font-p5-header)',
              fontSize: '1.2rem',
              backgroundColor: 'var(--p5-red)',
              color: 'var(--p5-white)',
              padding: '8px 20px',
              border: '3px solid var(--p5-white)',
              boxShadow: '4px 4px 0 var(--p5-black)',
              transform: 'skewX(-10deg)',
              display: 'inline-block'
            }}
            className="p5-transition-snappy"
          >
            VISIT LINKEDIN PROFILE
          </a>
        </div>

        {/* Back Button */}
        <motion.button
          onClick={() => onNavClick('home')}
          className="p5-menu-item"
          style={{ fontSize: '1.8rem', marginTop: '40px' }}
        >
          ▲ SCROLL TO TOP
        </motion.button>

      </div>
    </div>
  );
};

export default CallingCard;
