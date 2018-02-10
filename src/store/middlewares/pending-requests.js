import { PENDING_REQUESTS } from '../actions/types'

let pendingRequests = 0

export default store => next => (action) => {
  // check if it is an async action
  if (action.type.match(/w*(_PENDING|_FULFILLED|_REJECTED)$/)) {
    if (action.type.match(/w*_PENDING/)) {
      pendingRequests += 1
    } else if (action.type.match(/w*_FULFILLED/) || action.type.match(/w*_REJECTED/)) {
      pendingRequests -= 1
    }

    if (store.getState().api.pendingRequests !== (pendingRequests > 0)) {
      store.dispatch({
        type: PENDING_REQUESTS,
        payload: pendingRequests > 0,
      })
    }
  }

  next(action)
}
