import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Homepage from '../pages/homepage/Homepage';
import Shop from '../pages/shop/Shop';


const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path = '/' component={Homepage} exact={true}/>
                    <Route path = '/shop' component={Shop}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default AppRouter;