import React from 'react'
import { shallow } from 'enzyme'
import Link from './Link'

describe('Link component', () => {
  it('must render properly', () => {
    const component = shallow(<Link href="test">Link</Link>)

    expect(component).toMatchSnapshot()
  })
})
