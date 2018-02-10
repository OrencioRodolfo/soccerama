import { API_ERROR } from '../actions/types'
import errorHandlerMW from './error-handler'

describe('error handler middleware', () => {
  let store
  let next

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      getState: () => ({
        api: { errors: [] },
      }),
    }
    next = jest.fn()
  })

  it('must intercept nothing', () => {
    const action = { type: 'SAMPLE' }
    errorHandlerMW(store)(next)(action)

    expect(store.dispatch).not.toBeCalled()
    expect(next).toBeCalled()
  })

  it('must intercept and add errors to the store', () => {
    const action = { type: 'SAMPLE_REJECTED', payload: {} }
    errorHandlerMW(store)(next)(action)

    expect(store.dispatch).toBeCalledWith({
      type: API_ERROR,
      payload: {},
    })
    expect(next).toBeCalled()
  })
})

