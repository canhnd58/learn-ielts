import * as categories from '../actions/categories'

const defaultState = {
    loading: false,
    data: [],
    error: null
}

const categoriesReducer = (state=defaultState, action) => {
    switch(action.type) {
        case categories.CATEGORY_FETCH_LOADING:
            return Object.assign({}, state, {
                loading: true,
                error: null
            })
        case categories.CATEGORY_FETCH_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data,
                error: null
            })
        case categories.CATEGORY_FETCH_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            })
        default:
            return state
    }
}

export default categoriesReducer
