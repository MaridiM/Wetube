import express from 'express'

import { mainId, edit, changePassword } from '../routes/routes'
import {
    mainGETController,
    editPOSTController,
    passwordPOSTController
} from '../controllers/profileControllers'

import { uploadFile } from '../middlewares/uploadFile'

const profileRoutes = express.Router()

// Profile routes
profileRoutes.get(mainId, mainGETController)

// Edit-profile routes
profileRoutes.post(edit, uploadFile,  editPOSTController)

// Change-password routes
profileRoutes.post(changePassword, passwordPOSTController)



export default profileRoutes