import * as categories from '../actions/categories'
import * as cards from '../actions/cards'
import { stateForApi } from './helper'

const defaultState = {
    loading: false,
    data: [],
    current: [],
    error: null
}

const categoriesReducer = (state=defaultState, action) => {
    const newState = {
        ...state,
        ...stateForApi(categories.CATEGORY_FETCH, action)
    }
    switch(action.type) {
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
    }
    return newState
}

export default categoriesReducer
