import React from 'react'
import thunk from 'redux-thunk'
import axios from 'axios'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import getRoutes from './routes'
import initialize from './initialize'
import { DEBUG, API_URL } from './config'

const apiMiddleware = ({ dispatch, getState }) => next => action => {
    const { apiType, callApi, success, error } = action
    if (!apiType) return next(action)

    const loadingAction = apiType + '_LOADING'
    const successAction = apiType + '_SUCCESS'
    const errorAction = apiType + '_ERROR'

    dispatch({ type: loadingAction })
    let promise = callApi().then(res => {
        dispatch({
            type: successAction,
            data: res.data
        })
        return res
    })
    if (success) promise = promise.then(res => success(res))
    promise = promise.catch(err => {
        dispatch({
            type: errorAction,
            error: err.response.data
        })
        return err
    })
    if (error) promise = promise.then(err => error(err))
    return promise
}

// Use redux middlewares
const middlewares = [thunk, apiMiddleware]
if (DEBUG) {
    const createLogger = require('redux-logger')
    middlewares.push(createLogger())
}

// Create store and apply middlewares
const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
)

// Set request default configurations
axios.defaults.baseURL = API_URL

// Initialize store with some data
initialize(store)

// Actually render the app
render(
    <Provider store={store}>
        {getRoutes(store)}
    </Provider>,
    document.getElementById('root')
)
