import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    if (value.length !== 10 || !/^\d+$/.test(value)) {
      setPhoneError('Phone number must be exactly 10 digits.');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setPhoneError('Phone number must be exactly 10 digits.');
      return;
    }

    console.log('Form submitted successfully!');
    // Add your form submission logic here
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member? <span><a href="./SignUp/SignUp.js" style={{ color: '#2190FF' }}> Sign Up Here</a></span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                aria-describedby="helpId"
                value={phone}
                onChange={handlePhoneChange}
              />
              {phoneError && <small className="text-danger">{phoneError}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                Login
              </button>
              <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">
                Reset
              </button>
            </div>
            <br />
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

