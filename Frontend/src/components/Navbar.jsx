import React, { useState } from "react";
import {
  FaFilePdf,
  FaHome,
  FaEnvelope,
  FaFileWord,
  FaTimes,
  FaBars,
} from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-2xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-xl shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <FaFilePdf className="text-2xl text-red-500" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  PURE<span className="text-yellow-300">PDF</span>
                </h1>
                <p className="text-xs text-purple-200 -mt-1">by Abhi Poddar</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 group"
              >
                <FaHome className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Home</span>
              </a>
              <a
                href="#features"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 group"
              >
                <FaFileWord className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Features</span>
              </a>
              <a
                href="#contact"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 group"
              >
                <FaEnvelope className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Contact</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-yellow-300 focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-64 opacity-100 pb-4"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 rounded-lg mt-2 backdrop-blur-sm">
              <a
                href="#home"
                className="flex items-center space-x-3 px-3 py-3 text-white hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Home</span>
              </a>
              <a
                href="#features"
                className="flex items-center space-x-3 px-3 py-3 text-white hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaFileWord className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Features</span>
              </a>
              <a
                href="#contact"
                className="flex items-center space-x-3 px-3 py-3 text-white hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaEnvelope className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Contact</span>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500"></div>
      </nav>
    </>
  );
}

export default Navbar;
