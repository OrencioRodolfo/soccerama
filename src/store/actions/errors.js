import {
  DISMISS_ERROR,
} from './types'

export const dismissError = errorIndex => ({
  type: DISMISS_ERROR,
  payload: errorIndex,
})
