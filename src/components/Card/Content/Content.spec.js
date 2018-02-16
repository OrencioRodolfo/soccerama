import React from 'react'
import { shallow } from 'enzyme'
import Content from './Content'

describe('Card content component', () => {
  it('Must render properly', () => {
    const component = shallow(<Content>Some content</Content>)
    expect(component).toMatchSnapshot()
  })
})
