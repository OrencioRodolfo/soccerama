import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

const App = props => (
  <Provider store={props.store}>
    <h1>Soccerama</h1>
  </Provider>
)

App.propTypes = {
  store: PropTypes.shape().isRequired,
}

export default App
