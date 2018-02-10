import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'

describe('Home component', () => {
  it('must render properly', () => {
    const component = shallow(<Home />)

    expect(component).toMatchSnapshot()
  })
})
