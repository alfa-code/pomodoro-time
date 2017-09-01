import { createStore } from 'redux'
import rootReducer from '@src/reducers/index.js'

var initialStoreState = {}

const store = createStore(rootReducer, initialStoreState)

window.store = store

export default store