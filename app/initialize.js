import { fetchCards } from './actions/cards'

const initialize = (store) => {
    store.dispatch(fetchCards())
}

export default initialize
