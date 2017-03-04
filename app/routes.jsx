import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App'
import CategoryList from './components/Category/List'
import CardList from './components/Card/List'
import TestList from './components/Test/List'

const getRoutes = store => {
    return <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={CategoryList} />
            <Route path="cards" component={CardList} />
            <Route path="test" component={TestList} />
        </Route>
    </Router>
}

export default getRoutes
