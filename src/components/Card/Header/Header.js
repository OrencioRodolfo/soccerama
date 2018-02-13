import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
  margin: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`
const Header = ({ children }) => (
  <Container>
    {children}
  </Container>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
