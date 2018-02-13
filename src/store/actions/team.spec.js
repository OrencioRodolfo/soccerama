import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { api } from '../../../config'
import { getTeam } from './team'

describe('team action creators', () => {
  let mock
  let baseUrl

  beforeEach(() => {
    mock = new MockAdapter(axios)
    baseUrl = `${api.endpoint}/${api.version}`
  })

  afterEach(() => {
    mock.reset()
  })

  describe('get standings action creator', () => {
    let resMock
    let teamId

    beforeEach(() => {
      teamId = 1
      resMock = {
        data: {
          id: 1,
          name: 'name',
          logo_path: 'logo_path',
          squad: { data: [] },
        },
      }
    })

    it('must return an action type and payload', async () => {
      mock.onGet(`${baseUrl}/teams/${teamId}?include=squad`).reply(200, resMock)
      const action = await getTeam(teamId)

      expect(action.type).toBeDefined()
      expect(action.payload).toBeDefined()
    })

    it('must return an ajax request as payload', async () => {
      mock.onGet(`${baseUrl}/teams/${teamId}?include=squad`).reply(200, resMock)

      await getTeam(teamId).payload.then((result) => {
        expect(result).toEqual({
          details: {
            id: 1,
            name: 'name',
            logo: 'logo_path',
          },
          squad: [],
        })
      })
    })
  })
})
