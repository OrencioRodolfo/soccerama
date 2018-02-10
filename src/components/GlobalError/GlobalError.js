import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Snackbar from '../Snackbar/Snackbar'
import actions from '../../store/actions'

const GlobalError = ({ errors, dismissError }) => errors.map((error, index) => (
  <Snackbar
    key={`${error.code}-${index}`} // eslint-disable-line
    open={!error.read}
    message={error.message}
    onClose={() => { dismissError(index) }}
  />
))

GlobalError.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
}

const mapStateToProps = ({ api }) => ({
  errors: api.errors,
})

export default connect(mapStateToProps, {
  dismissError: actions.dismissError,
})(GlobalError)

export {
  GlobalError as DGlobalError,
  mapStateToProps,
}
