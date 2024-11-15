// Navbar.jsx
import React, { useState } from 'react';
import './Styles/navbar.css';
import logo from '../../Images/Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="logo-container">
                    <img src={logo} alt="Cinema Logo" className="logo" />
                </div>
                <span className="cinema-name">Cinema Name</span>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                ☰
            </div>

            <ul className={`navbar-categories ${isMenuOpen ? 'active' : ''}`}>
                <li>Home</li>
                <li>Movies</li>
                <li>Shows</li>
                <li>Contact</li>
            </ul>

            <div className="navbar-buttons">
                <button className="btn sign-in">Sign In</button>
                <button className="btn login">Login</button>
            </div>
        </nav>
    );
};

export default Navbar;
