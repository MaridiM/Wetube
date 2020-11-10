import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'

import User from '../models/user'
import sendMail from '../email'

import { joinTemplate, resetTemplate, newPasswordTemplate } from '../email/templates'

// Join Controllers
export const joinPOSTController = async (req, res) => {
    try {
        if (req.body.name && req.body.password && req.body.email ) {
            const { password, confirm, name, email } = req.body
            const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

            if (name.length < 3 || name.length > 64) {
                return res.status(422).json({ msg: 'Name must be between 3 and 56 characters' })
            }
            if (!REGEX_EMAIL.test(email)) {
                return res.status(422).json({ msg: 'Invalid email!' })
            }
            if (password !== confirm) {
                return res.status(422).json({ msg: "Ops! Your passwords is not equal." })
            }
            if (password.length < 6 || password.length > 64) {
                return res.status(422).json({ msg: "Password must be between 6 and 64 characters" })
            }
        
            const user = await User.findOne({email})
            if(user) {
                return res.status(422).json({
                    auth: false,
                    msg: 'This email is already taken. Try again!'
                })
            }

            // const heshPasword = await bcrypt.hash(password, 10)
            
            // const newUser = await User.create({
            //     username: name,
            //     email: email,
            //     password: heshPasword,
            // })
            
            const newUser = await User({
                username: name,
                email: email,
            })

            await User.register(newUser, password)
            
            await sendMail('google', joinTemplate(email, password))

            return res.status(200).json({
                id: newUser._id, 
                auth: true,
                msg: 'Thank you for registration!'

            })

        } else {
            return res.status(422).json({
                auth: false,
                msg: "Oops! Fields can't be empty!"
            })
        }
    } catch (err) {
        res.status(500)
        console.error(err) 
    }
}

// Login Controllers
export const loginPOSTController = async (req, res) => {
    try {        
        if (req.body.email && req.body.password) {
            const { password, email } = req.body

            const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

            if (!REGEX_EMAIL.test(email)) {
                return res.status(422).json({ msg: 'Invalid email!' })
            }
            if (password.length < 6 || password.length > 64) {
                return res.status(422).json({ msg: "Password must be between 6 and 64 characters" })
            }


            const user = await User.findOne({email: req.body.email})
            if(user) {
                const hashPassword = await bcrypt.compare(req.body.password, user.password)
                if(!hashPassword) {
                    res.status(401).json({msg: 'Wrong password. Try again', auth: false})
                }

                res.status(200).json({ id: user._id, auth: true })
            } else {
                res.status(401).json({msg: 'E-Mail is not found. Try again!', auth: false})
            }
        } else {
            res.status(422).json({
                msg: "Oops! Fields can't be empty!",
                auth: false
            })
        }
    } catch (err) {
        res.status(500)
        console.error(err) 
    }
}

// Logout Controllers
export const logoutPOSTController = (req, res) => {
    try {
        if (req.body !== {}) {
            res.status(200).json({
                auth: false
            })
        } else {
            res.status(400).json({
                auth: false
            })
        }
    } catch (err) {
        res.status(500)
        console.error(err) 
    }
}

// Lost Password Controllers
export const resetPasswordPOSTController = async (req, res) => {
    try {
        if (req.body.email || req.body.password) {            
            if(req.body.email) {
                crypto.randomBytes(32, async (err, buffer) => {
                    if(err) { 
                        return res.status(501).json({msg: 'Something went wrong, please try again later!'})
                    }
                    const token = buffer.toString('hex')
                    const user = await User.findOne({email: req.body.email})
    
                    if (user) {
                        user.resetToken = token
                        user.resetTokenExp = Date.now() + 60 * 60 * 100
    
                        await user.save()
                        await sendMail('google', resetTemplate(user.email, token))
    
                        return res.status(200).json({msg: 'We sent mail request to change password!'})
    
                    } else {
                        return res.status(422).json({msg: "E-Mail not found!"})
                    }
                }) 
            }

            if(req.body.password) {
                const {password, confirm} = req.body

                if(password !== confirm) {
                    return res.status(422).json({msg: "Ops! Your passwords is not equal."})
                }
                if (password.length < 6 || password.length > 64) {
                    return res.status(422).json({ msg: "Password must be between 6 and 64 characters"})
                }

                const user = await User.findOne({
                    resetToken: req.query.token,
                    resetTokenExp: { $gt: Date.now() } 
                })
                

                if (user) { 
                    const heshPasword = await bcrypt.hash(password, 10)

                    user.password = heshPasword
                    user.resetToken = ''
                    user.resetTokenExp = null
                    
                    await user.save()
                    await sendMail('google', newPasswordTemplate(user.email, password))
                    
                    return res.status(200).json({msg: "Your password was reset."})   
                } else {
                    return res.status(422).json({msg: "Ops! Your tokin is not work."})
                }   
            }
        } else {
            return res.status(422).json({msg: "Fields can't be empty!"})
        }
    } catch (err) {
        console.error(err) 
        return res.status(500)
    }
 }