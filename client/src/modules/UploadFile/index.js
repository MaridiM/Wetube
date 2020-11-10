import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Progress } from 'components'

const UploadFile = ({ children, name, changeHandler, className, type }) => {
    const [state, setState] = useState({
        file: '',
        filePreviewUrl: '',
        progress: 0,
        total: 0,
        loaded: 0,
    })
    useEffect(() => {
        
    })
    const uploadInput = useRef()
       
    const uploadHandleInput = () => {
      return uploadInput.current.click()
    }
    
    const _handlePreviewFile = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        
        console.log(file)

        reader.onloadend = () => {
            if ( type === 'video' ) {
                setState(state => ({
                    ...state,
                    file: file,
                }));
            }
            setState(state => ({
                ...state,
                file: file,
                filePreviewUrl: reader.result
          }));
        }
        reader.readAsDataURL(file)
    } 
    const options = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent
            
            let percent = Math.floor( ( loaded * 100 ) / total )
            // console.log(`${loaded}kb of ${total}kb | ${percent}%`)
            if( percent <= 100 ) {
                setState(state => ({
                    ...state,
                    progress: percent,
                    total,
                    loaded,
                }))
            }
        }
    }

    return (
      <div className={classnames(
          "upload-file",
          className
          )}>
          <input
              type="file"
              ref={uploadInput}
              name={name}
              onChange={e =>{ 
                 _handlePreviewFile(e)
                  changeHandler(name, e, options)
              }}
              accept={`${type}/*`}
              hidden={children ? true : false} />
          {
              children &&
                  <button type="button" onClick={uploadHandleInput}  disabled={state.progress > 0 ? true : false }>
                      {
                        state.filePreviewUrl && type === 'image' 
                            ? <img src={state.filePreviewUrl} alt='File Preview' />
                            : state.progress > 0
                                ? <Progress progress={state.progress} max={100}/>
                                : children
                      }

                  </button>
          }
      </div>
  )
}

UploadFile.defaultProps = {
    children: undefined,
    className: '',
    accept: '',
    type: 'image',
    name: '',
    changeHandler: () => {},
    filePreview: null,
}
UploadFile.propTypes = {
    name: PropTypes.string,
    accept: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    changeHandler: PropTypes.func,
}


export default UploadFile
