import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActivePath = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                className="h-8 w-auto"
                src="/logo.svg" 
                alt="Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Soil Analysis
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActivePath('/') 
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-green-100'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/soil-reports"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActivePath('/soil-reports')
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-600 hover:bg-green-100'
              }`}
            >
              Soil Reports
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-green-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath('/')
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-green-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            <Link
              to="/soil-reports"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath('/soil-reports')
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-green-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Soil Reports
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};