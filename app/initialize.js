import { fetchCategories, getCurrentCategories } from './actions/categories'
import { loadCredential } from './actions/sessions'

const initialize = (store) => {
    store.dispatch(fetchCategories())

    const categories = localStorage.getItem('currentCategories')
    if (categories) store.dispatch(getCurrentCategories(JSON.parse(categories)))

    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) store.dispatch(loadCredential(accessToken))
}

export default initialize
