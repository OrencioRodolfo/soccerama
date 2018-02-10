import { PENDING_REQUESTS } from '../actions/types'

const INITIAL_STATE = {
  pendingRequests: false,
  errors: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PENDING_REQUESTS: {
      return {
        ...state,
        pendingRequests: action.payload,
      }
    }

    default:
      return state
  }
}
