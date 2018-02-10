import React from 'react'
import { shallow } from 'enzyme'
import { DLoader, mapStateToProps } from './Loader'

describe('Loader component', () => {
  it('Must render nothing', () => {
    const component = shallow(<DLoader />)
    expect(component).toMatchSnapshot()
  })

  it('Must render properly', () => {
    const component = shallow(<DLoader show />)
    expect(component).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('must return an object with the "show" property', () => {
      const result = mapStateToProps({ api: { pendingRequests: true } })
      expect(result).toEqual({ show: true })
    })
  })
})
