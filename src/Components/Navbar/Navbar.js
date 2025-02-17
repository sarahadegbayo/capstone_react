import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard";



const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const handleClick = () => setClick(!click);

    // Function to extract name from email
    const getNameFromEmail = (email) => {
        if (!email) return "";
        // Extract everything before @ symbol and capitalize first letter
        const name = email.split('@')[0];
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    useEffect(() => {
        // Check for both auth-token and email in sessionStorage
        const authToken = sessionStorage.getItem("auth-token");
        const storedEmail = sessionStorage.getItem("email");

        if (authToken && storedEmail) {
            setIsLoggedIn(true);
            // Set username as the extracted name from email
            setUsername(getNameFromEmail(storedEmail));
            console.log("User should be logged in:", {
                isLoggedIn: true,
                username: storedEmail
            });
        }
    }, []); // Empty dependency array means this runs once on component mount

    const handleLogout = () => {
        // Clear all session storage items
        sessionStorage.clear();

        // Clear specific local storage items
        localStorage.removeItem("doctorData");

        // Clear review form data
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }

        // Reset state
        setIsLoggedIn(false);
        setUsername("");

        // Reload page to reset all states
        window.location.reload();
    };

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy <i style={{ color: '#2190FF' }} className="fa fa-user-md"></i>
                </Link>
                <span>.</span>
            </div>
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/instantconsultation">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="link">
                            <ProfileCard />
                        </li>
                        <li className="link">
                            <button className="btn2" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="link">
                            {/* Remove the button wrapper, just use Link with a className */}
                            <Link to="/Signup" className="btn1">
                                Sign Up
                            </Link>
                        </li>
                        <li className="link">
                            {/* Remove the button wrapper, just use Link with a className */}
                            <Link to="/Login" className="btn1">
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
