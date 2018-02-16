import React from 'react'
import { shallow } from 'enzyme'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { DLeague, mapStateToProps } from './League'
import { api } from '../../../config'

describe('Home component', () => {
  let mock
  let baseUrl
  let getLeague
  let getStandings
  let getSeason
  let getTeam
  let league
  let season
  let team
  let squad
  let standings
  let wrapper

  beforeEach(() => {
    mock = new MockAdapter(axios)
    baseUrl = `${api.endpoint}/${api.version}`
    const player = {
      id: 1,
      name: 'sample',
      logo: 'logo',
    }
    const standing = {
      id: 1,
      position: 2,
      name: 'sample',
      played: 3,
      won: 4,
      draw: 5,
      lost: 6,
      goal: 7,
      difference: '+8',
      points: 9,
    }

    league = {
      id: 1,
      name: 'sample',
      currentSeasonId: 2,
    }
    season = {
      id: 1,
      name: 'sample',
    }
    team = {
      id: 1,
      name: 'sample',
      logo: 'logo',
    }
    squad = [player, { ...player, id: 2 }]
    standings = [standing, { ...standing, id: 2 }]
    getLeague = () => Promise.resolve({ value: standings })
    getStandings = () => Promise.resolve(standings)
    getSeason = () => Promise.resolve(season)
    getTeam = () => Promise.resolve(team)

    wrapper = shallow(<DLeague
      getLeague={getLeague}
      getStandings={getStandings}
      getSeason={getSeason}
      getTeam={getTeam}
      league={league}
      season={season}
      team={team}
      squad={squad}
      standings={standings}
    />)
  })

  it('must render properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('must fetch the team details', async () => {
    const teamId = 1
    mock.onGet(`${baseUrl}/teams/${teamId}?include=squad`).reply(200, {})
    await wrapper.instance().queryTeam(teamId).then(() => {
      expect(wrapper.instance().state.queryTeam).toEqual(true)
    })
  })

  it('must reset the "queryTeam" state when closed', () => {
    wrapper.instance().handleTeamDailogClose()
    expect(wrapper.instance().state.queryTeam).toEqual(false)
  })

  describe('mapStateToProps function', () => {
    it('must return the data related to the season, team, squad and standings', () => {
      const state = {
        league: {
          details: {},
          season: {},
          standings: [{
            team_id: 1,
            team_name: 'sample',
            overall: {},
            total: {},
            points: 10,
          }],
        },
        team: {
          details: {},
          squad: [],
        },
      }
      const result = mapStateToProps(state)
      expect(result).toHaveProperty('team')
      expect(result).toHaveProperty('squad')
      expect(result).toHaveProperty('standings')
      expect(result).toMatchSnapshot()
    })
  })
})
