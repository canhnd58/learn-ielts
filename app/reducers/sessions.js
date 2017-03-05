import * as sessions from '../actions/sessions'
import { stateForApi } from './helper'

const defaultState = {
    loading: false,
    data: [],
    error: null
}

const sessionsReducer = (state=defaultState, action) => {
    const newState = {
        ...state,
        ...stateForApi(sessions.SESSION_LOGIN, action),
        ...stateForApi(sessions.SESSION_LOAD, action)
    }
    switch(action.type) {
        case sessions.SESSION_LOGOUT:
            return defaultState
    }
    return newState
}

export default sessionsReducer
