import React from 'react'
import { Link } from 'react-router-dom'
import { main } from 'routes/routes'

const Logo = () => {
  return (
    <Link to={main} className="logo">
        <i className="fab fa-youtube logo__img"></i>
        <h1 className="logo__title">WeTube</h1>
    </Link>
  )
}

export default Logo
