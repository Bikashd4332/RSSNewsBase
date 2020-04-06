/*
* The root javascript react loader which will help to load the front-
* end in the client's browser.
*/

import React from 'react'
import App from '../components/App'
import ReactDOM from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  )
})
