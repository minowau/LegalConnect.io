import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Menu, X, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Lawyers', path: '/lawyers' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'About', path: '/#about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Scale className={`h-8 w-8 transition-colors duration-300 ${
                isScrolled ? 'text-primary-600' : 'text-white'
              }`} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className={`h-3 w-3 transition-colors duration-300 ${
                  isScrolled ? 'text-accent-500' : 'text-accent-300'
                }`} />
              </motion.div>
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              LegalConnect AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? isScrolled
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-accent-300 bg-white/10'
                    : isScrolled
                      ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+1-800-LEGAL-AI"
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                : 'text-white hover:text-accent-300 hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className={`py-4 border-t ${
                isScrolled ? 'border-gray-200' : 'border-white/20'
              }`}>
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        isActive(item.path)
                          ? isScrolled
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-accent-300 bg-white/10'
                          : isScrolled
                            ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <a
                    href="tel:+1-800-LEGAL-AI"
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200 mt-4 ${
                      isScrolled
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </a>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;