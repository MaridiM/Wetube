import {Schema, model} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'


const UserSchema = new Schema({
    src: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: "Username is  required!"
    },
    email: {
        type: String,
        required: "Email is required!"
    },
    password: {
        type: String,
        // required: "Password is required!"
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    resetToken: String,
    resetTokenExp: Date,
    facebookId: Number,
    githubId: Number,
})


UserSchema.plugin(passportLocalMongoose, {usernameField: 'email' })

export default model('User', UserSchema)