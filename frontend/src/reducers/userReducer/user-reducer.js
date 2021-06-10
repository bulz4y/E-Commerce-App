import { USER_AUTH_BEGIN, USER_AUTH_FAILURE, USER_AUTH_SUCCESS, USER_LOGIN, USER_LOGOUT } from '../../actions/userActions/userActionTypes';
import { CLEAR_ERROR } from '../../shared/actions/actions';


const initialState = {
    user: null,
    loading: false,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_AUTH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case USER_AUTH_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false,
                error: null
            };

        case USER_AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        
        case CLEAR_ERROR:
            return {
                ...state,
                error: false,
                loading: false,
            }

        case USER_LOGOUT: 
            return {
                ...state,
                user: null
            }
        

        case USER_LOGIN:
            const userData = JSON.parse(localStorage.getItem('userData'));
            return {
                ...state,
                user: userData
            }
        default: 
            return state
    }
};

export default userReducer;