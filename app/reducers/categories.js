import * as categories from '../actions/categories'
import * as cards from '../actions/cards'

const defaultState = {
    loading: false,
    data: [],
    current: [],
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
        case categories.CATEGORY_SET:
            return {
                ...state,
                current: action.data
            }
        case categories.CATEGORY_GET_CURRENT:
            return {
                ...state,
                current: action.data
            }
        case cards.CARD_EMPTY:
            return {
                ...state,
                current: []
            }
        default:
            return state
    }
}

export default categoriesReducer
