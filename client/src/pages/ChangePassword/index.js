import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { config } from 'store/actions'
import { profilePassword } from 'store/actions'
import { profile } from 'routes/routes'

const { changeHandler } = config

const ChangePassword = ({ success, error, user,  profilePassword }) => {
    return (
        <div className="form__form">
            <form method="POST">
                <input 
                    type="password" 
                    className="form__form-input" 
                    maxLength="32" 
                    autoComplete="off"
                    name="password" 
                    onChange={(e) => changeHandler('password', e)}
                    placeholder="New Password" required />
                <input 
                    type="password" 
                    className="form__form-input" 
                    maxLength="32" 
                    autoComplete="off"
                    name="confirm" 
                    onChange={(e) => changeHandler('confirm', e)}
                    placeholder="Confirm Password" required />
                <div className="form__form-btns">
                    <button 
                        type="button" 
                        
                        className="btn form__form-btn"
                        onClick={() => profilePassword(user._id)}
                        >
                            Change password
                    </button>
                    <Link to={profile(user._id)} className="form__form-link">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

ChangePassword.defaultProps = {
    success: false,
    error: false,
    userId: '',
    user: {}
}
ChangePassword.propTypes = {
    success: PropTypes.bool,
    error: PropTypes.bool,
    userId: PropTypes.string,
    user: PropTypes.object
}

const mapStateToProps = state => ({
    success: state.profile.success,
    error: state.profile.error,
    user: state.profile.user,
})
const mapDispatchToProps = {
    profilePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
