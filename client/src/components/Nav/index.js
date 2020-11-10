import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutAuth } from 'store/actions'
import {
    join,
    login,
    videoUpload,
    profile 
} from 'routes/routes'

const Nav = ({ auth, logoutAuth, userId}) => {
  return (
      <nav role="navigation" className="nav">
          { auth && <Link to={videoUpload} className="nav__link">Upload</Link> }
          { auth && <Link to={profile(userId)} className="nav__link">Profile</Link> }

          { !auth  && <Link to={join} className="nav__link">Join</Link> }
          { !auth  && <Link to={login} className="nav__link">Login</Link> }
          
          {auth && <button onClick={() => logoutAuth()} className="nav__link">Logout</button> }
      </nav>
  )
}


Nav.defaultProps = {
    auth: false,
    userId: ''
}
Nav.propTypes = {
    auth: PropTypes.bool,
    logoutAuth: PropTypes.func,
    userId: PropTypes.string
}

const mapDispatchToProps = {
    logoutAuth
}

const mapStateToProps = state => ({
    auth: state.auth.auth,
    userId: state.auth.userId
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
