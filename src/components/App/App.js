import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PropTypes from 'prop-types'
import Home from '../Home/Home'

const App = props => (
  <Provider store={props.store}>
    <MuiThemeProvider>
      <Home />
    </MuiThemeProvider>
  </Provider>
)

App.propTypes = {
  store: PropTypes.shape().isRequired,
}

export default App
