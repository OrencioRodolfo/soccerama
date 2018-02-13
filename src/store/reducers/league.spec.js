import reducer from './league'
import {
  FETCH_STANDINGS_FULFILLED,
  FETCH_LEAGUE_FULFILLED,
  FETCH_SEASON_FULFILLED,
} from '../actions/types'

describe('standings reducer', () => {
  it('must return the default state with no league ID and no standings', () => {
    const state = reducer(undefined, {})

    expect(state.details).toEqual({})
    expect(state.standings).toEqual([])
    expect(state.season).toEqual({})
  })

  it('must return the standing list', () => {
    const standings = [{}, {}]
    const state = reducer(undefined, {
      type: FETCH_STANDINGS_FULFILLED,
      payload: standings,
    })

    expect(state.details).toEqual({})
    expect(state.standings).toEqual(standings)
    expect(state.season).toEqual({})
  })

  it('must return the league name, ID and standings', () => {
    const league = { a: 'a', b: 'b' }
    const state = reducer(undefined, {
      type: FETCH_LEAGUE_FULFILLED,
      payload: league,
    })

    expect(state.details).toEqual(league)
    expect(state.standings).toEqual([])
    expect(state.season).toEqual({})
  })

  it('must return the league name, ID and standings', () => {
    const season = { a: 'a', b: 'b' }
    const state = reducer(undefined, {
      type: FETCH_SEASON_FULFILLED,
      payload: season,
    })

    expect(state.details).toEqual({})
    expect(state.standings).toEqual([])
    expect(state.season).toEqual(season)
  })
})
