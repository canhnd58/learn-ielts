import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App'
import Card from './components/Card'

const getRoutes = store => {
    return <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Card} />
        </Route>
    </Router>
}

export default getRoutes
