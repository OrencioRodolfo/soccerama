import React from 'react'
import { shallow } from 'enzyme'
import { DSearchLeague, mapStateToProps } from './SearchLeague'

describe('Search league form component', () => {
  let component
  let getLeagues
  let queryStanding
  let leagues

  beforeEach(() => {
    getLeagues = jest.fn()
    queryStanding = jest.fn()
    leagues = [{
      id: 1,
      name: 'sample',
      currentSeasonId: 1,
      seasons: {
        data: [{
          id: 2,
          name: 'season',
        }],
      },
    }]
    component = shallow(<DSearchLeague
      getLeagues={getLeagues}
      leagues={leagues}
      queryStanding={queryStanding}
    />)
  })

  it('Must render properly', () => {
    expect(component).toMatchSnapshot()
  })

  describe('changing league and season in the selects', () => {
    let instance
    beforeEach(() => {
      instance = component.instance()
    })

    it('must add the selected league ID to the state and reset the season', () => {
      instance.handleLeagueChange({ target: { value: 1 } })
      expect(instance.state.league).toEqual(1)
      expect(instance.state.season).toEqual(-1)
    })

    it('must add the selected season ID to the state and call queryStanding()', () => {
      instance.setState({ league: 1 })
      instance.handleSeasonChange({ target: { value: 2 } })
      expect(instance.state.season).toEqual(2)
      expect(queryStanding).toBeCalled()
    })
  })

  describe('map state to props', () => {
    it('Must return the league and leagues keys', () => {
      const state = {
        league: {
          details: {},
          list: [],
        },
      }
      const result = mapStateToProps(state)
      expect(result).toEqual({
        league: {},
        leagues: [],
      })
    })
  })
})
