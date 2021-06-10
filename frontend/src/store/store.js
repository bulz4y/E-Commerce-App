import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer/user-reducer';
import productReducer from '../reducers/productReducer/product-reducer';
import categoryReducer from '../reducers/categoryReducer/category-reducer';
import singleProductReducer from '../reducers/singleProductReducer/single-product-reducer';
import adminReducer from '../reducers/adminReducer/admin-reducer';
import filterReducer from '../reducers/filterReducer/filterReducer';
import cartReducer from '../reducers/cartReducer/cartReducer';
import orderReducer from '../reducers/orderReducer/orderReducer';

const rootReducer = combineReducers({
    filters: filterReducer,
    admin: adminReducer,
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
    orders: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;