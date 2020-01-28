import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Header from '../components/header/Header';
import Homepage from '../pages/homepage/Homepage';
import Shop from '../pages/shop/Shop';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/Sign-in-and-sign-up';
import { auth, createUserProfileDocument } from '../firebase/Firebase.utils';

class AppRouter extends React.Component {
    constructor(){
        super();
        this.state = {
            currentUser:null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount(){
        //fetch to the backend
        //open subscription. Will need to unsubscribe if unmounting.
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth){
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });
                });
            }
           this.setState({ currentUser: userAuth }); 
        });
    }

    componentWillUnmount(){
        this.unsubscribeFromAuth();
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                <Header currentUser={this.state.currentUser}/>
                    <Switch>
                        <Route path = '/' component={Homepage} exact={true}/>
                        <Route path = '/shop' component={Shop}/>
                        <Route path = '/sign-in' component = {SignInAndSignUpPage} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default AppRouter;