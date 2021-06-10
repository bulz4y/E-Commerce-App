import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { setFavorite } from '../actions/productsActions/productsActions';


function Favorite({id}) {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const favs = useSelector((state) => state.products.favs);
    

    let isFavorite = false;

    debugger;
    for(let i = 0; i < favs.length; i++) {
        if(id === favs[i]._id) {
            isFavorite = true;
            break;
        }
    }




    const setFavoriteProduct = (e) => {
        e.preventDefault();

        if(!user) {
            return history.push('/login');
        }

        dispatch(setFavorite('http://localhost:5000/api/products/favorite/', id, user.id, user.token));
    };

    return (
        <IconButton onClick={setFavoriteProduct}>
            {!isFavorite ? <FavoriteBorderIcon /> : <FavoriteIcon style={{color: "red"}} />}
        </IconButton>
    );

};

export default Favorite;