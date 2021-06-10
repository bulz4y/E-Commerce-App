import { SET_FAVORITE, LOAD_MORE_BEGIN, LOAD_MORE_SUCCESS, LOAD_MORE_FAILURE, DELETE_PRODUCT, FETCH_PRODUCTS_BEGIN, FETCH_HOME_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_SHOP_PRODUCTS_SUCCESS } from '../../actions/productsActions/productsActionTypes';
import { USER_LOGOUT } from '../../actions/userActions/userActionTypes';
import { CLEAR_ERROR } from '../../shared/actions/actions';

const initialState = {
    bestSeller: [],
    newest: [],
    loading: false,
    loadMore: false,
    error: false,
    productTypes: [],
    man: [],
    women: [],
    admin: [],
    favs: []
};
 
const productReducer = (state = initialState, action) => {
   switch(action.type) {
       case FETCH_PRODUCTS_BEGIN:
           return {
               ...state,
               loading: true,
               error: false
           };


        case LOAD_MORE_BEGIN:
            return {
                ...state,
                error: false,
                loadMore: true
            };

        case FETCH_HOME_PRODUCTS_SUCCESS:
            return {
                ...state,
               bestSeller: action.data.bestSeller,
               newest: action.data.newest,
               loading: false,
               error: false
            }

        case FETCH_SHOP_PRODUCTS_SUCCESS: 
            return {
                ...state,
                error: false,
                loading: false,
                [action.category.toLowerCase()]: action.data,
                productTypes: action.productTypes
            }
        
        case LOAD_MORE_SUCCESS: {
            return {
                ...state,
                error: false,
                loadMore: false,
                [action.category.toLowerCase()]: [...state[action.category.toLowerCase()], ...action.data],
                productTypes: action.productTypes
            }
        }

        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.data,
                loading: false
            }
        
        case LOAD_MORE_FAILURE:
            return {
                ...state,
                error: action.data,
                loadMore: false
            };

        case DELETE_PRODUCT:
            let updatedProducts = [...state.admin];
            let index = updatedProducts.findIndex((p) => {
                return p._id === action.id;
            });

           

           updatedProducts.splice(index, 1);

            return {
                ...state,
                admin: updatedProducts

            };

        case SET_FAVORITE:
            return {
                ...state,
                favs: action.data
            }

        case USER_LOGOUT:
            return {
                ...state,
                favs: []
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: false,
                loading: false,
            }
       default:
           return state;
   }
};

export default productReducer;