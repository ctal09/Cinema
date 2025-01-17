// Navbar.jsx
import React, { useState } from 'react';
import './Styles/navbar.css';
import logo from '../../Images/Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Signin from '../signin';  // Import the Signin component

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSignin, setShowSignin] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSigninClick = () => {
        setShowSignin(true);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <div className="logo-container">
                        <img src={logo} alt="Cinema Logo" className="logo" />
                    </div>
                    <span className="cinema-name">Sital's Hall</span>
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
                    <button onClick={handleSigninClick} className="btn sign-in">Sign In</button>
                    <button onClick={handleSigninClick} className="btn login">Login</button>
                </div>
            </nav>

            <Signin isOpen={showSignin} onClose={() => setShowSignin(false)} />
        </>
    );
};

export default Navbar;
