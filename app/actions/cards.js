import axios from 'axios'

export const CARD_FETCH_LOADING = 'CARD_FETCH_LOADING'
export const CARD_FETCH_SUCCESS = 'CARD_FETCH_SUCCESS'
export const CARD_FETCH_ERROR   = 'CARD_FETCH_ERROR'
export const CARD_PATH = '/cards'

export const fetchCards = () => dispatch => {
    dispatch({ type: CARD_FETCH_LOADING })
    return axios.get(CARD_PATH)
        .then(res => dispatch({
            type: CARD_FETCH_SUCCESS,
            data: res.data
        }))
        .catch(err => dispatch({
            type: CARD_FETCH_ERROR,
            error: err.response.data
        }))
}
