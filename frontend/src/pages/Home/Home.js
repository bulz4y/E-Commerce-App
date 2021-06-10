import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, CardMedia, Box, Typography, Grid, useTheme, useMediaQuery, createMuiTheme, ThemeProvider } from '@material-ui/core';

import Item from '../../components/Item';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import ErrorModal from '../../components/ErrorModal';

import { fetchHomeProducts } from '../../actions/productsActions/productsActions';
import { closeErrorModal } from '../../shared/utils/closeErrorModal';


const fontTheme = createMuiTheme();

fontTheme.typography.h3 = {
  '@media (max-width:600px)': {
    fontSize: '1.8rem',
  }
};

fontTheme.typography.h5 = {
    '@media (max-width:600px)': {
        fontSize: '1.3rem',
      }
}



function Home() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('xs'));

    const productData = useSelector(state => state.products);

    const { loading, error, bestSeller, newest } = productData;
    const dispatch = useDispatch();


    useEffect(() => {
        
        dispatch(fetchHomeProducts('http://localhost:5000/api/products/home'));
    }, [dispatch]);

 

    return (
        <>  
            {error && <ErrorModal open={!!error} closeModal={closeErrorModal} errorMessage={error}/>}
           
            <Navigation fixed={'fixed'}/>
            <Box>
                <CardMedia style={{minHeight: '700px'}}   component='img' src='http://localhost:5000/images/hero.jpg'/>
            </Box> 
    

          
            <Box p={3}>
                <Box m={2}>
                    <ThemeProvider theme={fontTheme}>
                        <Typography variant='h3' align='center'>
                            Best Seller
                        </Typography>
                    
                        <Typography variant='h5' align='center'>
                            Top Products
                        </Typography>
                    </ThemeProvider>
                </Box>
               
                {loading && bestSeller.length === 0 ? <Box display='flex' justifyContent='center'><CircularProgress /></Box> : (
                
                    <Grid container spacing={isSmall ? 1 : 3}>
                        <Grid container item xs={12} alignItems='center' spacing={isSmall ? 1 : 3}>
                            {bestSeller.slice(0, 4).map((product) => {
                                return (
                                    <Grid key={product._id} item xs={12} md={3} sm={6}>
                                        <Item product={product}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid container item xs={12} alignItems='center' spacing={isSmall ? 1 : 3}>
                            {bestSeller.slice(4).map((product) => {
                                return (
                                    <Grid key={product._id} item xs={12} md={3} sm={6}>
                                        <Item product={product}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        
                    </Grid>
                  
                )}
               
            </Box> 

            <Box p={3}>
                <Box m={2}>
                    <ThemeProvider theme={fontTheme}>
                        <Typography variant='h3' align='center'>
                            Newest
                        </Typography>
                    
                        <Typography variant='h5' align='center'>
                            New Products
                        </Typography>
                    </ThemeProvider>
                </Box>
              
                
                { loading && newest.length === 0 ? <Box display='flex' justifyContent='center'><CircularProgress /></Box> : (
                    <Grid container spacing={isSmall ? 1 : 3}>
                        <Grid container item xs={12} alignItems='center' spacing={isSmall ? 1 : 3}>
                                {newest.slice(0,4).map((product) => {
                                    return (
                                        <Grid key={product._id} item xs={12} md={3} sm={6}>
                                            <Item product={product}/>
                                        </Grid>
                                    )
                                })}
                        </Grid>
                        <Grid container item xs={12} alignItems='center' spacing={isSmall ? 1 : 3}>
                                {newest.slice(4).map((product) => {
                                    return (
                                        <Grid key={product._id} item xs={12} md={3} sm={6}>
                                            <Item product={product}/>
                                        </Grid>
                                    )
                                })}
                        </Grid>
                            
                    </Grid>
                )}
                
            </Box> 
            <Footer />
        </>
    )     
};

export default Home;