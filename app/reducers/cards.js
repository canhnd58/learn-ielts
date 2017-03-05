import * as cards from '../actions/cards'
import { stateForApi } from './helper'

const defaultState = {
    loading: false,
    data: [],
    error: null
}

const cardsReducer = (state=defaultState, action) => {
    const newState = {
        ...state,
        ...stateForApi(cards.CARD_FETCH, action, [...state.data].concat(action.data))
    }
    switch(action.type) {
        case cards.CARD_EMPTY:
            return {
                ...state,
                data: []
            }
    }
    return newState
}

export default cardsReducer
