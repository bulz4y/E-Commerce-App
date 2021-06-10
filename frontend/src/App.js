import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import Whishlist from './pages/Whishlist/Whishlist';
import Product from './pages/Product/Product';
import NewProduct from './pages/NewProduct/NewProduct';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import Orders from './pages/Orders/Orders';


import { history } from './shared/history/history';
import { loginUser } from './actions/userActions/userActions';
import { initFavorite } from './actions/productsActions/productsActions';

function App() {

  useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  let routes;

  let loggedUser = JSON.parse(localStorage.getItem('userData')) || {};


  useEffect(() => {
    
    if(localStorage.getItem('userData')) {
      dispatch(loginUser());
      
      dispatch(initFavorite('http://localhost:5000/api/products/favorite/' + loggedUser.id, loggedUser.token));
    }

    

  }, [dispatch, loggedUser.id, loggedUser.token])

  if(loggedUser && loggedUser.token) {
    routes = (
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        {/* <CustomRoute exact path='/admin'>
          <Shop type='admin' />
        </CustomRoute> */}
  
          {/* <CustomRoute exact path='/new-item'>
          <NewProduct />
        </CustomRoute> */}

        {loggedUser.isAdmin &&
          <Route exact path='/admin'>
              <Shop type='admin' />
          </Route>
        }

        {loggedUser.isAdmin &&
          <Route exact path='/new-item'>
            <NewProduct />
          </Route>
        }

        <Route exact path='/orders'>
          <Orders />
        </Route>

        <Route exact path='/update/:productId'>
          <UpdateProduct />
        </Route>

        <Route exact path='/man'>
          <Shop type='man' />
        </Route>

        <Route exact path='/women'>
          <Shop type='women' />
        </Route>

        <Route exact path='/cart'>
          <Cart />
        </Route>

        <Route exact path='/whishlist'>
          <Whishlist />
        </Route>

        <Route exact path='/product/:id'>
            <Product />
        </Route>

        <Redirect to='/'/>
      
    </Switch>
    );
  } else {
    routes = (
   
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/man'>
          <Shop type='man' />
        </Route>

        <Route exact path='/women'>
          <Shop type='women' />
        </Route>

        <Route exact path='/cart'>
          <Cart />
        </Route>

        <Route exact path='/login'>
            <Login />
        </Route>

        <Route exact path='/signup'>
            <Signup />
        </Route>

        <Route exact path='/product/:id'>
            <Product />
        </Route>

        <Redirect to='/'/>
      
    </Switch>
    )
  }


  return (
    <>
      <CssBaseline />
      <Router history={history}>
        {routes}
      </Router>
    </>
  );
}

export default App;
