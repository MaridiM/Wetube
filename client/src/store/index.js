import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootRedusers from './reducers'

export default createStore(
    rootRedusers,
    composeWithDevTools(applyMiddleware(thunk))
    
)