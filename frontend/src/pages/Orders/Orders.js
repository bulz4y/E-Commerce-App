import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Typography, Box, makeStyles } from '@material-ui/core';

import Navigation from '../../components/Navigation';
import ErrorModal from '../../components/ErrorModal';

import { getOrders } from '../../actions/orderActions/orderActions';
import { closeErrorModal } from '../../shared/utils/closeErrorModal';

const useStyles = makeStyles((theme) => {
    return {
        order: {
            background: theme.palette.primary.main,
            color: '#fff',
            borderRadius: '4px'
        }
    }
})

function Orders(props) {

    const {orders, error, message} = useSelector((state) => state.orders);
    
    const user = useSelector((state) => {return state.user.user});

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        if(user) {
            dispatch(getOrders('http://localhost:5000/api/products/getOrders', user));
        }
        
    }, [dispatch, user]);

    return (
        <>
            {error && <ErrorModal open={(error)} closeModal={closeErrorModal} errorMessage={message}/>}

            <Navigation />
            <Typography variant='h4' align='center' style={{marginTop: '1rem'}}>
                Orders
            </Typography>

            <Box p={orders.length > 0 ? 3: 0}>
                {orders.length > 0 ? orders.map((order) => {
                    return (
                        <Box key={order._id} p={2} mb={2} className={classes.order}>
                            <Typography variant='h5'>Order #{order._id}</Typography>
                            <Box my={1}>
                                {order.items.map(item => {
                                    return <Typography variant='body1' key={item._id}>{item.name} ${item.price} x{item.quantity}</Typography>
                                })}
                            </Box>
                            <Typography variant='h6'>Total: ${order.total}</Typography>
                        </Box>
                    )
                    
                }) : <Box style={{textAlign: 'center'}}><Typography variant='h5'>No Orders Found.</Typography></Box>}
            </Box>
        </>
    );
};

export default Orders;