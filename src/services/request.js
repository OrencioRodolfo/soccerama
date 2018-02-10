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
  .catch(err => console.error(err))

export default request
