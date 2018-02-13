import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { api } from '../../../config'
import { getPlayer } from './player'

describe('getPlayer action creator', () => {
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
    let playerId
    let url

    beforeEach(() => {
      url = `${baseUrl}/players/${playerId}?include=position`
      playerId = 1
      resMock = {
        data: {
          player_id: 1,
          common_name: 'common_name',
          height: 'height',
          weight: 'weight',
          image_path: 'image_path',
          position: {
            data: {
              id: 1,
              name: 'position',
            },
          },
        },
      }
    })

    it('must return an action type and payload', async () => {
      mock.onGet(url).reply(200, resMock)
      const action = await getPlayer(playerId)

      expect(action.type).toBeDefined()
      expect(action.payload).toBeDefined()
    })

    it('must return an ajax request as payload', async () => {
      mock.onGet(url).reply(200, resMock)

      await getPlayer(playerId).payload.then((result) => {
        expect(result).toEqual({
          id: 1,
          name: 'common_name',
          height: 'height',
          weight: 'weight',
          photo: 'image_path',
          position: 'position',
        })
      })
    })
  })
})
