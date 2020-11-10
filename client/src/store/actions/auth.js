import {
    AUTH_JOIN,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_LOST_PASSWORD,
} from 'store/typeActions'

import { authApi } from 'utils/api'
import { data } from 'store/actions'

const { join, login, logout, password } = authApi


export const joinAuth = () => async (dispatch) => {
    await join(data).then(res => {
        return {
            userId: res.data.id,
            auth: res.data.auth,
            msg: {
                msg: res.data.msg,
                status: res.status
            }
        }
    }).then(data => {
        dispatch({
            type: AUTH_JOIN,
            payload: data
        })
    }).catch(err => {
        dispatch({
            type: AUTH_JOIN,
            payload: {
                msg: {
                    msg: err.response.data.msg,
                    status: err.response.status
                },
                auth: err.response.data.auth
            }
        })
    })
}

export const loginAuth = () => async (dispatch) => {
    await login(data).then(res => {
        return {
            status: res.status,
            auth: res.data.auth,
            msg: res.data.msg
        }
    }).then(data => {
        dispatch({
            type: AUTH_LOGIN,
            payload: data

        })
    }).catch(err => {
        dispatch({
            type: AUTH_LOGIN,
            payload: {
                msg: {
                    msg: err.response.data.msg,
                    status: err.response.status
                },
                auth: err.response.data.auth
            }
        })
    })
}

export const logoutAuth = () => async (dispatch) => {
    await logout(data).then(res => {
        return {
            auth: res.data.auth,
        }
    }).then(data => {
        dispatch({
            type: AUTH_LOGOUT,
            payload: data
        })
    })
}

export const resetPasswordAuth = (token) => async (dispatch) => {
    try {
        await password(data, token).then(res => {
            console.log(res)
            return ({
                msg: res.status !== 204 ? res.data.msg : res.statusText,
                status: res.status
            })
        }).then(data => {
            dispatch({
                type: AUTH_LOST_PASSWORD,
                payload: data
            })
        }).catch(err => {
            dispatch({
                type: AUTH_LOST_PASSWORD,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status
                }
            })
        })
    } catch (err) {
        console.error(err)
    }
}