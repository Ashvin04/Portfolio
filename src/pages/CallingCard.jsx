import React, { useState } from 'react';
import { motion } from 'framer-motion';
import P5RansomText from '../components/P5RansomText';
import AJStar from '../components/AJStar';
import './CallingCard.css';

const CV_URL = `${import.meta.env.BASE_URL}ashvin_jeevarasa_cv.pdf`;

const CallingCard = ({ onNavClick }) => {
  const [copied, setCopied] = useState(false);
  const [cvOpened, setCvOpened] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('ashvinjeevarasa20@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCvClick = (e) => {
    if (!cvOpened) {
      window.open(CV_URL, '_blank');
      setCvOpened(true);
      e.preventDefault();
    }
  };

  return (
    <div className="page-container" style={{ minHeight: 'auto', padding: '20px 0' }}>
      <div className="p5-card-page-wrapper">
        
        {/* Title */}
        <div style={{ marginBottom: '25px', marginTop: '10px' }}>
          <P5RansomText text="CONTACT" sizeMultiplier={1.5} />
        </div>

        <p className="p5-contact-subtitle">
          Get in touch with me or view my qualifications
        </p>

        {/* Two-column layout grid */}
        <div className="p5-contact-layout-grid">
          
          {/* Left Column: Contact Panel */}
          <motion.div 
            className="p5-contact-panel"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
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

          {/* Right Column: CV Panel */}
          <motion.div 
            className="p5-cv-panel"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <div className="p5-cv-star-decor">
              <AJStar size={150} animate={!cvOpened} />
            </div>

            <div className="p5-cv-card-content">
              <div className="p5-cv-title-section">
                <span className="p5-cv-badge">FILE STATUS</span>
                <h3 className="p5-cv-heading">CURRICULUM VITAE</h3>
              </div>

              {!cvOpened ? (
                <button
                  onClick={handleCvClick}
                  className="p5-cv-action-btn view-btn"
                >
                  <span className="btn-icon">👁</span> OPEN CV IN BROWSER
                </button>
              ) : (
                <a
                  href={CV_URL}
                  download="Ashvin_Jeevarasa_CV.pdf"
                  className="p5-cv-action-btn download-btn"
                >
                  <span className="btn-icon">▼</span> DOWNLOAD CV (PDF)
                </a>
              )}
              
              <div className="p5-cv-file-details">
                <span>FORMAT: PDF</span>
                <span>SIZE: ~6.7 KB</span>
              </div>
            </div>
          </motion.div>

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
