import React from 'react'

import { join, login } from 'routes/routes'

import Join from './Join'
import Login from './Login'

const Auth = ({ pathname, error, msg, joinMessage, loginMessage }) => {

    return (
        <div className="form__wrapper" >
            {
                pathname === join  
                    && <Join 
                            msg={msg} 
                            error={error}
                            joinMessage={joinMessage}
                            />
            }
            {
                pathname === login 
                    && <Login 
                            msg={msg} 
                            error={error}
                            loginMessage={loginMessage}
                            />
            }
        </div>
    )
}

export default Auth
