import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import CartItem from '../cart-item/Cart-item';
import CustomButton from '../button/Custom-button';
import { selectCartItems } from '../../redux/cart/cart-selectors'
import { toggleCartHidden } from '../../redux/cart/cart-actions';
import '../../styles/components/Cart-dropdown.styles.scss';

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className = 'cart-dropdown'>
        <div className = 'cart-items'> 
        {
            cartItems.length > 0 ?
            cartItems
                .map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
            :
            <span className='empty-message'>Your cart is empty</span>
        }
        </div>
        <CustomButton onClick={()=>{
            dispatch(toggleCartHidden());
            history.push('/checkout');
        }}>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));