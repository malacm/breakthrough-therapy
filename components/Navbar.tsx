import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Flower2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHomePage
          ? (scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6')
          : 'bg-white/90 backdrop-blur-md shadow-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-autumn-100 rounded-full group-hover:bg-autumn-200 transition-colors">
                <Flower2 className="h-6 w-6 text-autumn-700" />
            </div>
            <span className={`font-serif text-2xl font-bold tracking-tight ${
              isHomePage 
                ? (scrolled ? 'text-earth-800' : 'text-white')
                : 'text-autumn-600'
            }`}>
              Breakthrough
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wider transition-colors ${
                    isHomePage
                      ? scrolled 
                        ? `hover:text-autumn-600 ${isActive ? 'text-autumn-700 font-semibold' : 'text-earth-600'}`
                        : `text-white hover:text-autumn-200 ${isActive ? 'font-semibold' : ''}`
                      : `hover:text-autumn-700 ${isActive ? 'text-autumn-600 font-semibold' : 'text-autumn-600'}`
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isHomePage
                  ? (scrolled ? 'text-earth-600 hover:text-autumn-700' : 'text-white hover:text-autumn-200')
                  : 'text-autumn-600 hover:text-autumn-700'
              } focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-earth-100 shadow-lg transition-all duration-300 ease-in-out transform ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive ? 'text-autumn-700' : 'text-earth-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
