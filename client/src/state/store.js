import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// REDUCERS
import { reducer } from './reducer'

const store = createStore(reducer, composeWithDevTools())

export default store
