import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Header from '../components/header/Header';
import Homepage from '../pages/homepage/Homepage';
import Shop from '../pages/shop/Shop';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/Sign-in-and-sign-up';


const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
            <Header />
                <Switch>
                    <Route path = '/' component={Homepage} exact={true}/>
                    <Route path = '/shop' component={Shop}/>
                    <Route path = '/sign-in' component = {SignInAndSignUpPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default AppRouter;