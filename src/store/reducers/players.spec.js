import reducer from './players'
import {
  FETCH_PLAYER_FULFILLED,
} from '../actions/types'

describe('standings reducer', () => {
  it('must return the default state with an empty object', () => {
    const state = reducer(undefined, {})

    expect(state).toEqual({})
  })

  it('must return the player details', () => {
    const player = {
      id: 1,
      name: 'name',
      height: 'height',
      weight: 'weight',
      photo: 'photo',
      nationality: 'nationality',
      position: 'position',
    }
    const state = reducer(undefined, {
      type: FETCH_PLAYER_FULFILLED,
      payload: player,
    })

    expect(state).toEqual({
      1: player,
    })
  })
})
