import { videoApi, profileApi } from 'utils/api'
import { RESET_TYPE_MESSAGE } from 'store/typeActions'

export {
    joinAuth,
    loginAuth,
    logoutAuth,
    resetPasswordAuth
} from './auth'

export {
    videosGetAll,
    videosGetById,
    videosSearch,
    videosForEdit,
    videosEdit,
    videosDelete,
    videosUpload,
    videosAddComment,
} from './videos'

export {
    profileGetById,
    profileEdit,
    profilePassword
} from './profile'





export const data = {}

const { uploadVideo } = videoApi
const { editProfile } = profileApi

export const config = {
    changeHandler: async (name, e, options) => {
        if (e.target.files) {
            e.preventDefault();
            const file = e.target.files[0]    
            let formData = new FormData();
            formData.append([name], file)

            

            return name === 'video' || name === 'poster' 
                ? await uploadVideo(formData, options) 
                : await editProfile(formData, options)            
        }
        return data[name] = e.target.value
    }
}


export const resetTypeMessage = () => dispatch => {
    dispatch({ 
        type: RESET_TYPE_MESSAGE,
    })
}
