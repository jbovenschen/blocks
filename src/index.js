import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import getStore from './store'

const container = document.getElementById('app')

const store = getStore()

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  container
)
