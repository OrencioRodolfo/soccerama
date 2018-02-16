import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Card header component', () => {
  it('Must render properly', () => {
    const component = shallow(<Header>Some content</Header>)
    expect(component).toMatchSnapshot()
  })
})
