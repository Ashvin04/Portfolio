import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '5rem', minHeight: '80vh' }}>
      <div className="jagged-border" style={{ backgroundColor: 'var(--stark-white)', padding: '2rem', display: 'inline-block' }}>
        <h1 className="text-stroke" style={{ fontSize: '4rem', color: 'var(--midnight-black)' }}>ABOUT ME</h1>
      </div>
      <div className="jagged-border-alt" style={{ backgroundColor: 'var(--phantom-red)', padding: '2rem', marginTop: '2rem', maxWidth: '600px' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          PLACEHOLDER: Add your "About Me" blurb and contact information here.
        </p>
      </div>
    </div>
  );
};

export default About;
