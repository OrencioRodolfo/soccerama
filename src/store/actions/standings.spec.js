import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { api } from '../../../config'
import { getStandings } from './standings'

describe('getStandings action creator', () => {
  let seasonId
  let mock
  let baseUrl
  let resMock

  beforeEach(() => {
    seasonId = 1
    mock = new MockAdapter(axios)
    baseUrl = `${api.endpoint}/${api.version}`
    resMock = {
      data: [
        {
          league_id: 1,
          name: '',
          standings: [{}],
        },
      ],
    }
  })

  afterEach(() => {
    mock.reset()
  })

  it('must return an action type and payload', async () => {
    mock.onGet(`${baseUrl}/standings/season/${seasonId}`).reply(200, {})
    const action = await getStandings(seasonId)

    expect(action.type).toBeDefined()
    expect(action.payload).toBeDefined()
  })

  it('must return an ajax request as payload', async () => {
    mock.onGet(`${baseUrl}/standings/season/${seasonId}`).reply(200, resMock)

    await getStandings(seasonId).payload.then((result) => {
      expect(result).toEqual(resMock)
    })
  })
})
