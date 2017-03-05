import axios from 'axios'

export const SESSION_LOGIN = 'SESSION_LOGIN'
export const SESSION_LOAD = 'SESSION_LOAD'
export const SESSION_PATH = '/login'

export const login = (credential) => ({
    apiType: SESSION_LOGIN,
    callApi: () => axios.post(SESSION_PATH, credential)
})
