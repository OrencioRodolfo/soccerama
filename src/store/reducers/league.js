import {
  FETCH_STANDINGS_FULFILLED,
  FETCH_LEAGUE_FULFILLED,
  FETCH_LEAGUES_FULFILLED,
  FETCH_SEASON_FULFILLED,
} from '../actions/types'

const INITIAL_STATE = {
  teste: {},
  list: [],
  details: {},
  standings: [],
  season: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STANDINGS_FULFILLED:
      return {
        ...state,
        standings: action.payload,
      }

    case FETCH_LEAGUES_FULFILLED:
      return {
        ...state,
        list: action.payload.data,
      }

    case FETCH_LEAGUE_FULFILLED:
      return {
        ...state,
        details: action.payload,
      }

    case FETCH_SEASON_FULFILLED:
      return {
        ...state,
        season: action.payload,
      }

    default:
      return state
  }
}
