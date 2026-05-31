import { motion } from 'framer-motion';
import AJStar from './AJStar';
import './Header.css';

const Header = ({ activeView, onNavClick }) => {
  const menuItems = [
    { id: 'home', label: 'HOME', num: '01' },
    { id: 'programmer', label: 'ABOUT', num: '02' },
    { id: 'works', label: 'PROJECTS', num: '03' },
    { id: 'card', label: 'CONTACT', num: '04' }
  ];

  return (
    <header className="p5-header">
      <div className="p5-header-left" onClick={() => onNavClick('home')} style={{ minWidth: '95px', minHeight: '95px', display: 'flex', alignItems: 'center' }}>
        {activeView !== 'home' && (
          <motion.div 
            layoutId="shared-star" 
            style={{ display: 'inline-block' }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <AJStar size={85} animate={true} />
          </motion.div>
        )}
      </div>
      
      <nav className="p5-header-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            className={`p5-nav-btn ${activeView === item.id ? 'active' : ''}`}
          >
            <span className="num">{item.num}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
