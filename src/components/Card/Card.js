import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from './Header/Header'
import Content from './Content/Content'

const Container = styled.div`
  box-shadow: 2px 2px 18px -4px rgba(0,0,0,0.75);
  border-radius: 5px;
  margin: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const Card = ({ children }) => (
  <Container>
    {children}
  </Container>
)

Card.Header = Header
Card.Content = Content

Card.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Card
