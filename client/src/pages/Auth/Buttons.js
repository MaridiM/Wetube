import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { joinAuth, loginAuth, resetTypeMessage } from 'store/actions'
import { join, login, lostPassword } from 'routes/routes'

const Buttons = ({ location, joinAuth, loginAuth, resetTypeMessage }) => {
    const { pathname } = location
    return (
        <div className="form__form-btns">
            <button
                type="button"
                onClick={() => {
                    resetTypeMessage()
                    pathname === join ? joinAuth() : loginAuth()
                }}
                className="btn form__form-btn">
                {pathname === join ? 'Join' : 'Login'}
            </button>
            {
                pathname === join
                    ? <Link 
                            to={login} 
                            className="auth__auth--link" 
                            onClick={() => resetTypeMessage()}
                            >I have Account</Link>

                    : <div className="auth__auth-group">
                        <Link 
                            to={join} 
                            className="auth__auth--link" 
                            onClick={() => resetTypeMessage()}
                            >I don't have Account</Link>
                        <Link 
                            to={lostPassword()} 
                            className="auth__auth--link" 
                            onClick={() => resetTypeMessage()}
                            >I lost password</Link>
                    </div>
            }
            <button
                className='btn form__form-auth'
                onClick={() => console.log('Github')}>
                <i className="fab fa-github"></i>
                Continue with Github
            </button>
            <button
                className='btn form__form-auth'
                onClick={() => console.log('Facebook')}>
                <i className="fab fa-facebook-f"></i>
                Continue with Facebook
            </button>
            
        </div>
    )
}
Buttons.defaultProps = {
    joinAuth: () => {},
    loginAuth: () => {},
    resetTypeMessage: () => {}
}
Buttons.propTypes = {
    joinAuth: PropTypes.func,
    loginAuth: PropTypes.func,
    resetTypeMessage: PropTypes.func,
}

const mapDispatchToProps = {
    joinAuth,
    loginAuth,
    resetTypeMessage
}


export default connect(null, mapDispatchToProps)(withRouter(Buttons))
