import {CREATE_ORDER, FAILURE_LOAD_ORDER, SET_ORDERS, BEGIN_LOAD_ORDER} from './orderActionTypes';

const createNewOrder = (data) => {
    return {
        type: CREATE_ORDER,
        data
    };
};

const setOrders = (data) => {
    return {
        type: SET_ORDERS,
        data
    }
}


const beginLoadOrder = () => {
    return {
        type: BEGIN_LOAD_ORDER
    };
};

const failureLoadOrder = (data) => {
    return {
        type: FAILURE_LOAD_ORDER,
        data
    }
}
const getOrders = (url, orderData) => {
    return async (dispatch) => {
        dispatch(beginLoadOrder());
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + orderData.token
                },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();


            if(!res.ok) {
                throw new Error(data.error);
            }

            dispatch(setOrders(data.orders));


        } catch(err) {
            console.log(err);
            dispatch(failureLoadOrder(err.message));
        }
    };
}

const createOrder = (url, orderData) => {
    return async (dispatch) => {



        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();


            if(!res.ok) {
                throw new Error(data.error);
            }

            dispatch(createNewOrder(data.order));


        } catch(err) {
            console.log(err);
            
        }
    };
};


export {
    createOrder,
    getOrders
};