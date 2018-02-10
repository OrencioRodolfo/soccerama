import {
  FETCH_STANDINGS_FULFILLED,
} from '../actions/types'

const INITIAL_STATE = { league: null, standings: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STANDINGS_FULFILLED: {
      const league = action.payload.data[0]
      return {
        ...state,
        league: {
          id: league.league_id,
          name: league.name,
        },
        standings: league.standings.data,
      }
    }

    default:
      return state
  }
}
