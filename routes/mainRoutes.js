import express from 'express'

import { main, join, login, logout, lostPassword } from './routes'
import {
    joinPOSTController,
    loginPOSTController,
    logoutPOSTController,
    resetPasswordPOSTController
} from '../controllers/mainControllers'
import { validator } from '../middlewares/validators'

const { joinValidator, loginValidator } = validator

const mainRouter = express.Router()

//  Join routes
mainRouter.post(join, joinPOSTController)
// Login routes
mainRouter.post(login, loginPOSTController)
// Logout routes
mainRouter.post(logout, logoutPOSTController)
// Lost Password routes
mainRouter.post(lostPassword, resetPasswordPOSTController)

export default mainRouter