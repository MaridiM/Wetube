import React from 'react'
import PropTypes from 'prop-types'

const OptionsItem = ({className, icon, count}) => {
  return (
     <div className={className}>
        {icon}
        <span>{count}</span>
    </div>
  )
} 

OptionsItem.defaultProps = {
    icon: null,
    count: 0
}
OptionsItem.propTypes = {
    icon: PropTypes.object || PropTypes.string,
    count: PropTypes.number
}

export default OptionsItem
