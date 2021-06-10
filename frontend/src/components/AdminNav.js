import React, { useState } from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import { Box, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';

import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

const adminRoutes = {
    '/admin': 1,
    '/new-item': 1
};

function AdminNav(props) {

    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }


    let menu = (
            <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClick={handleClose}
            onClose={handleClose}
            disableScrollLock={ true }
            >
                <MenuItem component={NavLink} activeClassName='Mui-selected' to='/admin'>Items</MenuItem>
                <MenuItem component={NavLink} activeClassName='Mui-selected' to='/new-item'>Create Item</MenuItem>
            </Menu>
        )
    

    let activeAdmin =  adminRoutes[history.location.pathname] ? true : false;

    return (
        <Box>
             <ListItem button onClick={handleClick} selected={activeAdmin}>  
                {props.mobile && (
                    <ListItemIcon>
                        <EmojiPeopleIcon />
                    </ListItemIcon>
                )}
                
                               
                <ListItemText primary='Admin'/>
              
            </ListItem>
            
            {menu}
        </Box>
    );
};

export default AdminNav;