import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Box, CircularProgress, Typography, Grid, TextField, FormControl, Button } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import ErrorModal from '../../components/ErrorModal';
import SuccessModal from '../../components/SuccessModal';

import { fetchProduct } from '../../actions/singleProductActions/singleProductActions';
import { closeErrorModal } from '../../shared/utils/closeErrorModal';
import { closeSuccessModal, deleteProduct } from '../../actions/adminActions/adminActions';
import { addCartItem } from '../../actions/cartActions/cartActions';



const useStyles = makeStyles((theme) => {
    return {
        control: {
            width: '50%',
            '@media (max-width: 600px)': {
                width: '100%'
            }
        }
    };
})

function Product()  {
    const qty = useRef();

    const user = useSelector((state) => state.user.user);

    const classes = useStyles();

    const { id } = useParams();

    const history = useHistory();
    
    const dispatch = useDispatch();

    const data = useSelector(state => state.singleProduct);

    const [submit, setSubmit] = useState({error: false, success: false,  message: ''});

    const adminError = useSelector((state) => state.admin.error);
    const message = useSelector((state) => state.admin.message);

    const { loading, error, product } = data;

    useEffect(() => {
     
        dispatch(fetchProduct(`http://localhost:5000/api/products/${id}`));
    }, [dispatch, id])

  
    const addToCart = (e) => {
        e.preventDefault();
        let quantity = parseInt(qty.current.value);

        if(!quantity || quantity < 1) {
            return setSubmit({success: false, error: true, message: 'Invalid Quantity.'})
        }

        let item = {...product, quantity, sum: quantity * product.price};

        dispatch(addCartItem(item));

        setSubmit({success: true, error: false, message: 'Product Successfully Added To Cart.'});

    }

    const handleUpdateItem = () => {
        history.push(`/update/${product._id}`);
    };

    const handleDeleteItem = () => {
        dispatch(deleteProduct('http://localhost:5000/api/admin/deleteProduct/', product));
        history.push('/admin');
    }


    return (
        <>
            {error && <ErrorModal open={!!error} closeModal={closeErrorModal} errorMessage={error}/>}

            {adminError && <ErrorModal open={!!adminError} closeModal={closeErrorModal} errorMessage={adminError}/>}

            {submit.error && <ErrorModal open={!!submit.error} closeModal={() => setSubmit({success: false, error: false, message: ""})} errorMessage={submit.message}/>}

            {message && <SuccessModal open={!!message} closeModal={() => dispatch(closeSuccessModal())} message={message} />}

            {submit.success && <SuccessModal cart open={!!submit.success} closeModal={() => setSubmit({error: false, success: false, message: ''})} message={submit.message} />}

            <Navigation />
            {loading ? <Box display='flex' justifyContent='center'><CircularProgress /></Box> : (
                <Grid container style={{padding: '1rem'}} spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h3'>
                            <img style={{width: '100%'}} src={`http://localhost:5000${product.image}`} alt={product.name}/>
                        </Typography>
                        
                    </Grid>

                    <Grid item xs={12} sm={6} style={{padding: '1rem 3rem'}}>
                        <Typography variant='h4'>
                            {product.name}
                        </Typography>

                        <Typography variant='h5' color='primary' style={{marginBottom: '1rem'}}>
                            ${product.price}
                        </Typography>

                        <Typography variant='body1'>
                            Available: {product.quantity}
                        </Typography>

                        <form onSubmit={addToCart}>
                            <FormControl className={classes.control} margin='normal'>
                                    <TextField 
                                        inputRef={qty}
                                        label='Quantitiy' 
                                        id='quantity'
                                        name='quantity'
                                        type='number'
                                        // required
                                        InputProps={{ inputProps: { min: 1, max: product.quantity } }}
                                    />
                            </FormControl>

                            <FormControl margin='normal' style={{display: 'block'}}>
                                <Button type='submit' variant='contained' color='primary'>
                                    <ShoppingCartIcon style={{marginRight: '.5rem'}} /> Add To Cart
                                </Button>
                            </FormControl>
                        </form>
                        
                        <Box my={3}>
                            <Typography variant='body1' component='p'>
                                <span style={{fontWeight: 'bold'}}>Product Type:</span> {product.categoryId && product.categoryId.name}
                            </Typography>

                        </Box>

                        <Box my={3}>
                            <Typography style={{textTransform: 'uppercase', fontWeight: 'bold'}} variant='body1' component='p'>
                                description:
                            </Typography>

                            <Typography variant='body1'>
                                {product.description}
                            </Typography>
                        </Box>

                        {user && user.isAdmin && (
                            <Box>
                                <Button onClick={handleUpdateItem} style={{marginRight: '1rem', background: '#009688', color: '#fff'}} variant='contained'>
                                        Update
                                </Button>

                                <Button onClick={handleDeleteItem} color='secondary' variant='contained'>
                                        Delete
                                </Button>

                           
                            </Box>

                        )}
                                               

                    </Grid>

                </Grid>
                
            )}
            <Footer />
            
        </>
        
    )
};

export default Product;