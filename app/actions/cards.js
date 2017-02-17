import axios from 'axios'

export const CARD_FETCH_LOADING = 'CARD_FETCH_LOADING'
export const CARD_FETCH_SUCCESS = 'CARD_FETCH_SUCCESS'
export const CARD_FETCH_ERROR   = 'CARD_FETCH_ERROR'
export const CARD_EMPTY         = 'CARD_EMPTY'
export const CARD_PATH          = '/cards'

export const fetchCards = category => dispatch => {
    dispatch({ type: CARD_FETCH_LOADING })
    return axios.get(CARD_PATH, { params: {category} })
        .then(res => dispatch({
            type: CARD_FETCH_SUCCESS,
            data: res.data
        }))
        .catch(err => dispatch({
            type: CARD_FETCH_ERROR,
            error: err.response.data
        }))
}

export const emptyCards = () => dispatch => dispatch({ type: CARD_EMPTY })
