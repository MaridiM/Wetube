import { axios } from 'utils/axios'
import {
    videos,
    videoEdit,
    videoDelete,
    videoUpload,
    videoWatch,
    videoSearch, 
    videoAddComment,
} from 'routes/routes'

export default {
    getAllVideos: () => axios.get(videos),
    getVideoById: id => axios.get(videoWatch(id)),
    getVideosBySearch: data => axios.get(videoSearch(data)),
    
    getVideoForEdit: (id) => axios.get(videoEdit(id)),
    editVideoById: (data, id) => axios.post(videoEdit(id), data),
    deleteVideoById: id => axios.post(videoDelete(id)),

    uploadVideo: (data, options) => axios.post(videoUpload, data, options),

    addCommentToVideo: comment => axios.post(videoAddComment, comment),
}