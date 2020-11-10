import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import {
  main,
  join,
  login,
  
  videos,
  videoEdit,
  videoUpload,
  videoWatch,
  videoSearch,
  profile,
  changePassword,
  lostPassword
} from 'routes/routes'
  
import { 
  Home, 
  Auth, 
  Watching, 
  ChangePassword, 
  Password, 
  EditVideo, 
  Profile, 
  UploadVideo, 
  Searching 
} from 'pages'

const Routes = ({ auth, user, uploadVideoId, userId, msg, location, type }) => {
    const { pathname } = location
    const [state, setState] = useState({
      message: '',
      path: false,
      error: false,
      join: false,
      login: false,
      reset: false,
    })
    const ErrorPATH = () => setState(state => ({...state, error: true}))

    useEffect(() => {
        if(type) {
            const success = [200, 201, 202]
            setState(state => ({
                ...state,
                message: msg.msg,
                error: success.indexOf(msg.status) > -1 ? false : true,
                [type]: true,
            }))
            setTimeout(() => {
              console.log(type)
              setState(state => ({
                ...state,
                [type]: false,
              }))
            }, 4000)

        } else {
          setState(state => ({
              ...state,
              message: '',
              error: false,
              join: false,
              login: false,
              reset: false,
          }))
      }
    }, [msg, pathname, type])

  return (
    <Switch>
      <Route exact path={[main, videos]} component={Home} />
      <Route exact path={videoSearch()} component={Searching} />

      <Route exact path={[join, login]} >
        {!auth 
            ? <Auth 
                  pathname={pathname} 
                  msg={state.message} 
                  error={state.error} 
                  joinMessage={state.join}
                  loginMessage={state.login}
                  /> 
            : <Redirect to={main} /> }
      </Route>

      <Route exact path={lostPassword()} >
          { !auth 
                ? <Password  
                    msg={state.message}
                    error={state.error}
                    resetMessage={state.reset}
                    /> 
                : <Redirect to={main} /> }
      </Route>

      <Route exact path={videoUpload} >
          { auth 
              ? !uploadVideoId ? <UploadVideo /> : <Redirect to={videoWatch(uploadVideoId)} />
              : <Redirect to={login} /> 
          }
      </Route>
      <Route exact path={videoEdit()} >
          { auth 
              ? !state.path 
                  ? <EditVideo ErrorPATH={ErrorPATH} /> 
                  : <Redirect to={videos} /> 
              : <Redirect to={login} /> 
          } 
      </Route>
      <Route exact path={profile(userId)}>
          { auth ? <Profile user={user} /> : <Redirect to={login} /> }
      </Route>
      <Route exact path={changePassword(userId)}>
        {auth ? <ChangePassword user={user}  /> : <Redirect to={login} /> }
      </Route>
      
      <Route exact path={videoWatch()} component={Watching} />
    </Switch>
  )
}

Routes.defaultProps = {
    auth: false,
    uploadVideoId: '',
    userId: ''
}

Routes.propTypes = {
    auth: PropTypes.bool,
    uploadVideoId: PropTypes.string,
    userId: PropTypes.string
}

const mapStateToProps = state => ({
  auth: state.auth.auth,
  queryId: state.auth.auth,
  user: state.profile.user,
  uploadVideoId: state.videos.uploadVideoId,
  userId: state.auth.userId,
  msg: state.auth.msg,
  type: state.auth.type,

})

export default connect(mapStateToProps, null)(withRouter(Routes))