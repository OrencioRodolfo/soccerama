import React from 'react'
import { shallow } from 'enzyme'
import { DCustomSnackbar } from './Snackbar'

describe('Global error component', () => {
  let wrapper
  let onClose

  beforeEach(() => {
    onClose = jest.fn()
    wrapper = shallow(<DCustomSnackbar
      message="sample"
      onClose={onClose}
    />)
  })

  it('must render properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('must render properly with default props', () => {
    expect(<DCustomSnackbar
      message="sample"
    />).toMatchSnapshot()
  })

  it('must do nothing', () => {
    const result = wrapper.instance().handleClose(undefined, 'clickaway')
    expect(result).toEqual(undefined)
  })

  it('must call the onClose callback', () => {
    wrapper.instance().handleClose()
    expect(onClose).toBeCalled()
  })
})
