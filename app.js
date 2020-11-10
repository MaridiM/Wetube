import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import flash from 'connect-flash'
import session from 'express-session'

import mainRoutes from './routes/mainRoutes'
import videoRoutes from './routes/videoRoutes'
import profileRoutes from './routes/profileRoutes'


const app = express()


app.use('/uploads', express.static('uploads'))

app.use(helmet())
app.use(flash())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    secret: 'weTube',
    resave: false, 
    saveUnitialized:false
}))
app.use(cors())
app.use(morgan('dev'))

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ['*', 'self'],
            imgSrc: ["'self'", "data: https:", "image/svg", "image/png", "image/jpg", "image/jpeg", "image/gif"],
            mediaSrc: ["'self'", "data: video/*"],
            upgradeInsecureRequests: [],
        },
    })
)


app.use('/', mainRoutes)
app.use('/videos', videoRoutes)
app.use('/profile', profileRoutes)



module.exports = app