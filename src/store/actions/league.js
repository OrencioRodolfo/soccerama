import {
  FETCH_LEAGUE,
  FETCH_STANDINGS,
  FETCH_SEASON,
} from './types'
import request from '../../services/request'

export const getLeague = id => ({
  type: FETCH_LEAGUE,
  payload: request(`leagues/${id}`).then(res => ({
    id: res.data.id,
    name: res.data.name,
    currentSeasonId: res.data.current_season_id,
  })),
})

export const getStandings = id => ({
  type: FETCH_STANDINGS,
  payload: request(`standings/season/${id}`).then(res =>
    res.data[0].standings.data),
})

export const getSeason = id => ({
  type: FETCH_SEASON,
  payload: request(`seasons/${id}`).then(res => ({
    id: res.data.id,
    name: res.data.name,
  })),
})
