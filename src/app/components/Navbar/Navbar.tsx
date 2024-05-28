"use client"
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-gray-400 logo">Bloom IQ</div>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a className="text-gray-600 hover:text-gray-800">
            <button className="button-primary">Login</button>
          </a>
          <a href="#services" className="text-gray-600 hover:text-gray-800">
            Services
          </a>
          <a href="#contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </a>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden w-full">
          <a href="#home" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Home</a>
          <a href="#about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About</a>
          <a href="#services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Services</a>
          <a href="#contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contact</a>
        </div>
      )}
    </nav>
  );
};
export default Navbar;


