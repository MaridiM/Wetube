import {
    VIDEOS_GET_ALL,
    VIDEOS_GET_BY_ID,
    VIDEOS_SEARCH,
    VIDEOS_EDIT,
    VIDEOS_FOR_EDIT,
    VIDEOS_DELETE,
    VIDEOS_ADD_COMMENT,
    VIDEOS_UPLOAD,
} from 'store/typeActions'

const initialState = {
    auth: false,
    success: false,
    error: false,
    search: false,
    watch: false,
    query: '',
    title: '',
    description: '', 
    video: {},
    comments: [],
    videos: [],
    uploadVideoId: null
}

export default (state=initialState, {type, payload}) => {
    switch (type) {
        case VIDEOS_GET_ALL:
            return {
                ...state,
                videos: payload.videos
            }
            
        case VIDEOS_GET_BY_ID:
        console.log(payload)
            return {
                ...state,
                video: payload.video || {},
                videos: payload.videos || [],
                watch: payload.status === 200 ? true : false,
            }

        case VIDEOS_SEARCH:
            return {
                ...state,
                search: payload.status,
                query: payload.query || '',
                videos: payload.videos,
            }

        case VIDEOS_ADD_COMMENT:
            state.video.comments.push(payload.comment)
            console.log(state.video)
            return {
                ...state,
                success: payload.status === 201 ? true : false,
                error: payload.status !== 201 ? true : false,
            }
        case VIDEOS_FOR_EDIT:
            return {
                ...state,
                video: payload.video,
                title: payload.video.title || '', 
                description: payload.video.description || ''
            }
        case VIDEOS_EDIT:
            return {
                ...state,
                video: payload.video,
            }
        case VIDEOS_DELETE:
            return {
                ...state,
                videos: payload.videos,
            }
        case VIDEOS_UPLOAD:
            return {
                uploadVideoId: payload.id
            }
            

        default:
            return state
    }
}