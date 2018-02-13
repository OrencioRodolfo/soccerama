import React from 'react'
import { shallow } from 'enzyme'
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
