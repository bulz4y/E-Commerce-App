import { CRUD_ADMIN_BEGIN, CRUD_ADMIN_SUCCESS, CRUD_ADMIN_FAILURE, CLOSE_SUCCESS_MODAL } from './adminActionsTypes';
import { DELETE_PRODUCT } from '../productsActions/productsActionTypes';
import { UPDATE_PRODUCT } from '../singleProductActions/singleProductActionTypes';

const crudAdminBegin = () => {
    return {
        type: CRUD_ADMIN_BEGIN
    };
};

const crudAdminFailure = (message) => {
    return {
        type: CRUD_ADMIN_FAILURE,
        message
    };
};

const crudAdminSuccess = (message) => {
    return {
        type: CRUD_ADMIN_SUCCESS,
        message
    };
};

const closeSuccessModal = () => {
    return {
        type: CLOSE_SUCCESS_MODAL
    };
};

const deleteProductAdmin = (id) => {
    return {
        type: DELETE_PRODUCT,
        id
    };
};

const updateProductAdmin = (data) => {
    return {
        type: UPDATE_PRODUCT,
        data
    };
};


const updateProduct = (url, data, token) => {
    return async (dispatch) => {
        dispatch(crudAdminBegin());

        try {
            const res = await fetch(url, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            });

            
            const crudData = await res.json();


            if(!res.ok) {
                throw new Error(crudData.error);
            }


            dispatch(crudAdminSuccess(crudData.message));

            dispatch(updateProductAdmin(crudData.product));
           

        } catch(err) {
            console.log(err);
            dispatch(crudAdminFailure(err.message));
        }
    };
}

const deleteProduct = (url, product, token) => {
    return async (dispatch) => {
        dispatch(crudAdminBegin());

        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });

            
            const crudData = await res.json();


            if(!res.ok) {
                throw new Error(crudData.error);
            }

        

            dispatch(crudAdminSuccess(crudData.message));

            dispatch(deleteProductAdmin(product._id));
           

        } catch(err) {
            console.log(err);
            dispatch(crudAdminFailure(err.message));
        }

    }
}

const createProduct = (url, data, token) => {
    return async (dispatch) => {
        dispatch(crudAdminBegin());

    

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            });

            
            const crudData = await res.json();

            if(!res.ok) {
                throw new Error(crudData.error);
            }

            dispatch(crudAdminSuccess(crudData.message));
        } catch(err) {
            console.log(err);
            dispatch(crudAdminFailure(err.message));
        }
    }
};

export {
    createProduct,
    deleteProduct,
    updateProduct,
    closeSuccessModal,
}