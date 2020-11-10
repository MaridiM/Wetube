import User from '../models/user'

const userUpdate = {}

// Main Profile Controller
export const mainGETController = async (req, res) => {
    try {
        const user = await User.findById(req.params.id.toString())
        user.src = `http://localhost:8080/${user.src}`
        if(!user) {
            res.status(404)
        }
        res.status(200).json({ user })
        
    } catch (err) {
        res.status(500)
        console.log(err)
    }
}
    
// Edit Profile Controller
export const editPOSTController = async (req, res) => {
    try {
        if(req.files) {
            console.log(req.files.avatar)
            userUpdate.src = req.files.avatar[0].path
            res.status(201)
        }

        if (req.body) {
            userUpdate.username = req.body.name,
            userUpdate.email = req.body.email
        }
        console.log(userUpdate)

        if (userUpdate.username && userUpdate.email) {
            const user = await User.findByIdAndUpdate(req.params.id.toString(), userUpdate)
            user.src = `http://localhost:8080/${user.src}`

            userUpdate = {}
            res.json({ user: user })
        }

    } catch (err) {
        res.status(500)
        console.log(err)
    }

}
    
// Password Profile Controller
export const passwordPOSTController = async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.body)
        const user = await User.findByIdAndUpdate(req.params.id.toString(), {password: req.body.password})
        res.status(200).json({user})
    } catch (err) {
        res.status(500)
        console.log(err)
    }
    res.json({ msg: "PASSWORD POST" })
}