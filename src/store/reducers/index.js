import { combineReducers } from 'redux'
import httpInterceptor from './http-interceptor'
import league from './league'
import team from './team'
import players from './players'

export default combineReducers({
  api: httpInterceptor,
  league,
  team,
  players,
})
