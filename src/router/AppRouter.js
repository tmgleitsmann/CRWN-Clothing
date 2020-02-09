import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from '../redux/user/user-actions';
import { selectCurrentUser } from '../redux/user/user-selectors';
import Header from '../components/header/Header';
import Homepage from '../pages/homepage/Homepage';
import Shop from '../pages/shop/Shop';
import Checkout from '../pages/checkout/Checkout';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/Sign-in-and-sign-up';
import { auth, createUserProfileDocument } from '../firebase/Firebase.utils';


class AppRouter extends React.Component {
    
    unsubscribeFromAuth = null;

    componentDidMount(){
        const {setCurrentUser} = this.props;
        //fetch to the backend
        //open subscription. Will need to unsubscribe if unmounting.
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth){
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                        setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data()
                        });
                });
            }
           setCurrentUser(userAuth);
        });
    }

    componentWillUnmount(){
        this.unsubscribeFromAuth();
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                <Header/>
                    <Switch>
                        <Route exact path = '/' component={Homepage}/>
                        <Route path = '/shop' component={Shop}/>
                        <Route exact path = '/checkout' component={Checkout}/>
                        <Route exact path = '/sign-in' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage />)} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);