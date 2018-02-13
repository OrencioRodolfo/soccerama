import {
  FETCH_PLAYER_FULFILLED,
} from '../actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLAYER_FULFILLED:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }

    default:
      return state
  }
}
