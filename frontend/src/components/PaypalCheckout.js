import React from "react";
import ReactDOM from "react-dom"

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import { clearCartItems } from "../actions/cartActions/cartActions";
import { createOrder } from '../actions/orderActions/orderActions';

const useStyles = makeStyles((theme) => {
    return {
        paypalBtn: {
            maxWidth: '250px',
            '@media(max-width: 600px)': {
                width: '100%',
                maxWidth: '100%'
            }
        }
    }
})

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PaypalCheckout() {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

//   console.log(cart);

  const orderCreate = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cart.total.toFixed(2)
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    // Clear Cart
    dispatch(clearCartItems());

    // Store Order in DB
    dispatch(createOrder('http://localhost:5000/api/products/createOrder', {items: cart.items, total: cart.total, user}));
    
    // Redirect To Orders Page
    history.push('/orders');

    return actions.order.capture();
  };

  return (
      <div className={classes.paypalBtn}>
      
        <PayPalButton
            style={{color: 'blue'}}
            fundingSource={window.paypal.FUNDING.PAYPAL} 
            createOrder={(data, actions) => orderCreate(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />

    </div>
      
  );
};

export default PaypalCheckout;