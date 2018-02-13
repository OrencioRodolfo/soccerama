import {
  FETCH_PLAYER,
} from './types'
import request from '../../services/request'

export const getPlayer = id => ({
  type: FETCH_PLAYER,
  payload: request(`players/${id}?include=position`).then(res => ({
    id: res.data.player_id,
    name: res.data.common_name,
    height: res.data.height,
    weight: res.data.weight,
    photo: res.data.image_path,
    nationality: res.data.nationality,
    position: res.data.position.data.name,
  })),
})
