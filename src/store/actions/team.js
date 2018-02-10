import {
  FETCH_TEAM,
} from './types'
import request from '../../services/request'

export const getTeam = id => ({
  type: FETCH_TEAM,
  payload: request(`teams/${id}?include=squad`).then(res => ({
    details: {
      id: res.data.id,
      name: res.data.name,
      logo: res.data.logo_path,
    },
    squad: res.data.squad.data,
  })),
})
