import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { main } from 'routes/routes'

const Empty = ({message}) => {
  return (
      <div className="empty">
        <img src={process.env.PUBLIC_URL + '/assets/img/icons/empty.svg'} alt="Empty" />
        <span>{message}</span>
        <Link to={main}>Back</Link> 
      </div>
  )
}

Empty.defaultProps = {
    message: ''
}

Empty.propTypes = {
    message: PropTypes.string
}

export default Empty
