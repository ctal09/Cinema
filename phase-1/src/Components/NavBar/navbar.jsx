// Navbar.js
import React from 'react';
import './Styles/navbar.css';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="../../Images/Logo.png" alt="Cinema Logo" className="logo" />
                <span className="cinema-name">Sital Cinema</span>
            </div>
            <ul className="navbar-categories">
                <li>Home</li>
                <li>Movies</li>
                <li>Shows</li>
                <li>Contact</li>
                <li>Categories</li>
            </ul>
            <div className="navbar-buttons">
                <button className="btn sign-in">Sign In</button>
                <button className="btn login">Login</button>
            </div>
        </nav>
    );
};

export default Navbar;
