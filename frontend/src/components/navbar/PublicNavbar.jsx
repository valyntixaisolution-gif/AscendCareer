import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PublicNavbar.css';

const PublicNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const exploreRef = useRef(null);
  const langRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleLangChange = (lang) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
          {/* Left: Brand */}
          <div className="navbar-brand">
            <Link to="/" className="brand-logo" aria-label="GlobalCareer Home">
              <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="brand-text">GlobalCareer</span>
            </Link>
          </div>

          {/* Center: Primary Navigation (Desktop) */}
          <div className="navbar-links">
            {/* Explore Dropdown */}
            <div className="nav-item dropdown" ref={exploreRef}>
              <button
                className="nav-link dropdown-trigger"
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                onMouseEnter={() => setIsExploreOpen(true)}
                aria-expanded={isExploreOpen}
                aria-haspopup="true"
              >
                Explore
                <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isExploreOpen && (
                <div className="dropdown-menu" onMouseLeave={() => setIsExploreOpen(false)}>
                  <Link to="/about" className="dropdown-item">About</Link>
                  <Link to="/career" className="dropdown-item">Career</Link>
                  <Link to="/contact" className="dropdown-item">Contact Us</Link>
                  <Link to="/how-it-works" className="dropdown-item">How It Works</Link>
                </div>
              )}
            </div>

            <Link to="/learn" className="nav-link">Learn</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/support" className="nav-link">Support</Link>
            <Link to="/community" className="nav-link">Community</Link>
          </div>

          {/* Right: Language & Actions */}
          <div className="navbar-actions">
            {/* Language Selector */}
            <div className="lang-selector" ref={langRef}>
              <button
                className="lang-trigger"
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-expanded={isLangOpen}
                aria-label="Select language"
              >
                <span className="lang-flag">{currentLang}</span>
                <svg className="lang-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isLangOpen && (
                <div className="lang-menu">
                  <button className="lang-option" onClick={() => handleLangChange('EN')}>🇬🇧 EN</button>
                  <button className="lang-option" onClick={() => handleLangChange('ES')}>🇪🇸 ES</button>
                  <button className="lang-option" onClick={() => handleLangChange('FR')}>🇫🇷 FR</button>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <Link to="/become-student" className="btn btn-secondary">Become a Student</Link>
            <Link to="/login" className="btn btn-text">Sign In</Link>
            <Link to="/register" className="btn btn-primary">Join</Link>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <span className="mobile-brand">GlobalCareer</span>
              <button
                className="mobile-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mobile-menu-content">
              {/* Explore Section */}
              <div className="mobile-section">
                <button
                  className="mobile-section-title"
                  onClick={() => setIsExploreOpen(!isExploreOpen)}
                >
                  Explore
                  <svg className={`mobile-chevron ${isExploreOpen ? 'open' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {isExploreOpen && (
                  <div className="mobile-submenu">
                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link to="/career" onClick={() => setIsMobileMenuOpen(false)}>Career</Link>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                    <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
                  </div>
                )}
              </div>

              <Link to="/learn" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Learn</Link>
              <Link to="/blog" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <Link to="/support" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Support</Link>
              <Link to="/community" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Community</Link>

              {/* Language Selector Mobile */}
              <div className="mobile-lang">
                <span className="mobile-lang-label">Language:</span>
                <div className="mobile-lang-options">
                  <button className={currentLang === 'EN' ? 'active' : ''} onClick={() => handleLangChange('EN')}>EN</button>
                  <button className={currentLang === 'ES' ? 'active' : ''} onClick={() => handleLangChange('ES')}>ES</button>
                  <button className={currentLang === 'FR' ? 'active' : ''} onClick={() => handleLangChange('FR')}>FR</button>
                </div>
              </div>

              {/* Mobile CTAs */}
              <div className="mobile-ctas">
                <Link to="/become-student" className="btn btn-secondary btn-block" onClick={() => setIsMobileMenuOpen(false)}>Become a Student</Link>
                <Link to="/login" className="btn btn-text btn-block" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/register" className="btn btn-primary btn-block" onClick={() => setIsMobileMenuOpen(false)}>Join</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PublicNavbar;