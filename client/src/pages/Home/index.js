import React, { useEffect } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { videosGetAll } from 'store/actions'
import { Video } from 'modules'

const Home = ({ videos, auth, videosGetAll }) => {

    useEffect(() => {
        videosGetAll()
    }, [videosGetAll])

    return (
        <div className={classNames(
            "home__videos"
        )}>
            {
                videos && videos.map(video => {
                    return (
                        <Video 
                            key={video._id} 
                            video={video} 
                            auth={auth}
                            className="home__videos-video"
                        />
                    )
                })
            }

        </div>
    )
}

const mapDispatchToProps = {
    videosGetAll
}

const mapStateToProps = state => ({
    videos: state.videos.videos,
    auth: state.videos.auth,

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
