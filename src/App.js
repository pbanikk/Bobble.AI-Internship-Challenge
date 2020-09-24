import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Core
import Home from './landing/index';

// Auth
import Signup from './auth/SignUp';
import Signin from './auth/SignIn';

//DashBoard
import Dashboard from './user/Dashboard';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* Core */}
                <Route path="/" exact component={Home} />
                
                {/* Auth */}
                <Route path="/login" exact component={Signin} />
                <Route path="/register" exact component={Signup} />
                                
                {/* Admin */}
                <Route path="/user" exact component={Dashboard} />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;