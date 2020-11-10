import {
    AUTH_JOIN,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_LOST_PASSWORD,
    RESET_TYPE_MESSAGE
} from 'store/typeActions'

const initialState = {
    auth: false,
    userId: '',
    msg: {},
    type: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_JOIN:
            return {
                ...state,
                auth: payload.auth,
                userId: payload.userId ? payload.userId : '',
                msg: payload.msg,
                type: 'join'
            }
            case AUTH_LOGIN:
            return {
                ...state,
                error: payload.status !== 200 ? true : false,
                auth: payload.auth,
                userId: payload.userId,
                msg: payload.msg,
                type: 'login'
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                auth: payload.auth
            }
        case AUTH_LOST_PASSWORD:
            return {
                ...state,
                msg: payload,
                type: 'reset'
            }

        case RESET_TYPE_MESSAGE:
            return {
                ...state,
                type: '',
                msg: {}
            }

        default:
            return state
    }
}