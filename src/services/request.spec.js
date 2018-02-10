import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import request from './request'
import { api } from '../../config'

describe('request service', () => {
  let mock
  let baseUrl
  let resMock

  beforeEach(() => {
    mock = new MockAdapter(axios)
    baseUrl = `${api.endpoint}/${api.version}`
    resMock = {
      data: {
        users: [
          { id: 1, name: 'John Smith' },
        ],
      },
    }
  })

  afterEach(() => {
    mock.reset()
  })

  it('must perform a GET request successfully', async () => {
    mock.onGet(`${baseUrl}/sample`).reply(200, resMock)

    await request('sample').then((response) => {
      expect(response).toEqual(resMock)
    })
  })

  it('must perform a POST request successfully', async () => {
    mock.onPost(`${baseUrl}/sample`).reply(200, resMock)

    await request('sample', { a: '' }, 'post').then((response) => {
      expect(response).toEqual(resMock)
    })
  })

  it('must fail and handle the rejection', async () => {
    mock.onGet(`${baseUrl}/sample`).reply(400, resMock)
    global.console = {
      error: jest.fn(),
    }

    await request('sample').then(() => {
      expect(console.error).toBeCalled()
    })
  })
})

// describe('request service', () => {
//   it('must ....', async () => {
//     request('sample')
//     expect(1).toEqual(1)
//   })
// })
