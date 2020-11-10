import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Video, Comments } from 'modules'
import { Status } from 'components'


const Watching = ({ videos, auth, success, error, video, watch }) => {
    return (
        <>
            {
                watch 
                    ? <>
                        <div className="watching__video">
                            <Video
                                className="watching__video-watch"
                                auth={auth}
                                video={video}
                                controls
                                watch
                            />

                            <div className="watch__video-wrapper">
                                {
                                    video.comments &&
                                    <Comments
                                        id={video._id}
                                        comments={video.comments}
                                        success={success}
                                        error={error}
                                    />
                                }
                                {/* <a href="#" className="btn info--more"></a> */}
                            </div>
                        </div>
                        
                        <div className="watching__videos">
                            {
                                videos && videos.map(video => {
                                    return (
                                        <Video 
                                            key={video._id}
                                            id={video._id}
                                            className="watching__videos-video" 
                                            video={video}
                                        /> 
                                    )
                                })
                            }
                        </div>
                    </>
                    : <Status 
                        type='Empty' 
                        message="Video not found" />  
            }
        </>
    )
}

Watching.defaultProps = {
    query: '',
    videos: [],
    auth: false,
    success: false,
    error: false,
}
Watching.defaultProps = {
    query: PropTypes.string,
    videos: PropTypes.array,
    auth: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
}

const mapStateToProps = state => ({
    success: state.videos.success,
    error: state.videos.error,
    auth: state.videos.auth,
    videos: state.videos.videos,
    video: state.videos.video,
    watch: state.videos.watch,

})

export default connect(mapStateToProps, null)(Watching)
