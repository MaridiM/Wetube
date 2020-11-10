import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import { config } from 'store/actions'
import { joinAuth, loginAuth } from 'store/actions'
import Buttons from './Buttons'

import { Message } from 'modules'

const {changeHandler } = config

const Join = ({ error, msg, joinMessage }) => {

    return (
        <>
            { joinMessage && <Message msg={msg} error={error} />}

            <div className="form__form">
                <form className="form__form-form" method="POST">
                    <input 
                        type="text" 
                        maxLength="64" 
                        name="name" 
                        autoComplete="on" 
                        onChange={(value) => changeHandler('name', value)}
                        placeholder="Name" 
                        required />
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
                    <input 
                        type="password" 
                        maxLength="32" 
                        autoComplete="off" 
                        name="confirm" 
                        onChange={(value) => changeHandler('confirm', value)}
                        placeholder="Confirm Password"
                        required />
                    
                    <Buttons />
                </form>
            </div>
        </>
    )
}
Join.defaultProps = {
    joinAuth: () => {},
    loginAuth: () => {},
    error: false, 
    msg: '', 
    type: '' 
}
Join.propTypes = {
    joinAuth: PropTypes.func,
    loginAuth: PropTypes.func,
    error: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps)(Join)
