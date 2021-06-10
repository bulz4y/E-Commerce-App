import { history }  from '../../shared/history/history';

import { USER_AUTH_BEGIN, USER_AUTH_FAILURE, USER_AUTH_SUCCESS, USER_LOGIN, USER_LOGOUT } from './userActionTypes';

const userAuthBegin = () => {
    return {
        type: USER_AUTH_BEGIN
    };
};

const userAuthFailure = (error) => {
    return {
        type: USER_AUTH_FAILURE,
        error: error
    };
};

const userAuthSuccess = (data) => {
    return {
        type: USER_AUTH_SUCCESS,
        user: data
    };
};


const logoutUser = () => {
    localStorage.removeItem('userData');
    return {
        type: USER_LOGOUT
    };
}

const loginUser = () => {
    return {
        type: USER_LOGIN
    };
}



const AuthUser = (url, data) => {
    return async (dispatch) => {
        dispatch(userAuthBegin());
        try {
            // await sleep(2000);

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            

            const userData = await res.json();

            if(!res.ok) {
                throw new Error(userData.error);
            }

            

            localStorage.setItem('userData', JSON.stringify(userData));

            dispatch(userAuthSuccess(userData));

            history.push('/');

        } catch(err) {
            console.log(err);
            dispatch(userAuthFailure(err.message));
        }
        
    }
};


// const sleep = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms));
// };

export {
    AuthUser,
    logoutUser,
    loginUser,
};