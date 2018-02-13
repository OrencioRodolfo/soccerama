import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
  background: #e0e0e0;
  flex-grow: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`
const Content = ({ children }) => (
  <Container>
    {children}
  </Container>
)

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Content
