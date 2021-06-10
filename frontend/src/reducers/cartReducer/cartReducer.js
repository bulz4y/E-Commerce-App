import { ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART } from "../../actions/cartActions/cartActionTypes";
import { USER_LOGOUT } from "../../actions/userActions/userActionTypes";

const initialState = {
    items: [],
    total: 0
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {

        case ADD_TO_CART:
            let newItems = [...state.items];

            let exists = false;
            for(let i = 0; i < newItems.length; i++) {
                if(newItems[i]._id === action.item._id) {
                    exists = true;
                    newItems[i].quantity += action.item.quantity;
                    newItems[i].sum = newItems[i].quantity * newItems[i].price;
                    break;
                }
            }

            
            if(!exists)  {
                newItems.push(action.item)
            }
            
            let sum = 0;
            for(let i = 0; i < newItems.length; i++) {
               sum += newItems[i].sum;
            }

            return {
                ...state,
                items: newItems,
                total: sum
            };


        case DELETE_FROM_CART: {
            let newItems = [...state.items];

            
            for(let i = 0; i < newItems.length; i++) {
                if(newItems[i]._id === action.id) {
                    newItems.splice(i, 1);
                    break;
                }
            }

            let sum = 0;
            for(let i = 0; i < newItems.length; i++) {
               sum += newItems[i].sum;
            }

            return {
                ...state,
                items: newItems,
                total: sum
            };
        }
           
        case CLEAR_CART:
            return {
                items: [],
                total: 0
            };

        case USER_LOGOUT: 
            return  {
                items: [],
                total: 0
            };

        default:
            return state
    }
};

export default cartReducer;