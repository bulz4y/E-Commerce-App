import { CREATE_ORDER, SET_ORDERS, BEGIN_LOAD_ORDER, FAILURE_LOAD_ORDER } from '../../actions/orderActions/orderActionTypes';
import { CLEAR_ERROR } from '../../shared/actions/actions';


const initialState = {
    orders: [],
    loading: false,
    error: false,
    message: ''
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case BEGIN_LOAD_ORDER: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case CREATE_ORDER:
            const updatedOrders = [...state.orders];

            updatedOrders.push(action.data);

            return {
                orders: updatedOrders
            };

        case SET_ORDERS: 
            return {
                orders: action.data,
                loading: false, 
                error: false
            };


        case FAILURE_LOAD_ORDER:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.data
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: false,
                message: ''
            };
            
        default:
            return state;
    };
};

export default orderReducer;