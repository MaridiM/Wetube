import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { config } from 'store/actions'
import { videosAddComment, videosGetById } from 'store/actions'

const { changeHandler } = config

const CommentsForm = ({ comments, success, error, videosAddComment, id, videosGetById }) => {
    return (
        <div className="watching__video-comments-form comments-form">
            <form className="comments-form__form" method="POST">
                <textarea 
                    maxLength="5000"
                    name="comment" 
                    onChange={(e) => changeHandler('comment', e)}
                    placeholder="Write your comment" 
                    ></textarea>
                <div className="comments-form__form-actions">
                    <div className="comments-form__form-actions-comments-info">
                        {comments && comments.length > 1 ? `Commemts: ${comments.length}` : 'Comment: 1'}
                    </div>
                    <button 
                        type="button"
                        onClick={() => {
                            videosAddComment(id)
                            videosGetById(id)
                        }}
                        className="btn comments-form__form-actions-btn">Send</button>
                </div>
            </form>
        </div>
  )
}

CommentsForm.defaultProps = {
    comments: [],
    success: false,
    error: false,
    videosAddComment: () => {},
    id: null,
}
CommentsForm.propTypes = {
    comments: PropTypes.array,
    success: PropTypes.bool,
    error: PropTypes.bool,
    videosAddComment: PropTypes.func,
    id: PropTypes.string,
}

const mapDispatchToProps = {
    videosAddComment,
    videosGetById
}
const mapStateToProps = state => ({
    success: state.videos.success,
    error: state.videos.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm)
