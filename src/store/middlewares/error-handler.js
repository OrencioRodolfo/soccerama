import { API_ERROR } from '../actions/types'

export default store => next => (action) => {
  if (action.type.match(/w*_REJECTED$/)) {
    store.dispatch({
      type: API_ERROR,
      payload: action.payload,
    })
  }

  next(action)
}
