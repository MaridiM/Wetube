import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import { config } from 'store/actions'
import { joinAuth, loginAuth } from 'store/actions'
import Buttons from './Buttons'

import { Message } from 'modules'

const {changeHandler } = config

const Login = ({ error, msg, loginMessage }) => {
    
    return (
        <>
            { loginMessage && <Message msg={msg} error={error} /> }
        
            <div className="form__form">
                <form className="form__form-form" method="POST">
                    <input 
                        type="email" 
                        maxLength="64" 
                        name="email" 
                        autoComplete="on" 
                        onChange={(value) => changeHandler('email', value)}
                        placeholder="E-Mail"
                        required />
                    <input 
                        type="password" 
                        maxLength="32" 
                        name="password" 
                        autoComplete="off" 
                        onChange={(value) => changeHandler('password', value)}
                        placeholder="Password" 
                        required />

                    <Buttons />
                </form>
            </div>
        </>
    )
}
Login.defaultProps = {
    joinAuth: () => {},
    loginAuth: () => {},
    error: false,
    msg: '',
    type: '' 
}
Login.propTypes = {
    error: PropTypes.bool,
    joinAuth: PropTypes.func,
    loginAuth: PropTypes.func,
    msg: PropTypes.string,
    type: PropTypes.string 
}

const mapDispatchToProps = {
    joinAuth,
    loginAuth
}
const mapStateToProps = state => ({
    type: state.auth.type,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
