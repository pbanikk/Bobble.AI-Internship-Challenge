import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router-dom";

import './auth.css';
import logo from './logo.png';
import { signin, authenticate, isAuthenticated } from "../action/auth";

function SignIn() {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
        redirectToReferrer: false
    });

    const { email, password, error, loading, message, showForm, redirectToReferrer } = values;
    const { logged } = isAuthenticated();

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { email, password};

        signin(user).then(data => {
            authenticate(data, () => {
                setValues({
                    ...values,
                    redirectToReferrer: true
                });
            });
        });

    };

    const handleChange = name => e => {
        e.preventDefault();
        // console.table({ first_name, last_name, email, password, error, loading, message, showForm });
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/user" />;
        }

    };

    
    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit} autoComplete="off">
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
                    <button type="submit" className="btn btn-success block">SignIn</button>
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
            <div class="container signup-form">
                <h2>Login into your Account</h2>
                <p className="hint-text">Sign in with your social media account or email address</p>
                <div className="social-btn text-center">
                    <a className="btn btn-primary btn-lg"><i class="fa fa-facebook"></i> Facebook</a>
                    <a ></a>
                    <a className="btn btn-danger btn-lg"><i class="fa fa-google"></i> Google</a>
                </div>
                <div className="or-seperator"><b>or</b></div>
                {showForm && signupForm()}
            </div>
            <div className="text-center p-3">Don't have an account? <Link to="/register">Register Here</Link></div>
        </React.Fragment>
    )
}

export default SignIn;
