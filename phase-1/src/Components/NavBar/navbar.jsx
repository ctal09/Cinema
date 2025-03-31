import React, { useState, useEffect } from 'react';
import './Styles/navbar.css';
import logo from '../../Images/Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Signin from '../signin';
import SignupModal from '../adduser';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Retrieve login state from localStorage
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
            setLoggedIn(true);
            setUserRole(storedRole);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSigninClick = () => {
        setShowSignin(true);
    };

    const handleSignUpClick = () => {
        setShowSignUp(true);
    };

    const handleLoginSuccess = (role) => {
        setLoggedIn(true);
        setUserRole(role);
        localStorage.setItem("userRole", role); // Store role in localStorage
        setShowSignin(false);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUserRole(null);
        localStorage.removeItem("userRole"); // Clear login session
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
                    {loggedIn ? (
                        <div className="user-info">
                            <span>Welcome, {userRole === "admin" ? "Admin" : "User"}</span>
                            <button onClick={handleLogout} className="btn logout">Logout</button>
                        </div>
                    ) : (
                        <>
                            <button onClick={handleSignUpClick} className="btn sign-up">Sign Up</button>
                            <button onClick={handleSigninClick} className="btn login">Login</button>
                        </>
                    )}
                </div>
            </nav>

            <Signin isOpen={showSignin} onClose={() => setShowSignin(false)} onLoginSuccess={handleLoginSuccess} />
            <SignupModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
        </>
    );
};

export default Navbar;
