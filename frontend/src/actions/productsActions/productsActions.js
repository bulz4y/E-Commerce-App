import { SET_FAVORITE, LOAD_MORE_BEGIN, LOAD_MORE_SUCCESS, LOAD_MORE_FAILURE, FETCH_PRODUCTS_BEGIN, FETCH_HOME_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_SHOP_PRODUCTS_SUCCESS } from './productsActionTypes';
import { increment, setEndPage } from '../../shared/utils/pageNumber';

const fetchProductsBegin = () => {
    return {
        type: FETCH_PRODUCTS_BEGIN
    };
};

const fetchProductsFailure= (data) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        data
    };
};

const fetchHomeProductsSuccess = (data) => {
    return {
        type: FETCH_HOME_PRODUCTS_SUCCESS,
        data
    };
};

const fetchShopProductsSuccess = (data, category, productTypes) => {
    return {
        type: FETCH_SHOP_PRODUCTS_SUCCESS,
        data,
        category,
        productTypes
    };
};

const loadMoreBegin = () => {
    return {
        type: LOAD_MORE_BEGIN
    };
};

const loadMoreSuccess = (data, category, productTypes) => {
    return {
        type: LOAD_MORE_SUCCESS,
        data,
        category,
        productTypes
    };
};


const loadMoreFailure = (data) => {
    return {
        type: LOAD_MORE_FAILURE,
        data
    };
};

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }



const setFavoriteAction = (data) => {
    return {
        type: SET_FAVORITE,
        data
    };
};

const initFavorite = (url, token) => {
    return async (dispatch) => {
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            const data = await res.json();

 

            if(!res.ok) {
                throw new Error(data.error);
            }

            dispatch(setFavoriteAction(data.favs));

        } catch(err) {
            console.log(err);
        }
    }
}

const setFavorite = (url, id, userId, token) => {
    return async (dispatch) => {
        try {
            // await sleep(2000);

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({id, userId})
            });

            
            const data = await res.json();
            

            if(!res.ok) {
                throw new Error(data.error);
            }

            dispatch(setFavoriteAction(data.favs));


        } catch(err) {
            console.log(err);
        }
    }
}

const fetchShopProducts = (url, category, filters, page, loadMore) => {
    return async (dispatch) => {
        if(loadMore) {
            dispatch(loadMoreBegin())
        } else {
            dispatch(fetchProductsBegin());
        }
        

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category,
                    filters,
                    page
                })
            });

            
            const productData = await res.json();
            

            if(!res.ok) {
                throw new Error(productData.error);
            }

            let type = category ? category.name : 'admin';

            increment();

            if(productData.products.length === 0) {
                setEndPage();
            }

            if(loadMore) {
                dispatch(loadMoreSuccess(productData.products, type, productData.productTypes));
            } else {
                dispatch(fetchShopProductsSuccess(productData.products, type, productData.productTypes));
            }
           

        } catch(err) {
            console.log(err);
            if(loadMore) {
                dispatch(loadMoreFailure(err.message));
            } else {
                dispatch(fetchProductsFailure(err.message));
            }
            
        }
    }
}




const fetchHomeProducts = (url) => {
    return async (dispatch) => {
        dispatch(fetchProductsBegin());
        try {
            // await sleep(2000);

            const res = await fetch(url, {
                method: 'GET',
            });

            
            const productData = await res.json();
            

            if(!res.ok) {
                throw new Error(productData.error);
            }

            dispatch(fetchHomeProductsSuccess(productData));


        } catch(err) {
            console.log(err);
            dispatch(fetchProductsFailure(err.message));
        }
    };
};

export {
    fetchHomeProducts,
    fetchShopProducts,
    setFavorite,
    initFavorite
};

