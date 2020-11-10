export const main = '/'
export const join = '/join'
export const login = '/login'
export const logout = '/logout'
export const lostPassword = token => token ? `/password?token=${token}` : '/password'

export const videos = '/videos'
export const videoEdit = id => id ? `/videos/edit/${id}` : '/videos/edit/:id'
export const videoDelete = id => id ? `/videos/delete/${id}` : '/videos/delete/:id'
export const videoUpload = '/videos/upload'
export const videoWatch = id => id ? `/videos/watch/${id}` :  '/videos/watch/:id'
export const videoSearch = query => query ? `/videos/search?search=${query}` : '/videos/search'
export const videoAddComment = '/videos/add-comment'

export const profile = id => id ? `/profile/${id}` : '/profile/:id'
export const profileEdit = id => id ? `/profile/edit/${id}` : '/profile/edit/:id'
export const changePassword = id => id ? `/profile/password/${id}` : '/profile/password/:id'

