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

// Use redux middlewares
const middlewares = [thunk]
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
