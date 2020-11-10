import { axios } from 'utils/axios'
import { profile, profileEdit, changePassword } from 'routes/routes'

export default {
    getProfile: (id) => axios.get(profile(id)),
    editProfile: (data, id) => axios.post(profileEdit(id), data),
    changePassword: (passwords, id) => axios.post(changePassword(id), passwords),
}