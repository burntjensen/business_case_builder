import { useState, useEffect } from 'react';

/**
 * Navbar - Together Platform style navigation bar
 * 
 * A responsive navigation component with:
 * - Desktop: horizontal layout with logo, nav links, and CTA
 * - Mobile: hamburger menu with slide-down panel
 * - Sticky positioning with subtle shadow on scroll
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: 'https://www.togetherplatform.com/' },
    { name: 'Product', href: 'https://www.togetherplatform.com/mentoring-software' },
    { name: 'Customers', href: 'https://www.togetherplatform.com/customers' },
    { name: 'Pricing', href: 'https://www.togetherplatform.com/pricing' },
  ];

  const ctaLink = 'https://www.togetherplatform.com/book-a-demo';

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-gray-100'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="https://www.togetherplatform.com/"
            className="flex-shrink-0 flex items-center"
            aria-label="Together Platform Home"
          >
            <img
              src="https://cdn.prod.website-files.com/5ce11396d0cadb55a02cabf7/68a771b67a13cee7e403af5d_Together%20Platform%20Logo.svg.svg"
              alt="Together Platform"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-gray-700 hover:text-brand-indigo hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex lg:items-center">
            <a
              href={ctaLink}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-brand-indigo bg-brand-yellow rounded-lg hover:bg-amber-400 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow"
            >
              Get a Demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-indigo hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-indigo transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">
              {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            </span>
            {/* Hamburger Icon */}
            <svg
              className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            {/* Close Icon */}
            <svg
              className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 text-gray-700 hover:text-brand-indigo hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <a
                href={ctaLink}
                className="block w-full text-center px-6 py-3 text-base font-semibold text-brand-indigo bg-brand-yellow rounded-lg hover:bg-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow"
              >
                Get a Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;

