import React from 'react'
import PropTypes from 'prop-types'

const VideoPlayer = ({ src, poster, controls, autoplay }) => {
  return (
      <div className="video__player">
          <video
              className="video__player-video"
              preload="auto"
              src={src}
              poster={poster}
              controls={controls}
              autoPlay={autoplay}
              >
              </video>
      </div>
  )
}

VideoPlayer.defaultProps = {
    src: '',
    poster: '',
    controls: false,
    autoplay: false,
}

VideoPlayer.propTypes = {
    src: PropTypes.string,
    poster: PropTypes.string,
    controls: PropTypes.bool,
    autoplay: PropTypes.bool
}

export default VideoPlayer
