import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        file.fieldname === 'video' && cb(null, 'uploads/videos/')
        file.fieldname === 'poster' && cb(null, 'uploads/videos/posters')
        file.fieldname === 'avatar' && cb(null, 'uploads/avatars')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const uploadFile = multer({ storage })
    .fields(
        [
            {name: 'video', maxCount: 1}, 
            {name: 'poster', maxCount: 1},
            {name: 'avatar', maxCount: 1},
        ]
    )
