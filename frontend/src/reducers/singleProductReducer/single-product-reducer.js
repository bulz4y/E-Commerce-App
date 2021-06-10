import { UPDATE_PRODUCT, FETCH_SINGLE_PRODUCT_BEGIN, FETCH_SINGLE_PRODUCT_SUCCESS, FETCH_SINGLE_PRODUCT_FAILURE } from '../../actions/singleProductActions/singleProductActionTypes';
import { CLEAR_ERROR } from '../../shared/actions/actions';


const initialState = {
    product: {},
    loading: false,
    error: false,
};
 

const productReducer = (state = initialState, action) => {
   switch(action.type) {
       case FETCH_SINGLE_PRODUCT_BEGIN:
           return {
               ...state,
               loading: true,
               error: false
           };
        case FETCH_SINGLE_PRODUCT_SUCCESS:
            
            return {
                ...state,
               product: action.data.product,
               loading: false,
               error: false
            }
        
        case FETCH_SINGLE_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.data,
                loading: false
            };
        
        case UPDATE_PRODUCT:
            return {
                ...state,
                product: action.data
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