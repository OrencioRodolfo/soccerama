import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Home from '../Home/Home'
import Loader from '../Loader/Loader'

const App = props => (
  <Provider store={props.store}>
    <div>
      <Loader />
      <Home />
    </div>
  </Provider>
)

App.propTypes = {
  store: PropTypes.shape().isRequired,
}

export default App
