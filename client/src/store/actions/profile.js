import {
    PROFILE_GET_BY_ID,
    PROFILE_EDIT,
    PROFILE_PASSWORD
} from 'store/typeActions'

import { data } from 'store/actions'
import { profileApi } from 'utils/api'

const {
    getProfile,
    editProfile,
    changePassword
} = profileApi

export const profileGetById = id => async dispatch => {
    return await getProfile(id)
        .then(res => ({user: res.data.user}))
        .then(data => {
            dispatch({
                type: PROFILE_GET_BY_ID,
                payload: data
            })
        })
   
}
export const profileEdit = (data, id) => async dispatch => {
    console.log(data, id)
    return await editProfile(data, id)
        .then(res => ({ user: res.data.user }))
        .then(data => {
            dispatch({
                type: PROFILE_EDIT,
                payload: data
            })
        })
}
export const profilePassword = (id) => async dispatch => {
    return await changePassword(data, id)
        .then(res => ({ user: res.data.user }))
        .then(data => {
            dispatch({
                type: PROFILE_PASSWORD,
                payload: data
            })
        })

}