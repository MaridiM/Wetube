import { axios } from 'utils/axios'
import { join, login, logout, lostPassword } from 'routes/routes'

export default {
    join: data => axios.post(join, data),
    login: data => axios.post(login, data),
    logout: () => axios.post(logout),
    password: (data, token) => axios.post(lostPassword(token && token), data),
}