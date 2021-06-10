import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import UserNav from './UserNav';

import { Badge, AppBar,Toolbar, Box, Hidden, ListItem, ListItemText, List, Drawer, ListItemIcon } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AdminNav from './AdminNav';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCategories } from '../actions/categoriesActions/categoriesActions';

function Navigation(props) {

    const [drawer, setDrawer] = useState(false);
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart);

    if(isWidthUp('sm', props.width) && drawer) {
        setDrawer(false);
    }


    const categoriesReducer = useSelector(state => state.categories);

    const { categories } = categoriesReducer;

    const dispatch = useDispatch();

    useEffect(() => {   
        dispatch(fetchCategories('http://localhost:5000/api/products/categories'));
    }, [dispatch]);

    return (
        <AppBar position={props.fixed || 'static'} >
            <Toolbar style={{justifyContent: 'space-between'}}>
                <Hidden smUp>
                     <ListItem button style={{width: 'auto'}} onClick={() => setDrawer((drawer) => !drawer)} >
                         <MenuIcon style={{color: '#fff'}} />
                     </ListItem>
                     <Drawer open={drawer} onClose={() => setDrawer((drawer) => !drawer)}>
                        <List>
                            <ListItem button exact to='/' activeClassName="Mui-selected" component={NavLink}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                          
                            {categories.map((category) => {
                                return (
                                    <ListItem key={category._id} button exact to={'/' + category.name} activeClassName="Mui-selected" component={NavLink}>
                                        <ListItemIcon>
                                            <EmojiPeopleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={category.name}/>
                                        
                                    </ListItem>
                                )
                            })}

                            {user && user.isAdmin && (
                                <AdminNav mobile />
                            )}

                        </List>
                     </Drawer>
                </Hidden>
                <Hidden xsDown>
                    <Box display='flex'>
            
                        <Box pr={1}>
                                <ListItem button exact to='/' activeClassName="Mui-selected" component={NavLink}  >
                                    <ListItemText primary={'Home'} />
                                </ListItem>
                        </Box>

                        {categories.map((category) => {
                                return (
                                    <Box key={category._id} pr={1}>
                                        <ListItem button to={`/` + category.name.toLowerCase()} activeClassName="Mui-selected" component={NavLink}>
                                            <ListItemText primary={category.name} />
                                        </ListItem>
                                    </Box>
                                )
                        })}

                        {user && user.isAdmin && (
                            // <ListItem button activeClassName="Mui-selected" >
                                <AdminNav />
                            // </ListItem>
                        )}

                    </Box>
                </Hidden>
                
            
                <Box display='flex'>
                    <ListItem button  to='/cart' component={NavLink}>
                        <Badge badgeContent={cart.items.length} showZero color='secondary'>
                            <AddShoppingCartIcon style={{color: '#fff'}}/>
                        </Badge>
                        
                    </ListItem>
                   
                    <UserNav />

                </Box>
                

            </Toolbar>
        </AppBar>
    );
};

export default withWidth()(Navigation);