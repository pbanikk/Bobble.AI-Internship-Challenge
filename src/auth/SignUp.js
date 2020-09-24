import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './auth.css';
import logo from './logo.png';
import { signup } from '../action/auth';

function SignUp() {

    const [values, setValues] = useState({
        first_name: '', 
        last_name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { first_name, last_name, email, password, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { first_name, last_name, email, password};

        signup(user)
        .then(data => {
           setValues({
                    ...values,
                    first_name: '', 
                    last_name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: true
                });
        });
    };

    const handleChange = name => e => {
        e.preventDefault();
        // console.table({ first_name, last_name, email, password, error, loading, message, showForm });
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">You have successfully registered !!!</div> : '');

    
    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="form-group">
                    <input
                        value={first_name}
                        onChange={handleChange('first_name')}
                        type="text"
                        className="form-control"
                        placeholder="First name"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={last_name}
                        onChange={handleChange('last_name')}
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Type your email"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Type your password"
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-success block">Signup</button>
                </div>
            </form>
        );
    };


    return (
        <React.Fragment>
            <div className="container">
                <img src={logo} className="center" />
            </div>
            {showError()}
            {showLoading()}
            {showMessage()}
            <div class="container signup-form">
                <h2>Create an Account</h2>
                <p className="hint-text">Sign up with your social media account or email address</p>
                <div className="social-btn text-center">
                    <a className="btn btn-primary btn-lg"><i class="fa fa-facebook"></i> Facebook</a>
                    <a ></a>
                    <a className="btn btn-danger btn-lg"><i class="fa fa-google"></i> Google</a>
                </div>
                <div className="or-seperator"><b>or</b></div>
                {showForm && signupForm()}
            </div>
            <div className="text-center p-3">Already have an account? <Link to="/login">Login</Link></div>
        </React.Fragment>
    )
}

export default SignUp
