import reducer from './standings'
import {
  FETCH_STANDINGS_FULFILLED,
} from '../actions/types'

describe('standings reducer', () => {
  it('must return the default state with no league ID and no standings', () => {
    const state = reducer(undefined, {})

    expect(state.league).toEqual(null)
    expect(state.standings).toEqual([])
  })

  it('must return the league name, ID and standings', () => {
    const response = {
      data: [
        {
          league_id: 1,
          name: '',
          standings: {
            data: [],
          },
        },
      ],
    }

    const state = reducer(undefined, {
      type: FETCH_STANDINGS_FULFILLED,
      payload: response,
    })

    expect(state.league).toEqual({ id: 1, name: '' })
    expect(state.standings).toEqual(response.data[0].standings.data)
  })
})
