import React, { useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {  Button, Grid, Box, CircularProgress, makeStyles, Typography } from '@material-ui/core';



import Navigation from '../../components/Navigation';
import Item from '../../components/Item';
import AdminItem from '../../components/AdminItem';
import ErrorModal from '../../components/ErrorModal';
import SuccessModal from '../../components/SuccessModal';
import Filters from '../../components/Filters';


import { fetchShopProducts } from '../../actions/productsActions/productsActions';
import { closeErrorModal } from '../../shared/utils/closeErrorModal';
import { clearFilters, notReady } from '../../actions/filterActions/filterActions';
import { closeSuccessModal } from '../../actions/adminActions/adminActions';


import { items, skip, resetPage, endPage } from '../../shared/utils/pageNumber';

const useStyles = makeStyles(() => {
    return {

        filters: {
            background: '#fff',
        }
    }
})


function Shop(props) {
    
    const history = useHistory();

    const user = useSelector((state) => state.user.user);

    const filters = useSelector((state) => state.filters);

    const classes = useStyles();

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products[props.type]);

    const {loadMore, loading, error} = useSelector((state) => state.products);


   const adminError = useSelector((state) => state.admin.error);
   const message = useSelector((state) => state.admin.message);

    const category = useSelector((state) => {
        return state.categories.categories.find((c) => {
            return c.name.toLowerCase() === props.type.toLowerCase();
        });
    });



    useEffect(() => {
        if(filters.ready && (category || props.type === 'admin')) {
            resetPage();
            dispatch(fetchShopProducts(`http://localhost:5000/api/products/searchCategory/`, category, filters, { items, skip }, false));    
            dispatch(notReady());
        }

         
    }, [dispatch, props.type, filters, category]);

    useEffect(() => {   
        // Scroll Top on type change
        window.scrollTo(0,0);
        resetPage();
        dispatch(clearFilters());
    }, [dispatch, props.type]);

    const path = history.location.pathname;

    const isAdmin = (user && user.isAdmin && path === '/admin') ? true : false;

    const loadMoreProducts = (e) => {
        dispatch(fetchShopProducts(`http://localhost:5000/api/products/searchCategory/`, category, filters, { items, skip }, true));
    };


    return (
        <>
            {error && <ErrorModal open={!!error} closeModal={closeErrorModal} errorMessage={error}/>}
           
            {adminError && <ErrorModal open={!!adminError} closeModal={closeErrorModal} errorMessage={adminError}/>}

            {message && <SuccessModal open={!!message} closeModal={() => dispatch(closeSuccessModal())} message={message} />}

            <Navigation fixed={'fixed'} />
            <Grid container spacing={3} style={{padding: '2rem 1rem', marginTop: '3rem'}}>
                <Grid item xs={12} sm={3} className={classes.filters}>
                    <Filters />           
                </Grid>

                <Grid item xs={12} sm={9} >
                 <Typography variant='h4' style={{textTransform: 'capitalize', textDecoration: 'underline', padding: '0 0 1rem 0', textAlign: 'center'}}>  
                            {props.type}
                 </Typography>
                 {loading ? <Box display='flex' justifyContent='center'><CircularProgress /></Box> : <Grid container item spacing={3}>
                    {products && products.length > 0 ? products.map((p, i) => {

                            return (
                                
                        
                                <Grid item xs={12} sm={6} md={3} key={p._id}>
                                    {isAdmin  ? <AdminItem product={p} /> : <Item product={p} />}
                                </Grid>      
                               
                            )
                        
                       
                    }) : <Typography variant='h5' style={{textAlign: 'center', width: '100%'}}>
                            No Products Found.
                        </Typography>}
                    </Grid>  }
                    
                    {(!endPage && !loading ) && (
                        <Box pt={5} display='flex' justifyContent='center'>
                          <Button onClick={loadMoreProducts} size='large' variant='contained' color='primary'>
                              {loadMore ? (<><CircularProgress style={{color: '#fff', marginRight: '1rem'}} size={24}/> Load More</>)  : "Load More" }
                          </Button>
                        </Box> 
                    )}
                  
                    
                </Grid>
            </Grid>
        </>
    );
};

export default Shop;