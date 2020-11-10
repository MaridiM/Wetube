import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Progress = ({className, progress, max, children}) => {
     return (
        <div className={classNames(
            `upload-progress${progress === max ? '--uploaded' : '' }`,
            className
        )}>
            <div className='upload-progress__text'>
                {
                    progress === max 
                        ? `Uploaded`
                        : `${progress}% Uploading...`
                }
            </div>
            <div className='upload-progress__line' style={{width: `${progress}%`}}></div>
        </div>
    );
};

Progress.defaultProps = {
    name: '',
    progress: 0, 
    max: 100,
}
Progress.propTypes = {
    name: PropTypes.string,
    progress: PropTypes.number, 
    max: PropTypes.number,    
}
export default Progress
