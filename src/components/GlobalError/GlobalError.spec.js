import React from 'react'
import { shallow, mount } from 'enzyme'
import { DGlobalError, mapStateToProps } from './GlobalError'

describe('Global error component', () => {
  let errors

  beforeEach(() => {
    errors = [{
      code: 1,
      message: 'sample',
    }]
  })

  it('must render properly', () => {
    const component = shallow(<DGlobalError errors={errors} />)
    expect(component).toMatchSnapshot()
  })

  it('must dismiss the error when closed', () => {
    const dismissError = jest.fn()
    const component = mount(<DGlobalError errors={errors} dismissError={dismissError} />)
    component.find('button').simulate('click')
    expect(dismissError).toHaveBeenCalled()
  })

  describe('mapStateToProps function', () => {
    it('must return the api errors', () => {
      const result = mapStateToProps({
        api: {
          errors: [],
        },
      })
      expect(result).toEqual({ errors: [] })
    })
  })
})
