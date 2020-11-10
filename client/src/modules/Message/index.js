import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Message = ({ children, className, msg, error, path, linkText, hidden }) => {
    return (
        <div className={classNames(
            error ? "error-message" : "success-message",
            className
        )}
            hidden={!hidden}>
            <div className={classNames(
                error ? "error-message__text" : "success-message__text",
                className
            )}>
                {msg || children}
            </div>
            {linkText && <Link to={path}>{linkText}</Link>}
        </div>
    )
}

Message.defaultProps = {
    children: undefined,
    className: "",
    msg: "",
    linkText: "",
    path: "",
    error: true,
    hidden: true
}

Message.propTypes = {
    children: PropTypes.object,
    msg: PropTypes.string,
    className: PropTypes.string,
    linkText: PropTypes.string,
    path: PropTypes.string,
    error: PropTypes.bool,
    hidden: PropTypes.bool
}

export default Message
