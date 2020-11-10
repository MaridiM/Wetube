import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Video } from 'modules'

const Searching = ({ videos, query }) => {
  return (
        <>
            <h4 className="search__searching">You searching: { query } </h4>
            
            {
                videos.length 
                    ? <div className="search__wrapper">
                        {
                            videos && videos.map(video => {
                                return (
                                    <Video 
                                        key={video._id}
                                        className="search__video" 
                                        video={video}
                                        search
                                    /> 
                                )
                            })
                        }
                    </div>
                    : <span>Video is not found!</span>

            }
        </>
  )
}

Searching.defaultProps = {
    videos: [],
    query: ''
}
Searching.propTypes = {
    videos: PropTypes.array,
    query: PropTypes.string
}

const mapStateToProps = state => ({
    videos: state.videos.videos,
    query: state.videos.query,
})


export default connect(mapStateToProps, null)(Searching)


