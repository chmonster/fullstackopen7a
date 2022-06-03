//import React from 'react'
//import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
//import 'semantic-ui-css/semantic.min.css'
import './index.css'

ReactDOM.render(
  <Router><Provider store={store}>
    <App />
  </Provider></Router>,
  document.getElementById('root')
)