import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to validate phone number
    const validatePhone = (phone) => {
        if (phone.length !== 10 || !/^\d+$/.test(phone)) {
            setPhoneError('Phone number must be exactly 10 digits.');
            return false;
        } else {
            setPhoneError('');
            return true;
        }
    };

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault();
        if (!validatePhone(phone)) {
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phone }),
            });

            if (!response.ok) {
                throw new Error('Failed to register. Server responded with an error.');
            }

            const json = await response.json();
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('phone', phone);
                sessionStorage.setItem('email', email);
                navigate('/');
                window.location.reload();
            } else {
                if (json.errors) {
                    for (const error of json.errors) {
                        setShowerr(error.msg);
                    }
                } else {
                    setShowerr(json.error);
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setShowerr('An error occurred while trying to register. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{ textAlign: 'left' }}>
                    Already a member?{' '}
                    <span>
                        <Link to="/login" style={{ color: '#2190FF' }}>
                            Login
                        </Link>
                    </span>
                </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    validatePhone(e.target.value);
                                }}
                                type="tel"
                                name="phone"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your phone number"
                                required
                            />
                            {phoneError && <small className="text-danger">{phoneError}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                aria-describedby="helpId"
                                required
                            />
                        </div>

                        {/* General Error Message */}
                        {showerr && (
                            <div className="err" style={{ color: 'red' }}>
                                {showerr}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                                Submit
                            </button>
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
