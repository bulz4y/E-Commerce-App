import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Popper, MenuItem, Typography, Card, CardContent, Button, CardActions, CardMedia, CardActionArea } from '@material-ui/core';


import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import { deleteProduct }  from '../actions/adminActions/adminActions';


function AdminItem({ product }) {

    const history = useHistory();

    const token = useSelector((state) => state.user.user.token);

    const dispatch = useDispatch();

    const {loading} = useSelector((state) => state.admin);


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  

    const handleViewItem = () => {
        history.push(`/product/${product._id}`);
    }

    const handleUpdateItem = () => {
        history.push(`/update/${product._id}`);
    };

    const handleDeleteItem = () => {
        dispatch(deleteProduct('http://localhost:5000/api/admin/deleteProduct/', product, token));
    }


    return (
        <>
            <Card variant='outlined'>
                <CardActionArea component='div'>
                    <CardMedia 
                        component='img'
                        alt={product.name}
                        src={'http://localhost:5000' + product.image}
                    />
                <CardContent style={{textAlign: 'center'}}>
                        <Typography  gutterBottom variant='body1'>
                        {product.description}
                        </Typography>

                        <Typography variant='h6' >
                            ${product.price}
                        </Typography>

                    </CardContent>

                    <CardActions style={{justifyContent: 'center'}}>
                        <Button onClick={handleClick} color='primary' variant='contained'>
                            {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />} Options
                        </Button>
                        <Popper
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            style={{background: '#fff'}}
                            modifiers={{
                                flip: {
                                    enabled: false
                                }
                            }}
                            
                        >
                            <MenuItem>
                                <Button fullWidth color='primary' variant='contained' onClick={handleViewItem}>
                                    View
                                </Button>
                            </MenuItem>
                            <MenuItem >
                                <Button fullWidth style={{background: '#009688', color: '#fff'}} onClick={handleUpdateItem} variant='contained'>
                                    Update
                                </Button>
                            </MenuItem>
                            <MenuItem >
                                <Button fullWidth color='secondary' variant='contained' onClick={handleDeleteItem}>
                                    {loading ? <CircularProgress style={{color: '#fff'}} size={24}/> : 'Delete'}
                                </Button>
                            </MenuItem>
                        </Popper>
                    </CardActions>
                    
                
                </CardActionArea>
                    
                
            </Card>
        </>
           
    );
};

export default AdminItem;
