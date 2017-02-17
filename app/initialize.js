import { fetchCategories } from './actions/categories'

const initialize = (store) => {
    store.dispatch(fetchCategories())
}

export default initialize
