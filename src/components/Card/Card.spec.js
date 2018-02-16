import React from 'react'
import { shallow } from 'enzyme'
import Card from './Card'

describe('Card component', () => {
  it('Must render properly', () => {
    const component = shallow(<Card>Some content</Card>)
    expect(component).toMatchSnapshot()
  })

  it('Must export the Header and Content components', () => {
    expect(Card.Header).toBeDefined()
    expect(Card.Content).toBeDefined()
  })
})
