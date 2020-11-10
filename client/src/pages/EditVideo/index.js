import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Video } from 'modules'

import { videoWatch } from 'routes/routes'
import { videosEdit, videosDelete, videosForEdit } from 'store/actions'


const EditVideo = ({ video, success, error, videosEdit, videosDelete, videosForEdit, ErrorPATH, title, description}) => {
    const [state, setState] = useState({
        title: '',
        description: ''
    });
    
    

    useEffect(() => {
        const fromPath = document.referrer.indexOf('/videos/watch')
        if (fromPath > 0) {
            const fromId = document.referrer.split('/')[document.referrer.split('/').length -1 ]
            const id = document.location.pathname.split('/')[document.location.pathname.split('/').length - 1]
            if (fromId === id ) {
                videosForEdit(id)
            } else {
                ErrorPATH()
            }
        } else {
            ErrorPATH()
        }
        const changeValue = () => {
            if (title && description) {
                setState(state => ({...state, title, description}) )
            }
        }

        changeValue()
    }, [videosForEdit, ErrorPATH, title, description])

    const changeHandler = e => {
        const value = e.target.value
        const name = e.target.name
        setState({...state, [name]: value})
    }


    return (
        <div className="edit-video__wrapper">
            <Video 
                key={video._id} 
                video={video} 
                className="edit-video__player"
                controls
                watch
                infoHide
            />
            <div className="edit-video__form">
                <form className="edit-video__form-form" method="POST" >
                    <input 
                        type="text" 
                        className="edit-video__form-input" 
                        maxLength="256" 
                        name="title" 
                        onChange={(e) => changeHandler(e)}
                        placeholder="Video Title" 
                        value={state.title} 
                        required />
                    <textarea 
                        maxLength="5000" 
                        name="description" 
                        onChange={(e) => changeHandler(e)}
                        placeholder="Write video description" 
                        className="edit-video__form-textarea"
                        value={state.description}
                        >
                    </textarea>

                    <div className="edit-video__form-btns">
                        <button 
                            type="button" 
                            className="btn edit-video__form-btn" 
                            onClick={() => window.location.pathname = videoWatch(video._id)}>Back</button>
                        <button 
                            type="button" 
                            className="btn edit-video__form-btn" 
                            onClick={() => {
                                videosEdit( state, video._id)
                                window.location.pathname = videoWatch(video._id)
                            }}>Save Video</button>
                        <button 
                            type="button" 
                            className="btn edit-video__form-btn" 
                            onClick={() => videosDelete(video._id)}>Delete Video</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

EditVideo.defaultProps = {
    success: false,
    error: false,
    video: {},
    videosEdit: () => {},
    videosDelete: () => {},
    videosForEdit: () => {},
    title: '',
    description: ''
}
EditVideo.propTypes = {
    success: PropTypes.bool,
    error: PropTypes.bool,
    video: PropTypes.object,

    videosEdit: PropTypes.func,
    videosDelete: PropTypes.func,
    videosForEdit: PropTypes.func,

    title: PropTypes.string,
    description: PropTypes.string,
}


const mapDispatchToProps = {
    videosEdit,
    videosDelete,
    videosForEdit,
}
const mapStateToProps = state => ({
    success: state.videos.success,
    error: state.videos.error,
    video: state.videos.video,
    title: state.videos.title,
    description: state.videos.description

})

export default connect(mapStateToProps, mapDispatchToProps)(EditVideo)
