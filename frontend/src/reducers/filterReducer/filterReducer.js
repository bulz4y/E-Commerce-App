import { UPDATE_TYPES, NOT_READY, UPDATE_PRICE, CLEAR_FILTERS  } from "../../actions/filterActions/filterActionTypes";

const initialState = {
    types: [],
    price: [],
    ready: false
};

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_TYPES:
            return {
                ...state,
                types: action.data,
                ready: true
            };

        case UPDATE_PRICE:
            return {
                ...state,
                price: action.data,
                ready: true
            };

        case CLEAR_FILTERS:
            return {
                types: [],
                price: [],
                ready: true
            };

        case NOT_READY:
            return {
                ...state,
                ready: false
            };

        default: 
            return state;
    }
};

export default filterReducer;