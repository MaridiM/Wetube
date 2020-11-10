import React from 'react'
import PropTypes from 'prop-types'


const Avatar = ({src, username}) => {
    return (
        <div className="avatar">
            <img src={src || process.env.PUBLIC_URL + '/assets/img/no-avatar.jpg'} alt={`Avatar ${username}`} />
        </div>
    )
}

Avatar.defaultProps = { 
    src: ''
}

Avatar.propTypes = {
    src: PropTypes.string
}

export default Avatar
