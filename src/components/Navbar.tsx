import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Scroll to top of page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    setIsOpen(false);
    
    // Clear any existing timer
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      setAutoCloseTimer(null);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close menu functionality
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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <a href="#" onClick={handleBrandClick}>
            <span className="brand-text">Sedd & Mara</span>
            <span className="brand-date">December 13, 2025</span>
          </a>
        </div>

        {/* Hamburger Button */}
        <button 
          className={`navbar-hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={handleNavClick}>Our Story</a></li>
          <li><a href="#entourage" onClick={handleNavClick}>Entourage</a></li>
          <li><a href="#details" onClick={handleNavClick}>Wedding Details</a></li>
          <li><a href="#what-to-wear" onClick={handleNavClick}>What to Wear</a></li>
          <li><a href="#photos" onClick={handleNavClick}>Photos</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
