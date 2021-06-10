
import { CLOSE_SUCCESS_MODAL, CRUD_ADMIN_BEGIN, CRUD_ADMIN_SUCCESS, CRUD_ADMIN_FAILURE } from '../../actions/adminActions/adminActionsTypes';
import { CLEAR_ERROR } from '../../shared/actions/actions';

const initialState = {
    loading: false,
    error: false,
    message: ''
};

const adminReducer = (state = initialState, action) => {
    switch(action.type) {
        case CRUD_ADMIN_BEGIN:
            return {
                ...state,
                loading: true,
                error: false
            };
        
        case CRUD_ADMIN_SUCCESS:
            return {
                message: action.message,
                loading: false,
                error: false
            };

        case CRUD_ADMIN_FAILURE: 
            return {
                ...state,
                error: action.message,
                loading: false
            }

        case CLOSE_SUCCESS_MODAL:
            
                return {
                    ...state,
                    error: false,
                    loading: false,
                    message: ''
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

export default adminReducer;