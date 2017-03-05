import axios from 'axios'

export const CARD_FETCH = 'CARD_FETCH'
export const CARD_EMPTY = 'CARD_EMPTY'
export const CARD_PATH = '/cards'

export const fetchCards = category => ({
    apiType: CARD_FETCH,
    callApi: () => axios.get(CARD_PATH, { params: {category} }),
})

export const emptyCards = () => dispatch => dispatch({ type: CARD_EMPTY })
