import {
    VIDEOS_GET_ALL,
    VIDEOS_GET_BY_ID,
    VIDEOS_SEARCH,
    VIDEOS_EDIT,
    VIDEOS_FOR_EDIT,
    VIDEOS_DELETE,
    VIDEOS_ADD_COMMENT,
    VIDEOS_UPLOAD,

} from  'store/typeActions'
import { data } from 'store/actions'
import { videoApi } from 'utils/api'

const { 
    getAllVideos,
    getVideoById,
    getVideosBySearch,
    editVideoById,
    getVideoForEdit,
    deleteVideoById,
    uploadVideo,
    addCommentToVideo,
} = videoApi
 

//  GET ALL VIDEOS __ REQUEST TO SERVER AND GET ANSWER
export const videosGetAll = () => async (dispatch) => {
    return await getAllVideos()
    .then(res => ({
        videos: res.data
    }))
    .then(data => {
        dispatch({
            type: VIDEOS_GET_ALL,
            payload: data
        })
    })
}


//  GET ONE VIDEO __ REQUEST TO SERVER AND GET ANSWER
export const videosGetById = id => async dispatch => {
    return await getVideoById(id)
        .then(res => {
            return {
                video: res.data.video,
                videos: res.data.videos,
                status: res.status
            }
        })
        .then(data => {
            dispatch({
                type: VIDEOS_GET_BY_ID,
                payload: data
            })
        })
}


//  SEARCH DATA FROM  INPUT SEARCH __ REQUEST TO SERVER AND GET ANSWER
export const videosSearch = (query) => async dispatch => {
    return await getVideosBySearch(query)
        .then(res => {
            console.log(res)
            return {
                query: res.data.query,
                videos: res.data.videos,
                status: res.status
            }
        })
        .then( data => {
            dispatch({
                type: VIDEOS_SEARCH,
                payload: data
            })
        })
}


// EDIT FUNCTIONS __  GET  VIDEO DATA FOR EDIT AND EDIT IT
export const videosForEdit = (id) => async dispatch => {
    return await getVideoForEdit(id)
        .then(res => ({
            video: res.data.video
        }))
        .then(data => {
            dispatch({
                type: VIDEOS_FOR_EDIT,
                payload: data
            })
        })
}
export const videosEdit = (formData, id) => async dispatch => {
    return await editVideoById(formData, id)
        .then(res => ({ video: res.data.video }))
        .then(data => {
            dispatch({
                type: VIDEOS_EDIT,
                payload: data
            })
        })
}



// DELETE VIDEO __ SEND  REQUEST TO SERVER AND DELETE VIDEO
export const videosDelete = (id) => async dispatch => {
    return await deleteVideoById(id)
        .then(res => ({ videos: res.data.videos}))
        .then(data => {
            dispatch({
                type: VIDEOS_DELETE,
                payload: data
            })
        })
}


// UPLOAD VIDEO __ SEND  REQUEST TO SERVER AND DELETE VIDEO
export const videosUpload = () => async dispatch => {
    return await uploadVideo(data)
        .then(res => ({ id: res.data.id }))
        .then(data => {
            dispatch({
                type: VIDEOS_UPLOAD,
                payload: data
            })
        })
}


// ADD COMMENT TO  VIDEO __ GET VIDEO COMMENT FROM  SERVER AND SEND NEW 
export const videosAddComment = (id) => async dispatch => {
    data.id=id //Add ID in form  DATA {}
    return await addCommentToVideo(data)
        .then(res => ({
            status: res.status,
            comment: res.data.comment || {},
        }))
        .then(data => {
            console.log(data)
            dispatch({
                type: VIDEOS_ADD_COMMENT,
                payload: data
            })
        })
}
