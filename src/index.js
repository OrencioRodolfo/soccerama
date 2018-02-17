import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import App from './components/App/App'
import reducers from './store/reducers'
import pendingRequestMW from './store/middlewares/pending-requests'
import errorHandlerMW from './store/middlewares/error-handler'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(
    promiseMiddleware(),
    pendingRequestMW,
    errorHandlerMW,
  ),
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

(() => {
  if (!window.navigator.serviceWorker) {
    return
  }

  window.navigator.serviceWorker.register('./../sw.js').then((registration) => {
    console.log('Registration worked!', registration.scope)
  }).catch((e) => {
    console.log('Service Woker registration failed!', e)
  })
})()
