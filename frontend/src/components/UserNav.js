import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Box, ListItem, Menu, MenuItem } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import { logoutUser } from '../actions/userActions/userActions';
import { clearCartItems } from '../actions/cartActions/cartActions';

function UserNav() {

    const [anchorEl, setAnchorEl] = useState(null);

    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const logout = () => {
        dispatch(clearCartItems());
        dispatch(logoutUser());
    }


    let menu;
    if(user && user.token) {
        menu = (
            <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClose={handleClose}
            disableScrollLock={ true }
            
            >
                <MenuItem component={NavLink} to='/orders'>Orders</MenuItem>
                <MenuItem component={NavLink} to='/whishlist'>Whishlist</MenuItem>
                <MenuItem onClick={logout} component={NavLink} to='/login'>Logout</MenuItem>
            </Menu>
        );
    } else {
        menu = (
            <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClose={handleClose}
            disableScrollLock={ true }
            >
                <MenuItem component={NavLink} to='/login'>Login</MenuItem>
                <MenuItem component={NavLink} to='/signup'>Signup</MenuItem>
            </Menu>
        )
    }

    return (
        <Box>
            <ListItem button onClick={handleClick}>
                <PersonIcon style={{color: '#fff'}}/>
            </ListItem>
            
            {menu}
        </Box>
    );
};

export default UserNav;