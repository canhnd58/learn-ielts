import axios from 'axios'

export const CATEGORY_FETCH_LOADING = 'CATEGORY_FETCH_LOADING'
export const CATEGORY_FETCH_SUCCESS = 'CATEGORY_FETCH_SUCCESS'
export const CATEGORY_FETCH_ERROR   = 'CATEGORY_FETCH_ERROR'
export const CATEGORY_PATH = '/categories'

export const fetchCategories = () => dispatch => {
    dispatch({ type: CATEGORY_FETCH_LOADING })
    return axios.get(CATEGORY_PATH)
        .then(res => dispatch({
            type: CATEGORY_FETCH_SUCCESS,
            data: res.data
        }))
        .catch(err => dispatch({
            type: CATEGORY_FETCH_ERROR,
            error: err.response.data
        }))
}
