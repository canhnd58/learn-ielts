import { combineReducers } from 'redux'
import cards from './cards'
import categories from './categories'
import sessions from './sessions'

const reducer = combineReducers({
    cards,
    categories,
    sessions
})

export default reducer
