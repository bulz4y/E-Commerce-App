import { NOT_READY, UPDATE_PRICE, UPDATE_TYPES, CLEAR_FILTERS } from "./filterActionTypes"

const updateTypes = (data) => {
    return {
        type: UPDATE_TYPES,
        data
    }
};

const updatePrice = (data) => {
    return {
        type: UPDATE_PRICE,
        data
    }
}

const clearFilters = () => {
    return {
        type: CLEAR_FILTERS
    }
};

const notReady = () => {
    return {
        type: NOT_READY
    };
};

export {
    updateTypes,
    updatePrice,
    clearFilters,
    notReady
}
