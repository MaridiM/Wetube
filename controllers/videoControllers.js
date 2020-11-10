import Video from '../models/video'
import Comment from '../models/comment'
import User from '../models/user'


let videoUpload = {}

// Main Controllers
export const mainGETController = async (req, res) => {
    try {
        const videos = await Video.find({})
        
        videos.map((video) => {
            video.src = `http://localhost:8080/${video.src}`
            video.poster = `http://localhost:8080/${video.poster}`
        })
        res.status(200).json(videos)
    } catch (err) {
        res.status(500)
        console.log(err)
    }
}

// Edit Controllers
export const editGETController = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id.toString())
        res.status(200).json({video})
    } catch (err) {
        res.status(500)
        console.log(err)
    }
}
export const editPOSTController = async (req, res) => {
    try {
        const updateVideo = {
            title: req.body.title,
            description: req.body.description
        }
        const video = await Video.findByIdAndUpdate(req.params.id.toString(), updateVideo)
        res.status(201).json({video})
    } catch (err) {
        res.status(500)
        console.log(err)
    }

}

// Remove Controllers
export const removePOSTController = async (req, res) => {
    await Video.findOneAndDelete({_id: req.params.id.toString()})
    const videos = await Video.find({})
    res.status(200).json({videos})
}

// Upload Controllers
export const uploadPOSTController = async (req, res) => {
    try {
        if (req.files) {
            req.files.video && (videoUpload.src = req.files.video[0].path)           
            req.files.poster && (videoUpload.poster = req.files.poster[0].path)           
            res.status(201)         
        }
        if (req.body) {
            videoUpload.title = req.body.title
            videoUpload.description = req.body.description
        }

        if (
            videoUpload.src 
            && videoUpload.poster
            && videoUpload.title 
            && videoUpload.description 
            ) {
            const newVideo = await Video.create(videoUpload)
            res.status(200).json({id: newVideo._id})
        } else {
            res.status(204).json({msg: 'No full Content'})
        }
    } catch (err) {
        res.status(500)
        console.log(err)
    }
}

// Search Controllers
export const searchGETController = async (req, res) => {
    try {
        if(req.query.search !== '') {

            // const videos = db.videos.filter( video => {
            //     return video.title.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0 
            // })
            res.status(200).json({
                query: req.query.search,
                videos: videos || []
            })
        } else {
            res.status(200).json({
                videos: db.videos
            })
        }
    } catch (err) {
        res.status(400)
        console.log(err)
    }
}

// Watching Controllers
export const watchingGETController = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id.toString())
        const videos = await Video.find({})
        videos.map((video) => {
            video.src = `http://localhost:8080/${video.src}`
            video.poster = `http://localhost:8080/${video.poster}`
        })
        video.src = `http://localhost:8080/${video.src}`
        video.poster = `http://localhost:8080/${video.poster}`

        if (video) {
            res.status(200).json({
                video, 
                videos: videos,
            })
        } else {
            res.status(204)
        }
    } catch (err) {
        res.status(404)
        console.log(err)
    }
}

// Comments Controllers
export const AddCommentPOSTController = async (req, res) => {
    try {
        const video = await Video.findById(req.body.id.toString())
        const comment = await Comment.create({ text: req.body.comment})
        console.log(comment)
        video.comments.push(comment)
        await video.save()
        // const comment = {
        //     username: 'Katrina Marvel',       
        //     avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        //     createAt: Date.now(),
        //     text: req.body.comment
        // }


        res.status(201).json({
            comment,
            msg: 'Thanks to comments!'
        })
    } catch (err) {
        res.status(500)
        console.log(err)
    }
}
 