import {
  FETCH_TEAM_FULFILLED,
} from '../actions/types'

const INITIAL_STATE = { details: {}, squad: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TEAM_FULFILLED:
      return {
        ...state,
        details: action.payload.details,
        squad: action.payload.squad,
      }

    default:
      return state
  }
}
