import axios from 'axios'

export const CATEGORY_FETCH = 'CATEGORY_FETCH'
export const CATEGORY_SET = 'CATEGORY_SET'
export const CATEGORY_GET_CURRENT = 'CATEGORY_GET_CURRENT'
export const CATEGORY_PATH = '/categories'

export const fetchCategories = () => ({
    apiType: CATEGORY_FETCH,
    callApi: () => axios.get(CATEGORY_PATH)
})

export const getCurrentCategories = (data) => ({ type: CATEGORY_GET_CURRENT, data})

export const setCategories = (data) => {
    localStorage.setItem('currentCategories', JSON.stringify(data))
    return { type: CATEGORY_SET, data }
}
