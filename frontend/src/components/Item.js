import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Button, CardActions, CardMedia, CardActionArea, Box} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';


import Favorite from '../components/Favorite';

function Item({ product }) {

  

    return (
        <>
            <Link style={{textDecoration: 'none'}} to={`/product/${product._id}`}>
                <Card variant='outlined'>
                    <CardActionArea component='div'>
                        <CardMedia 
                            component='img'
                            alt={product.name}
                            src={'http://localhost:5000' + product.image}
                        />
                    <CardContent style={{textAlign: 'center'}}>
                            <Typography  gutterBottom variant='body1'>
                            {product.name}
                            </Typography>

                            <Typography variant='h6' >
                                ${product.price}
                            </Typography>

                        </CardContent>

                        <CardActions style={{justifyContent: 'center'}}>
                            <Button color='primary' variant='contained'>
                                <VisibilityIcon style={{marginRight: '.5rem'}}/>
                                View Item
                            </Button>
                        </CardActions>

                        <Box display='flex' style={{justifyContent:'center'}}>
                            <Favorite id={product._id} />
                        </Box> 
                        
                        
                    
                    </CardActionArea>
                      
                    
                </Card>
            
            </Link>
                
        </>
           
    );
};

export default Item;
