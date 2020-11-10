import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { UploadFile } from 'modules'

import { Avatar } from 'components'

import { config } from 'store/actions'
import { profileEdit, profileGetById } from 'store/actions'
import { changePassword } from 'routes/routes'

const { changeHandler } = config

const Profile = ({ user, success, error, profileEdit, profileGetById }) => {
    const {_id, src, username, email} = user
    const [state, setState] = useState({
        avatar: '',
        name: '',
        email: ''
    });
    useEffect(() => {
        const changeValue = () => {
            if (src || username || email) {
                setState(state => ({
                    ...state,
                    avatar: src,
                    name: username,
                    email: email
                }))
            }
        }

        changeValue()
    }, [profileGetById, src, username, email])

    const changeValue = e => {
        const value = e.target.value
        const name = e.target.name
        setState({ ...state, [name]: value })
    }
    return (
        <form className="profile__wrapper" method="POST">
            <div className="profile__avatar">
                <UploadFile 
                    name='avatar'
                    changeHandler={changeHandler}>
                    <Avatar src={state.avatar} />
                </UploadFile> 

            </div>
            <div className="profile__form">
                <div className="profile__form-form">
                    <input 
                        name="name" 
                        value={state.name}
                        onChange={(e) => changeValue(e)} 
                        className="profile__form-input" 
                        maxLength="64" 
                        placeholder="Name" 
                        required />
                    <input 
                        name="email"  
                        value={state.email}
                        onChange={(e) => changeValue(e)} 
                        className="profile__form-input" 
                        maxLength="64" 
                        placeholder="E-Mail" 
                        required />
                     <div className="profile__form-btns">
                        <button type="button" onClick={() => profileEdit(state, _id)} className="btn profile__form-btn">Save user</button>
                        <Link to={changePassword(_id)}>Change Password</Link>                    
                    </div>
                </div>
            </div>
        </form>
    )
}

Profile.defaultProps = {
    success: false,
    error: false,
    user: {},
    userId: ''
}
Profile.propTypes = {
    success: PropTypes.bool,
    error: PropTypes.bool,
    user: PropTypes.object,
    userId: PropTypes.string
}
const mapDispatchToProps = {
    profileEdit,
    profileGetById
}
const mapStateToProps = state => ({
    success: state.videos.success,
    error: state.videos.error,
    user: state.profile.user,    
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
