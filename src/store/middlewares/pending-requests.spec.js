import { PENDING_REQUESTS } from '../actions/types'
import pendingRequestMW from './pending-requests'

describe('pending requests middleware', () => {
  let store
  let next

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      getState: () => ({
        api: { pendingRequests: false },
      }),
    }
    next = jest.fn()
  })

  it('must not intercept nothing', () => {
    const action = { type: 'SAMPLE' }
    pendingRequestMW(store)(next)(action)

    expect(store.dispatch).not.toBeCalled()
    expect(next).toBeCalled()
  })

  it('must dispatch a new action identifying pending requests', () => {
    const action = { type: 'SAMPLE_PENDING' }
    pendingRequestMW(store)(next)(action)

    expect(store.dispatch).toBeCalledWith({
      type: PENDING_REQUESTS,
      payload: true,
    })
  })

  it('must dispatch a new action identifying that there\'s no longer pending requests (All fulfilled)', () => {
    store.getState = () => ({ api: { pendingRequests: true } })
    const action = { type: 'SAMPLE_FULFILLED' }
    pendingRequestMW(store)(next)(action)

    expect(store.dispatch).toBeCalledWith({
      type: PENDING_REQUESTS,
      payload: false,
    })
  })

  it('must dispatch a new action identifying that there\'s no longer pending requests (All rejected)', () => {
    store.getState = () => ({ api: { pendingRequests: true } })
    const action = { type: 'SAMPLE_REJECTED' }
    pendingRequestMW(store)(next)(action)

    expect(store.dispatch).toBeCalledWith({
      type: PENDING_REQUESTS,
      payload: false,
    })
  })
})

