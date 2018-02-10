import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ href, children }) => (
  <a href={href} target="_blank">{children}</a>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
}

export default Link
