import React, { useState } from 'react';
import { motion } from 'framer-motion';
import P5RansomText from '../components/P5RansomText';
import AJStar from '../components/AJStar';
import './CallingCard.css';

const CallingCard = ({ onNavClick }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('ashvinjeevarasa20@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container" style={{ minHeight: 'auto', padding: '20px 0' }}>
      <div className="p5-card-page-wrapper">
        
        {/* Title */}
        <div style={{ marginBottom: '25px', marginTop: '10px' }}>
          <P5RansomText text="CONTACT" sizeMultiplier={1.5} />
        </div>

        <p className="p5-contact-subtitle">
          Get in touch with me
        </p>

        {/* Flat Contact Panel */}
        <motion.div 
          className="p5-contact-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 250, damping: 18 }}
        >
          {/* Subtle star pattern behind card */}
          <div className="p5-contact-star-decor">
            <AJStar size={130} animate={true} />
          </div>

          <div className="p5-contact-info-list">
            <div className="p5-contact-block email-block" onClick={copyEmail}>
              <div className="p5-contact-header">
                <span className="contact-tag">EMAIL //</span>
                <span className="contact-action">{copied ? 'COPIED!' : 'CLICK TO COPY'}</span>
              </div>
              <div className="contact-detail">ashvinjeevarasa20@gmail.com</div>
            </div>

            <a 
              href="https://www.linkedin.com/in/ashvin-jeevarasa" 
              target="_blank" 
              rel="noreferrer"
              className="p5-contact-block linkedin-block"
            >
              <div className="p5-contact-header">
                <span className="contact-tag">LINKEDIN //</span>
                <span className="contact-action">VISIT PROFILE</span>
              </div>
              <div className="contact-detail">linkedin.com/in/ashvin-jeevarasa</div>
            </a>
          </div>
        </motion.div>

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
