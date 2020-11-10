import React from 'react' 
import PropTypes from 'prop-types'
import moment from 'moment'

import { Avatar } from 'components'


const Comment = ({comment}) => {
    const { username, avatar, createAt, text } = comment

    return (
        <div className="comments-list__item">
            <div className="comments-list__item-avatar">
                <Avatar 
                    src={ avatar } 
                    username={ username } />
            </div>
            <div className="comments-list__item-content comment-content">
                <header className="comment-content__header">
                    <span>{ `@${username}` }</span>
                    <span>{ moment(createAt).format('MM.DD.YY, h:mm:ss') }</span>
                </header>
                <p className="comment-content__body">
                    { text }
                </p>
            </div>
        </div>
    )
}

Comment.defaultProps = {
    comment: {}
}
Comment.defaultProps = {
    comment: PropTypes.object
}

export default Comment
