import {Schema, model} from 'mongoose'

    const CommentSchema = new Schema({
        user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: "You can't send empty comment!"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    video: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
})

export default model("Comment", CommentSchema)