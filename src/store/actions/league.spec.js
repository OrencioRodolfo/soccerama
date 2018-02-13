import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { api } from '../../../config'
import { getStandings, getLeague, getSeason } from './league'

describe('getStandings action creator', () => {
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
    let seasonId

    beforeEach(() => {
      seasonId = 1
      resMock = {
        data: [
          {
            league_id: 1,
            name: '',
            standings: { data: [] },
          },
        ],
      }
    })

    it('must return an action type and payload', async () => {
      mock.onGet(`${baseUrl}/standings/season/${seasonId}`).reply(200, resMock)
      const action = await getStandings(seasonId)

      expect(action.type).toBeDefined()
      expect(action.payload).toBeDefined()
    })

    it('must return an ajax request as payload', async () => {
      mock.onGet(`${baseUrl}/standings/season/${seasonId}`).reply(200, resMock)

      await getStandings(seasonId).payload.then((result) => {
        expect(result).toEqual([])
      })
    })
  })

  describe('get league action creator', () => {
    let resMock
    let leagueId

    beforeEach(() => {
      leagueId = 1
      resMock = {
        data: [
          {
            id: 1,
            name: 'sample',
            current_season_id: 1,
          },
        ],
      }
    })

    it('must return an action type and payload', async () => {
      mock.onGet(`${baseUrl}/leagues/${leagueId}`).reply(200, resMock)
      const action = await getLeague(leagueId)

      expect(action.type).toBeDefined()
      expect(action.payload).toBeDefined()
    })

    it('must return an ajax request as payload', async () => {
      mock.onGet(`${baseUrl}/leagues/${leagueId}`).reply(200, {
        data: {
          id: 1,
          name: 'sample',
          current_season_id: 1,
        },
      })

      await getLeague(leagueId).payload.then((result) => {
        expect(result).toEqual({
          id: 1,
          name: 'sample',
          currentSeasonId: 1,
        })
      })
    })
  })

  describe('get season action creator', () => {
    let resMock
    let seasonId

    beforeEach(() => {
      seasonId = 1
      resMock = {
        data: [
          {
            id: 1,
            name: 'sample',
          },
        ],
      }
    })

    it('must return an action type and payload', async () => {
      mock.onGet(`${baseUrl}/seasons/${seasonId}`).reply(200, resMock)
      const action = await getSeason(seasonId)

      expect(action.type).toBeDefined()
      expect(action.payload).toBeDefined()
    })

    it('must return an ajax request as payload', async () => {
      mock.onGet(`${baseUrl}/seasons/${seasonId}`).reply(200, {
        data: {
          id: 1,
          name: 'sample',
        },
      })

      await getSeason(seasonId).payload.then((result) => {
        expect(result).toEqual({
          id: 1,
          name: 'sample',
        })
      })
    })
  })
})
