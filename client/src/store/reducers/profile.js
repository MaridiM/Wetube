import {
    PROFILE_GET_BY_ID,
    PROFILE_EDIT,
    PROFILE_PASSWORD,
} from 'store/typeActions'

const initialState = {
    success: false,
    error: false,
    user: {},
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case PROFILE_GET_BY_ID:
            return {
                ...state, 
                user: payload.user 
            }            
        case PROFILE_EDIT:
            return {
                ...state, 
                user: payload.user 
            }
        case PROFILE_PASSWORD:
            return {
                ...state, 
                user: payload.user 
            }
            
        default:
            return state
    }
}