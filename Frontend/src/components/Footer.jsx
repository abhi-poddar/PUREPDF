import React from "react";
import {
  FaHeart,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded-xl">
                  <span className="text-2xl font-bold text-purple-600">
                    PDF
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    PURE<span className="text-yellow-300">PDF</span>
                  </h3>
                  <p className="text-purple-200 text-sm">Document Converter</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transform your Word documents into professional PDFs with ease.
                Fast, secure, and completely free - making document conversion
                simple for everyone.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors duration-300"
                >
                  <FaGithub className="text-lg" />
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300"
                >
                  <FaLinkedin className="text-lg" />
                </a>
                <a
                  href="#"
                  className="bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition-colors duration-300"
                >
                  <FaTwitter className="text-lg" />
                </a>
                <a
                  href="#"
                  className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors duration-300"
                >
                  <FaEnvelope className="text-lg" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-300">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-300">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Report Issue
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 text-gray-300 mb-4 md:mb-0">
                <span>Made with</span>
                <FaHeart className="text-red-500 text-sm" />
                <span>by</span>
                <span className="text-yellow-300 font-semibold">
                  Abhi Poddar
                </span>
              </div>
              <div className="text-gray-400 text-sm">
                © 2024 PUREPDF • Developed by Abhi Poddar • All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
