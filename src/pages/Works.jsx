import React from 'react';
import { motion } from 'framer-motion';
import P5RansomText from '../components/P5RansomText';
import './Works.css';
import { useNavigate } from 'react-router-dom';

const Works = ({ onNavClick }) => {
  const navigate = useNavigate();
  const projects = [
    {
      id: 'project-knockout',
      title: 'KNOCK OUT',
      genre: 'MULTIPLAYER HEX BRAWLER',
      desc: 'Physics-based multiplayer hex brawler where players are tethered together. Built at Staffs Uni. Features custom server-authoritative netcode, camera tracking, and adaptive audio integration.',
      featured: true,
      platform: 'Unity / C#',
      leftTags: ['Netcode Sync', 'Dynamic Camera System', 'Adaptive Audio', 'UI Toolkit UI'],
      rightTags: ['Shrinking Battle Map', 'Deep Combat Mechanic', 'Rogue-lite Catch-Up']
    },
    {
      id: '2d-platformer',
      title: '2D PLATFORMER',
      genre: 'ENERGY-DRIVEN PLATFORMER',
      desc: 'Fast-paced Unity platformer featuring responsive coyote time physics, a slow-motion energy management resource, and decoupled ScriptableObject event channels.',
      featured: false,
      platform: 'Unity / C#',
      image: 'images/documentation/platformer_main_screenshot.png'
    },
    {
      id: 'unity-vr',
      title: 'UNITY VR FRAMEWORK',
      genre: 'XR INTERACTION SHOWCASE',
      desc: 'An immersive Unity VR interaction framework extending the XR Interaction Toolkit (XRI). Features custom velocity-based physical combat, look-rotation two-handed grip mechanics, exclusive tag sockets, and sensory intoxication shaders.',
      featured: false,
      platform: 'Unity / C#',
      image: 'images/documentation/vr_editor_screenshot.png'
    }
  ];

  return (
    <div className="page-container" style={{ minHeight: 'auto', padding: '20px 0' }}>
      <div className="p5-works-container">
        
        {/* Title */}
        <div style={{ marginBottom: '20px', marginTop: '10px' }}>
          <P5RansomText text="PROJECTS" sizeMultiplier={1.5} />
        </div>

        {/* Featured Project - KNOCK OUT */}
        {projects.filter(p => p.featured).map(proj => (
          <motion.div 
            key={proj.id}
            className="p5-featured-project"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            onClick={() => navigate('/project/' + proj.id)}
            style={{ cursor: 'pointer' }}
          >
            {/* Red Lava Glow Backdrop */}
            <div className="knockout-lava-bg"></div>

            {/* Header Area */}
            <div className="p5-featured-header">
              <div className="p5-featured-title-wrap">
                <div style={{ 
                  display: 'inline-block', 
                  fontFamily: 'var(--font-p5-hand)', 
                  fontSize: '2.8rem',
                  backgroundColor: 'var(--p5-white)',
                  color: 'var(--p5-black)',
                  padding: '2px 22px 6px 22px',
                  border: '3px solid var(--p5-black)',
                  boxShadow: '6px 6px 0 var(--p5-red)',
                  transform: 'skewX(-12deg) rotate(-2deg)',
                  lineHeight: 1.0,
                  letterSpacing: '1px'
                }}>
                  {proj.title}
                </div>
                <span className="p5-featured-subtitle">{proj.genre}</span>
              </div>
              <div className="p5-badge-unity">{proj.platform}</div>
            </div>

            {/* Content Body */}
            <div className="p5-featured-content">
              {/* Left Column: Real game showcase image instead of mock vector drawing */}
              <div className="p5-project-mockup" style={{ backgroundColor: '#0f0f0f' }}>
                <img 
                  src={`${import.meta.env.BASE_URL}images/documentation/KnockOutShowcaseImage.png`} 
                  alt="Knock Out Showcase" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 1
                  }}
                />
              </div>

              {/* Right Column: Detailed info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#eaeaea' }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="p5-tag-column">
                    {proj.leftTags.map(t => (
                      <div key={t} className="p5-feature-tag">{t}</div>
                    ))}
                  </div>
                  <div className="p5-tag-column">
                    {proj.rightTags.map(t => (
                      <div key={t} className="p5-feature-tag right-tag">{t}</div>
                    ))}
                  </div>
                </div>
                
                <div style={{
                  fontFamily: 'var(--font-p5-hand)',
                  fontSize: '1.4rem',
                  color: 'var(--p5-yellow)',
                  marginTop: '5px',
                  textAlign: 'right'
                }}>
                  * CLICK CARD TO VIEW DETAILS
                </div>
              </div>

            </div>
          </motion.div>
        ))}

        {/* Secondary Projects Grid */}
        <h3 style={{ fontFamily: 'var(--font-p5-header)', fontWeight: 900, fontSize: '2rem', borderBottom: '3px double var(--p5-white)', paddingBottom: '5px', marginTop: '10px' }}>
          OTHER PROJECTS
        </h3>

        <div className="p5-projects-grid">
          {projects.filter(p => !p.featured).map((proj, index) => (
            <motion.div
              key={proj.id}
              className="p5-project-card"
              initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
              onClick={() => navigate('/project/' + proj.id)}
            >
              <div className="p5-card-header">
                <div className="p5-card-title">{proj.title}</div>
                <div className="p5-card-genre">{proj.genre}</div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flex: 1, marginBottom: '15px', flexWrap: 'wrap' }}>
                {proj.image && (
                  <div style={{
                    width: '220px',
                    height: '130px',
                    flexShrink: 0,
                    overflow: 'hidden',
                    border: '2px solid var(--p5-black)',
                    boxShadow: '4px 4px 0 var(--p5-black)',
                    position: 'relative',
                    backgroundColor: '#000',
                    transform: 'skewX(-4deg)'
                  }}>
                    <img 
                      src={`${import.meta.env.BASE_URL}${proj.image}`} 
                      alt={proj.title} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}
                <div className="p5-card-desc" style={{ margin: 0, fontSize: '1rem', lineHeight: '1.5', flex: '1 1 200px' }}>
                  {proj.desc}
                </div>
              </div>
              <div className="p5-card-action">
                STATUS: VIEW DETAILS ▶
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <motion.button
            onClick={() => onNavClick('home')}
            className="p5-menu-item"
            style={{ fontSize: '1.8rem' }}
          >
            ▲ SCROLL TO TOP
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default Works;
