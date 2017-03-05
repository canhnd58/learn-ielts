import axios from 'axios'

export const SESSION_LOGIN = 'SESSION_LOGIN'
export const SESSION_LOGOUT = 'SESSION_LOGOUT'
export const SESSION_LOAD = 'SESSION_LOAD'
export const SESSION_PATH = '/login'

const setAuth = token => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    localStorage.setItem('accessToken', token)
}

const removeAuth = token => {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('accessToken')
}

export const login = credential => {
    removeAuth()
    return {
        apiType: SESSION_LOGIN,
        callApi: () => axios.post(SESSION_PATH, credential),
        success: res => setAuth(res.data.token)
    }
}

export const loadCredential = token => {
    setAuth(token)
    return {
        apiType: SESSION_LOAD,
        callApi: () => axios.get(SESSION_PATH)
    }
}

export const logout = () => {
    removeAuth()
    return { type: types.SESSION_LOGOUT }
}
