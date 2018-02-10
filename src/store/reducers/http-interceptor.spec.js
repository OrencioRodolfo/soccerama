import { PENDING_REQUESTS } from '../actions/types'
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
})
