import { ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART } from "./cartActionTypes"

const addCartItem = (item) => {
    return {
        type: ADD_TO_CART,
        item
    };
};

const deleteCartItem = (id) => {
    return {
        type: DELETE_FROM_CART,
        id
    }
}

const clearCartItems = () => {
    return {
        type: CLEAR_CART
    };
};

export {
    addCartItem,
    deleteCartItem,
    clearCartItems
};