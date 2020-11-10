import { combineReducers } from 'redux'

import videos from './videos'
import profile from './profile'
import auth from './auth'

export default combineReducers({
    videos,
    profile,
    auth
})