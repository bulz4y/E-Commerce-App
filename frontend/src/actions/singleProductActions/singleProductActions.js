import {
    FETCH_SINGLE_PRODUCT_BEGIN,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_FAILURE,
} from './singleProductActionTypes';


const fetchSingleProductBegin = () => {
    return {
        type: FETCH_SINGLE_PRODUCT_BEGIN
    };
};
const fetchSingleProductSuccess = (data) => {
    return {
        type: FETCH_SINGLE_PRODUCT_SUCCESS,
        data
    };
};
const fetchSingleProductFailure = (data) => {
    return {
        type: FETCH_SINGLE_PRODUCT_FAILURE,
        data
    };
};



const fetchProduct = (url) => {
    return async (dispatch) => {
        dispatch(fetchSingleProductBegin());
        try {
            // await new Promise(resolve => setTimeout(resolve, 2000));

            const res = await fetch(url, {
                method: 'GET',
            });

            
            const productData = await res.json();

       

            if(!res.ok) {
                throw new Error(productData.error);
            }

            dispatch(fetchSingleProductSuccess(productData));


        } catch(err) {
            console.log(err);
            dispatch(fetchSingleProductFailure(err.message));
        }
    }
};

export {
    fetchProduct,
};