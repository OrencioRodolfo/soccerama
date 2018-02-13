import React from 'react'
import { shallow } from 'enzyme'
import Standing from './Standing'

describe('LeagueClassification component', () => {
  let getStandings
  let standings
  let onTeamSelect

  beforeEach(() => {
    getStandings = jest.fn()
    onTeamSelect = jest.fn()
    standings = [
      {
        id: 1,
        position: 1,
        name: 'sample',
        played: 3,
        won: 4,
        draw: 5,
        lost: 6,
        goal: 7,
        difference: '+8',
        points: 9,
      },
      {
        id: 10,
        position: 10,
        name: 'sample2',
        played: 30,
        won: 40,
        draw: 50,
        lost: 60,
        goal: 70,
        difference: '+80',
        points: 90,
      },
    ]
  })

  it('must render properly', () => {
    const component = shallow(<Standing
      standings={standings}
      getStandings={getStandings}
      onTeamSelect={onTeamSelect}
    />)

    expect(component).toMatchSnapshot()
  })

  describe('list sort', () => {
    let wrapper
    let inst

    beforeEach(() => {
      wrapper = shallow(<Standing
        standings={standings}
        getStandings={getStandings}
        onTeamSelect={onTeamSelect}
      />)
      inst = wrapper.instance()
      inst.componentWillReceiveProps({
        standings,
      })
    })

    it('must sort descending by the team name', () => {
      inst.createSortHandler('name')()

      expect(inst.state.orderBy).toEqual('name')
      expect(inst.state.order).toEqual('desc')
    })

    it('must sort ascending by the team points', () => {
      inst.setState({
        orderBy: 'points',
        order: 'desc',
      })
      inst.createSortHandler('points')()

      expect(inst.state.orderBy).toEqual('points')
      expect(inst.state.order).toEqual('asc')
    })
  })
})
