import * as cards from '../actions/cards'

const defaultState = {
    loading: false,
    data: [],
    error: null
}

const cardsReducer = (state=defaultState, action) => {
    switch(action.type) {
        case cards.CARD_FETCH_LOADING:
            return Object.assign({}, state, {
                loading: true,
                error: null
            })
        case cards.CARD_FETCH_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data,
                error: null
            })
        case cards.CARD_FETCH_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            })
        default:
            return state
    }
}

export default cardsReducer
