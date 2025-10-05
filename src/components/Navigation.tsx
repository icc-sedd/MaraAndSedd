import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Close menu when a link is clicked
    setIsOpen(false);
    
    // Clear any existing timer
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      setAutoCloseTimer(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Set auto-close timer when menu opens
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000); // 3 seconds delay
      
      setAutoCloseTimer(timer);
      
      // Cleanup function
      return () => {
        clearTimeout(timer);
      };
    } else {
      // Clear timer if menu is closed manually
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        setAutoCloseTimer(null);
      }
    }
  }, [isOpen]);

  return (
    <nav className="nav">
      <div className="container">
        {/* Hamburger Button */}
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={handleNavClick}>Our Story</a></li>
          <li><a href="#entourage" onClick={handleNavClick}>Entourage</a></li>
          <li><a href="#details" onClick={handleNavClick}>Wedding Details</a></li>
          <li><a href="#what-to-wear" onClick={handleNavClick}>What to Wear</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;