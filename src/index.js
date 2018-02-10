import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import App from './components/App/App'
import reducers from './store/reducers'

const store = createStore(
  reducers,
  applyMiddleware(promiseMiddleware()),
)

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root'), // eslint-disable-line
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App/App.js', () => {
    const NextApp = require('./components/App/App.js').default // eslint-disable-line
    render(NextApp)
  })
}
