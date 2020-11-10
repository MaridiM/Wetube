import React from 'react'
import PropTypes from 'prop-types'

import Empty from './Empty'

const Status = ({type, errorStatus, message}) => {
  return (
      <div className="status">
            { type === 'Empty' && <Empty message={message} />}
      </div>
  )
}

Status.defaultProps = {
    type: '',
    errorStatus: '',
    message: ""
}
Status.propTypes = {
    type: PropTypes.string,
    errorStatus: PropTypes.string, 
    message: PropTypes.string
}

export default Status
