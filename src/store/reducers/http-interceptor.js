import {
  PENDING_REQUESTS,
  API_ERROR,
  DISMISS_ERROR,
} from '../actions/types'

const INITIAL_STATE = {
  pendingRequests: false,
  errors: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PENDING_REQUESTS:
      return {
        ...state,
        pendingRequests: action.payload,
      }

    case API_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      }

    case DISMISS_ERROR:
      return {
        ...state,
        errors: state.errors.map((error, index) =>
          (index === action.payload ? { ...error, read: true } : error)),
      }

    default:
      return state
  }
}
