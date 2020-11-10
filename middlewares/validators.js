import { body } from 'express-validator'
import User from '../models/user'

export const validator = {
    joinValidator: [
        body('email')
            .isEmail()
            .withMessage('No valid E-Mail')
            .custom(async (value, { req }) => {
                try {
                    const user = await User.findOne({ email: value })
                    console.log(user)

                    if (user) {
                        return Promise.reject('This email is already taken. Try again!')
                    }


                } catch (err) {
                    console.error(err)
                }
            })
            .normalizeEmail(),
        body('name')
            .isLength({ min: 3, max: 56 })
            .withMessage("Name must be between 3 and 56 characters")
            .trim(),
        body('password')
            .isLength({ min: 6, max: 56 })
            .withMessage("Password must be between 6 and 32 characters")
            .trim(),
        body('confirm')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Paswords is not equal")
                }
                return true
            })
            .trim()
    ],
    loginValidator: [
        body('email')
            .isEmail()
            .withMessage('No valid E-Mail')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6, max: 56 })
            .withMessage("Password must be between 6 and 32 characters")
            .trim(),
    ],
    resetValidator: [
        body('email')
            .isEmail()
            .withMessage('No valid E-Mail')
            .custom(async (value, { req }) => {
                try {
                    const user = await User.findOne({ email: value })
                    if (!user) {
                        return Promise.reject('E-Mail is not found!')
                    }
                } catch (err) {
                    console.error(err)
                }
            })
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6, max: 56 })
            .withMessage("Password must be between 6 and 32 characters")
            .trim(),
        body('confirm')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Paswords is not equal")
                }
                return true
            })
            .trim()
    ]
    
}