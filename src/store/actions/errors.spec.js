import { dismissError } from './errors'
import {
  DISMISS_ERROR,
} from './types'

describe('dismissError action creator', () => {
  it('must return a DISMISS_ERROR action', () => {
    expect(dismissError(1)).toEqual({
      type: DISMISS_ERROR,
      payload: 1,
    })
  })
})
