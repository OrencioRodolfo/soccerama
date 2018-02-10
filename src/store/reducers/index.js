import { combineReducers } from 'redux'
import httpInterceptor from './http-interceptor'
import league from './league'
import team from './team'

export default combineReducers({
  api: httpInterceptor,
  league,
  team,
})
