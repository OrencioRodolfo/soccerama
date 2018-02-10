import axios from 'axios'
import { api } from '../../config'

const baseUrl = `${api.endpoint}/${api.version}`
const GET = 'get'

const request = (url, data = {}, method = GET) => axios({
  method,
  url: `${baseUrl}/${url}`,
  [method === GET ? 'params' : 'body']: {
    api_token: api.token,
    ...data,
  },
})
  .then(res => res.data)
  .catch((error) => {
    const exception = error.response ? error.response.data.error : {
      code: null,
      message: error.message,
    }
    throw exception
  })

export default request
