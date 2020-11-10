import React, { useEffect } from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Routes from 'routes'
import { Header } from 'modules'
import { videosGetById, videosSearch, profileGetById } from 'store/actions'


import {
    main,
    join,
    login,
    videoEdit,
    videoUpload,
    videoWatch,
    profile,
    changePassword,
    videoSearch,
    lostPassword
} from 'routes/routes'

const App = ({ location, videosGetById, videosSearch, profileGetById }) => {
    const { pathname, search } = location

    const lastElement = pathname.split('/')[pathname.split('/').length - 1]

    useEffect(() => {
        pathname === videoWatch(lastElement)  && videosGetById(lastElement) 
        pathname === profile(lastElement) && profileGetById(lastElement) 
        pathname === changePassword(lastElement) && profileGetById(lastElement) 
        pathname === videoSearch() && videosSearch(search.slice(8))     
    }, [videosGetById, videosSearch, profileGetById, lastElement, search, pathname])


    return (
        <div className="wrapper">
            <Header />
            <main className={classNames(
                pathname === main && 'home',
                pathname === join && 'auth',
                pathname === login && 'auth',
                pathname === videoWatch(lastElement) && 'watching',
                pathname === videoEdit(lastElement) && 'edit-video',
                pathname === videoUpload && 'upload-video',
                pathname === videoSearch() && 'search',
                pathname === profile(lastElement) && 'profile',
                pathname === changePassword(lastElement) && 'change-password',
                pathname === lostPassword() && 'lost-password'
            )}>
                <Routes /> 

            </main>
        </div>
    )
}

App.defaultProps = {
    searchStore: null,
    videosGetById: () => {},
    videosSearch: () => {},
    profileGetById: () => {}
}
App.propTypes = {
    searchStore: PropTypes.bool,
    videosGetById: PropTypes.func,
    videosSearch: PropTypes.func,
    profileGetById: PropTypes.func
}

const mapDispatchToProps = {
    videosGetById,
    videosSearch,
    profileGetById
}

export default connect(null, mapDispatchToProps)(withRouter(App))
