import { PENDING_REQUESTS, API_ERROR, DISMISS_ERROR } from '../actions/types'
import httpInterceptor from './http-interceptor'

describe('HTTP interceptor reducer', () => {
  let initialState

  beforeEach(() => {
    initialState = {
      pendingRequests: false,
      errors: [],
    }
  })

  it('must return the initial state', () => {
    const result = httpInterceptor(undefined, {})
    expect(result).toEqual(initialState)
  })

  it('must return a new state identifying pending requests', () => {
    const action = { type: PENDING_REQUESTS, payload: true }
    const result = httpInterceptor(initialState, action)
    expect(result).toEqual({
      ...initialState,
      pendingRequests: true,
    })
  })

  it('must return api errors', () => {
    const action = { type: API_ERROR, payload: { message: 'sample' } }
    const result = httpInterceptor(initialState, action)
    expect(result).toEqual({
      ...initialState,
      errors: [{ message: 'sample' }],
    })
  })

  it('must mark an error as read', () => {
    const action = { type: DISMISS_ERROR, payload: 0 }
    const result = httpInterceptor({
      ...initialState,
      errors: [{ message: 'sample' }, { message: 'sample2' }],
    }, action)
    expect(result).toEqual({
      ...initialState,
      errors: [{ message: 'sample', read: true }, { message: 'sample2' }],
    })
  })
})
