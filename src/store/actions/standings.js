import {
  FETCH_STANDINGS,
} from './types'
import request from '../../services/request'

export const getStandings = id => ({
  type: FETCH_STANDINGS,
  payload: request(`standings/season/${id}`),
})
