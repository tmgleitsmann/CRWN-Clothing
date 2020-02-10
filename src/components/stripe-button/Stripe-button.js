import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100 //need price in cents
    const publishableKey = 'pk_test_OP0QoTrQqYlYsy4EkdpDuYoc00cQrOvdkA';

    const onToken = token => {
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
        />
    );
};

export default StripeCheckoutButton;