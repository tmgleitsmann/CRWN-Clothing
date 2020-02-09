import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount } from '../../redux/cart/cart-selectors';
import { toggleCartHidden } from '../../redux/cart/cart-actions';
import { ReactComponent as ShoppingIcon } from '../../images/shopping-bag.svg';
import '../../styles/components/Cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, totalQuantity }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{totalQuantity}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector ({
    totalQuantity: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);