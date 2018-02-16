import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Home from '../Home/Home'
import Loader from '../Loader/Loader'
import GlobalError from '../GlobalError/GlobalError'

const App = props => (
  <Provider store={props.store}>
    <div style={{ height: '100%' }}>
      <Loader />
      <GlobalError />
      <Home />
    </div>
  </Provider>
)

App.propTypes = {
  store: PropTypes.shape().isRequired,
}

export default App
