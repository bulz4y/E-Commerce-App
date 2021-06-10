import React from 'react';

import { useSelector } from 'react-redux';

import { Grid, makeStyles, Typography } from '@material-ui/core';

import Navigation from '../../components/Navigation';
import Item from '../Product/../../components/Item';


const useStyles = makeStyles((theme) => {
    return {
        heading: {
            marginTop: theme.spacing(10),
            padding: theme.spacing(2),
            textAlign: 'center'
        }
    }
})

function Whishlist() {
    const classes = useStyles();

    const favs = useSelector((state) => state.products.favs);


    return (
        <>
            <Navigation fixed={'fixed'}/>
            <Typography className={classes.heading} variant='h3' align='center'>
               Whishlist
            </Typography>
            {/* <h1 className={classes.heading}>Whishlist</h1> */}
            <Grid container spacing={3} style={{justifyContent: 'center'}}>
                    {favs.length > 0 ? favs.map((fav) => {
                       
                        return (
                            <Grid key={fav._id} item xs={12} sm={6} md={3}>
                                <Item product={fav} />
                            </Grid>
                            
                        );
                    }): <Typography variant='h5' style={{textAlign: 'center', width: '100%'}}>
                    No Favorite Products Found.
                </Typography>}
                
            </Grid>
        </>
    );
};

export default Whishlist;