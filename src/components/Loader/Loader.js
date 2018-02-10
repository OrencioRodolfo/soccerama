import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LinearProgress } from 'material-ui/Progress'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  position: fixed;
  width: 100%;
`

const Loader = ({ show }) => {
  if (show) {
    return (
      <LoaderWrapper>
        <LinearProgress />
      </LoaderWrapper>
    )
  }

  return null
}

Loader.propTypes = {
  show: PropTypes.bool,
}

Loader.defaultProps = {
  show: false,
}

const mapStateToProps = ({ api }) => ({
  show: api.pendingRequests,
})

export default connect(mapStateToProps)(Loader)
export {
  Loader as DLoader,
  mapStateToProps,
}
