import express from 'express'
import { main, edit, remove, upload, watching, search, addComment } from './routes'
import {
    mainGETController,
    editGETController,
    editPOSTController,
    removePOSTController,
    uploadPOSTController,
    searchGETController,
    watchingGETController,
    AddCommentPOSTController
} from '../controllers/videoControllers'
import { uploadFile } from '../middlewares/uploadFile'

const videoRoutes = express.Router()


// Video routes
videoRoutes.get(main, mainGETController)

// Edit-video routes
videoRoutes.get(edit, editGETController)
videoRoutes.post(edit, editPOSTController)

// Delete-video routes
videoRoutes.post(remove, removePOSTController)

// Upload-video routes
videoRoutes.post(upload, uploadFile, uploadPOSTController)

// Search-video routes
videoRoutes.get(search, searchGETController)

// Watching-video routes
videoRoutes.get(watching, watchingGETController)

// Comment routes
videoRoutes.post(addComment, AddCommentPOSTController)



export default videoRoutes