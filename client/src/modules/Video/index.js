import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'

import { videosDelete, videosGetById } from 'store/actions'


import { OptionsItem, VideoPlayer } from 'components'
import { videoEdit, videoWatch, main } from 'routes/routes'

const Video = ({ className, video, auth, watch, controls, infoHide, search, videosDelete, videosGetById }) => {
    const [state, setState] = useState({
        showDescription: false
    })
    
    const {_id, src, poster, likes, title, description, createdAt, author, views } = video 

    const handleDescription = () => {
        return setState(() => ({ 
            ...state,
            showDescription: !state.showDescription
        }))
    }

    return (
        <div className={classNames(
                'video',
                className
                )}>
            <Link to={videoWatch(_id)} onClick={() => videosGetById(_id)}>
                <VideoPlayer 
                    src={src}
                    poster={poster}
                    preload='auto'
                    controls={controls}
                    autoplay={watch ? true : false}
                    />
                {
                    !infoHide &&
                        <div className="video__info">
                        <h4 className="video__info-title">{!watch ? title.slice(0, 52) + '...' : title}</h4>
                            <div className="video__info-created">
                                <span>{`@${author}`}</span>
                                <span>{moment(createdAt).format('MM.DD.YY, h:mm:ss')}</span>
                            </div>
                            {
                                (watch || search) &&
                                <div className="video__info-description">
                                    <p 
                                        className="video__info-description-text"
                                        style={state.showDescription ? { height: 'auto' } : !search ? {height: '55px', overflow: 'hidden'} : {}}
                                        >
                                        { 
                                        !search ? description : `${description.slice(0, 90)}...`
                                        }
                                    </p>
                                    {
                                        (!search && description.length > 256) &&
                                            <button 
                                                className="btn video__info-description--more"
                                                onClick={() => handleDescription()}
                                                >
                                                {
                                                    state.showDescription
                                                    ? <i className="fas fa-angle-up"></i>
                                                    : <i className="fas fa-angle-down"></i>
                                                }
                                            </button> 
                                    }
                                    
                                </div>
                            }
                            <div className="video__info-actions">
                                <div className="video__info-actions-items-status">
                                    <OptionsItem 
                                        className="video__info-actions-item" 
                                        icon={<i className={likes ? likes.status ? `fas fa-eye` : `far fa-eye` : `far fa-eye`}></i>}
                                        count={likes}
                                        />
                                    <OptionsItem 
                                        className="video__info-actions-item" 
                                        icon={<i className="far fa-heart"></i>}
                                        count={views}
                                        />
                                </div>
                                {
                                    auth && watch &&
                                        <div className="video__info-ctions-items-btns">
                                            <button onClick={() => document.location.pathname = videoEdit(_id)} 
                                                className="video__info-actions-items-btn">
                                                <i className="far fa-edit"></i>
                                            </button>
                                            <button 
                                                onClick={() =>{ 
                                                    videosDelete(video._id)
                                                    document.location.pathname = main
                                                }}
                                                className="video__info-actions-items-btn">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                }
                            </div>
                            
                        </div>
                }
            </Link>
        </div>
    )
}

Video.defaultProps = {
    query: '',
    className: '',
    auth: false,
    watch: false,
    infoHide: false,
    controls: false,
    search: false,
    video: {},
}

Video.propTypes = {
    query: PropTypes.string,
    className: PropTypes.string,
    video: PropTypes.object,
    auth: PropTypes.bool,
    infoHide: PropTypes.bool,
    watch: PropTypes.bool,
    controls: PropTypes.bool,
    search: PropTypes.bool

}

const mapStateToProps = state => ({
    auth: state.auth.auth,
})

const mapDispatchToProps = {
    videosDelete, 
    videosGetById
}



export default connect(mapStateToProps, mapDispatchToProps)(Video)

