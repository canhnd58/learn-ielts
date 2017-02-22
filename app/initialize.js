import { fetchCategories, getCurrentCategories } from './actions/categories'

const initialize = (store) => {
    store.dispatch(fetchCategories())
    let current = localStorage.getItem('currentCategories')
    if (current) store.dispatch(getCurrentCategories(JSON.parse(current)))
}

export default initialize
