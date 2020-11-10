import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { config, resetPasswordAuth, resetTypeMessage } from 'store/actions'
import { main } from 'routes/routes'
import { Message } from 'modules'

const { changeHandler } = config

const Password = ({ resetPasswordAuth, resetMessage, msg, error, resetTypeMessage }) => {
    const token = document.location.search.split('=')[document.location.search.split('=').length -1 ]
    return (
        <div className="form__form">
            { resetMessage && <Message msg={msg} error={error} /> }
            <form method="POST">
            {
                token 
                    ? <>
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
                    </>
                    : <input 
                            type="email" 
                            className="form__form-input" 
                            autoComplete="on"
                            name="email" 
                            onChange={(e) => changeHandler('email', e)}
                            placeholder="Email" required />
            }
                
                <div className="form__form-btns">
                    <Link to={main} className="form__form-link" onClick={() => resetTypeMessage()}>Cancel</Link>
                    <button 
                        type="button" 
                        className="btn form__form-btn"
                        onClick={() => {
                            resetTypeMessage()
                            resetPasswordAuth(token && token)
                        }}
                        >{token ? 'Change' : 'Remind'}</button>
                </div>
            </form>
        </div>
    )
}

Password.defaultProps = { 
    resetPasswordAuth: () => {},
    resetTypeMessage: () => {},
    resetMessage: false,
    msg: '', 
    error: false
}
Password.propTypes = {         
    resetPasswordAuth: PropTypes.func,   
    resetTypeMessage: PropTypes.func,   
    resetMessage: PropTypes.bool,
    msg: PropTypes.string,
    error: PropTypes.bool
}
const mapDispatchToProps = {
    resetPasswordAuth,
    resetTypeMessage
}
export default connect(null, mapDispatchToProps)(Password)
