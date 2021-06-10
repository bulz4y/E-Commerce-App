import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Grid, Box, Button } from '@material-ui/core';

import Navigation from '../../components/Navigation';
import CartItem from '../../components/CartItem';
import PaypalCheckout from '../../components/PaypalCheckout';

import { clearCartItems } from '../../actions/cartActions/cartActions';




function Cart() {

    const cart = useSelector((state) => state.cart);
    
    const dispatch = useDispatch();

    const clearCart = () => {
        dispatch(clearCartItems());
    };

    return (
        <>
            <Navigation />
            <Typography variant='h4' align='center' style={{marginTop: '1rem'}}>
                Shopping Cart
            </Typography>
            {cart.items.length === 0 ? (
                <Typography variant='h5' style={{textAlign: 'center', width: '100%'}}>
                    Cart Is Empty.
                </Typography>
            ) : (
                <>
                    <Box p={2} my={2}>
                        <Grid container  justify='center' >
                            {cart.items.map((item, i) => {
                                return (
                                    <CartItem item={item} key={item._id}/>
                                )
                            })}
                        </Grid>
                        
                        <Box mb={1} display='flex' justifyContent='space-between'>
                            <Typography variant='h5' style={{fontWeight: 'bold'}}>
                                Total: ${cart.total.toFixed(2)}
                            </Typography>

                            <Button variant='contained' color='secondary' onClick={clearCart}>
                                Clear Cart
                            </Button>

                        </Box>
                       
                        <PaypalCheckout />

                        {/* <Button variant='contained' color='primary'>
                            Checkout
                        </Button> */}
                    </Box>
                </>
            )}
                       
        </>
    );
};

export default Cart;