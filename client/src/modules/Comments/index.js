import React from 'react'
import PropTypes from 'prop-types'

import { CommentsForm, Comment } from 'components'


const Comments = ({comments, id}) => {
  return (
    <div className="watching__video-comments">
        <CommentsForm 
            id={id}
            comments={comments} 
            />
        
        <div className="watching__video-comments-list comments-list">
            {
                comments && comments.map(comment => { 
                    return <Comment key={comment._id || null} comment={comment}/> 
                }).reverse()
            }
        </div>
    </div>
  )
}

Comments.defaultProps = {
    comments: [], 
    id: null
}
Comments.defaultProps = {
    comments: PropTypes.array,
    id: PropTypes.string
}

export default Comments
