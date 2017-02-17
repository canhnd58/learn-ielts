import { combineReducers } from 'redux'
import cards from './cards'
import categories from './categories'

const reducer = combineReducers({
    cards,
    categories
})

export default reducer
