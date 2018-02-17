import reducer from './team'
import {
  FETCH_TEAM_FULFILLED,
} from '../actions/types'

describe('standings reducer', () => {
  it('must return the default state with the details and squad keys with empty values', () => {
    const state = reducer(undefined, {})

    expect(state).toEqual({
      details: {},
      squad: [],
    })
  })

  it('must return the player details', () => {
    const details = {
      id: 1,
      name: 'name',
      logo: 'logo',
    }
    const squad = [{}, {}]
    const state = reducer(undefined, {
      type: FETCH_TEAM_FULFILLED,
      payload: {
        details,
        squad,
      },
    })

    expect(state).toEqual({
      details,
      squad,
    })
  })
})
