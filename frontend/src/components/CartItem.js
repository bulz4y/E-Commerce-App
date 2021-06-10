import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Grid, Typography, makeStyles, Box } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import { deleteCartItem } from '../actions/cartActions/cartActions';


const useStyles = makeStyles((theme) => {
    return {
        cartItem: {
            [theme.breakpoints.down('md')]: {
                textAlign: 'center'
            }
        }
    };
});

function CartItem({item}) {

    const history = useHistory();

    const classes = useStyles();

    
    const dispatch = useDispatch();

    const deleteFromCart = (e) => {
        e.stopPropagation();
        dispatch(deleteCartItem(item._id));
    }


    const navigate = (e) => {
        e.preventDefault();
        history.push('/product/' + item._id);
    }

    return (

        <Grid onClick={navigate} spacing={2} component={Box} boxShadow={2} item container justify='center' alignItems='center' style={{cursor: 'pointer', background: '#fff', marginBottom: '1rem'}}>

            <Grid item xs={12} sm={2} className={classes.cartItem}>
                <img src={`http://localhost:5000${item.image}`} alt={item.name} style={{width: '100px', height: '100px'}}/>
                
            </Grid>

            <Grid item xs={12} sm={2} className={classes.cartItem}>
                <Typography variant='body1' style={{fontWeight: 500}}>
                    {item.name}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={2} className={classes.cartItem}>
                <Typography variant='body1' style={{fontWeight: 500}}>
                    Price: 
                </Typography>
                <Typography variant='body1' style={{fontWeight: 500}}>
                    ${item.price}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={2} className={classes.cartItem}>
                <Typography variant='body1' style={{fontWeight: 500}}>
                    Quantity:
                </Typography>
                <Typography variant='body1' style={{fontWeight: 500}}>
                    {item.quantity}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={2} className={classes.cartItem}>
                <Typography variant='body1' style={{fontWeight: 500}}>
                    Sum:
                </Typography>
                <Typography variant='body1' style={{fontWeight: 500}}>
                    ${item.sum.toFixed(2)}
                </Typography>
            </Grid>


            <Grid item xs={12} sm={2} className={classes.cartItem}>
                <DeleteIcon color='secondary' style={{cursor: 'pointer'}} onClick={deleteFromCart}/>
            </Grid>

        </Grid>
    );
};

export default CartItem;