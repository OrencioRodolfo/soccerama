import React from 'react'
import { shallow } from 'enzyme'
import { DTableExampleSimple } from './LeagueClassification'

describe('LeagueClassification component', () => {
  let getStandings
  let standings
  beforeEach(() => {
    getStandings = jest.fn()
    standings = [
      {
        team_id: 1,
        team_name: 'sample',
        position: 2,
        overall: {
          draw: 3,
          games_played: 4,
          goals_scored: 5,
          lost: 6,
          won: 7,
        },
        total: {
          goal_difference: '+1',
        },
        points: 8,
      },
    ]
  })

  it('must render properly', () => {
    const component = shallow(<DTableExampleSimple
      standings={standings}
      getStandings={getStandings}
    />)

    expect(component).toMatchSnapshot()
  })
})
