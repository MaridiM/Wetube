import {Schema, model} from 'mongoose'

const VideoSchema = new Schema({
    src: String,
    poster: String,
    title: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'

        }
    ]

})

export default model('Video', VideoSchema)