import { FETCH_SUBCATEGORIES_SUCCESS, FETCH_CATEGORIES_BEGIN, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from '../../actions/categoriesActions/categoriesActionTypes';
import { CLEAR_ERROR } from '../../shared/actions/actions';

const initialState = {
    categories: [],
    subcategory: [],
    loading: false,
    error: false
};

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CATEGORIES_BEGIN:
            return {
                ...state,
                loading: true,
                error: false
            };
        
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.data,
                loading: false,
                error: false
            };

        case FETCH_SUBCATEGORIES_SUCCESS: 
        
            return {
                ...state,
                subcategory: action.data
            };

        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                subcategory: [],
                loading: false,
                error: action.data
            }

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

export default categoryReducer;