import { combineReducers } from 'redux'
import standings from './standings'
import httpInterceptor from './http-interceptor'

export default combineReducers({
  standings,
  api: httpInterceptor,
})
