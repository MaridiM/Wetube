import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'

import store from 'store'
import { App } from 'pages'


import 'antd/dist/antd.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'styles/index.sass'


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)