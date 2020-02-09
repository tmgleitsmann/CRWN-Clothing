import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart-selectors';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import CartIcon from '../cart-icon/Cart-icon';
import CartDropdown from '../cart-dropdown/Cart-dropdown';
import { auth } from '../../firebase/Firebase.utils';
import { ReactComponent as Logo } from '../../images/crown.svg';
import '../../styles/components/Header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className = 'header'>
        <Link to = '/' className='logo-container'>
            <Logo className='logo'/>
        </Link>

        <div className='options'>
            <Link to='/shop' className='option'>
            SHOP
            </Link>
            <Link to='/shop' className='option'>
            CONTACT
            </Link>
            {
                currentUser ? <div className = 'option' onClick={() => auth.signOut()}>SIGN OUT</div> 
                    : 
                <Link className = 'option' to='/sign-in'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        { hidden ? null: (<CartDropdown />)}
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);