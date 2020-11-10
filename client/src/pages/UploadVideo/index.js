import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { UploadFile } from 'modules'
import { config } from 'store/actions'
import { videosUpload } from 'store/actions'

const { changeHandler } = config

const UploadVideo = ({ success, error, videosUpload }) => {
    return (
        <div className="upload-video__wrapper">
            <div className="upload-video__form">
                <form className="upload-video__form-form" method='POST' encType='multipart/form-data' required>
                    <div className='upload-video__form-upload'>
                        <UploadFile 
                            name='poster'
                            type='image'
                            className='poster'
                            changeHandler={changeHandler}>
                                <i className="fas fa-upload"></i>
                                <span>Change Poster</span>
                        </UploadFile>
                        <UploadFile 
                            name='video'
                            type='video'
                            className='video'
                            changeHandler={changeHandler}>
                                <span>Change Video</span>
                        </UploadFile>
                    </div>
                    <div className="upload-video__form-input-section" >
                        <input 
                            type="text" 
                            className="upload-video__form-input" 
                            name='title'
                            onChange={(e) => changeHandler('title', e)}
                            maxLength="256" 
                            placeholder="Title" 
                            required />
                        <textarea 
                            name="description" 
                            onChange={(e) => changeHandler('description', e)}
                            className="upload-video__form-textarea" 
                            maxLength="5000"  
                            placeholder="Write video description" 
                            ></textarea>
                        <div className="upload-video__form-btns">
                            <button 
                                type="button" 
                                onClick={() => videosUpload()}
                                className="btn upload-video__form-btn"
                                >
                                    Upload Video
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

UploadVideo.defaultProps = {
    success: false,
    error: false,
}
UploadVideo.propTypes = {
    success: PropTypes.bool,
    error: PropTypes.bool,
}

const mapDispatchToProps = {
    videosUpload
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo)
