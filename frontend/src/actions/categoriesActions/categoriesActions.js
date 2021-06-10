import { FETCH_CATEGORIES_BEGIN, FETCH_SUBCATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS } from './categoriesActionTypes';

const fetchCategoriesBegin = () => {
    return {
        type: FETCH_CATEGORIES_BEGIN
    };
};

const fetchCategoriesFailure = (data) => {
    return {
        type: FETCH_CATEGORIES_FAILURE,
        data
    };
};

const fetchCategoriesSuccess = (data) => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        data
    };
};

const fetchSubcategoriesSuccess = (data) => {
    return {
        type: FETCH_SUBCATEGORIES_SUCCESS,
        data
    };
};


const fetchSubcategories = (url, parentId) => {
    return async (dispatch) => {
        try {
            const res = await fetch(url, {
                method: 'GET',
            });

            
            const subcategoriesData = await res.json();
            const subcategories = subcategoriesData.subcategory;

            if(!res.ok) {
                throw new Error(subcategories.error);
            }

           

            dispatch(fetchSubcategoriesSuccess(subcategories));
        } catch(err) {
            console.log(err);
            dispatch(fetchCategoriesFailure(err.message));
        }
    }
}

const fetchCategories = (url) => {
    return async (dispatch) => {
        dispatch(fetchCategoriesBegin());
        try {
            // await sleep(2000);

            const res = await fetch(url, {
                method: 'GET',
            });

            
            const categoriesData = await res.json();
            const categories = categoriesData.categories;

            

            if(!res.ok) {
                throw new Error(categories.error);
            }

            dispatch(fetchCategoriesSuccess(categories));


        } catch(err) {
            console.log(err);
            dispatch(fetchCategoriesFailure(err.message));
        }
    }
};

export {
    fetchCategories,
    fetchSubcategories,
};