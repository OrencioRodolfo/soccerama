import React from 'react'
import { shallow } from 'enzyme'
import { DTeam, mapStateToProps } from './Team'

describe('Home component', () => {
  let wrapper
  let instance
  let getPlayer
  let onClose
  let team
  let squad
  let players

  beforeEach(() => {
    getPlayer = () => Promise.resolve()
    onClose = jest.fn()
    team = {}
    squad = [{
      player_id: 1,
      name: 'sample',
      logo: 'logo',
    },
    {
      player_id: 2,
      name: 'sample',
      logo: 'logo',
    }]
    players = {
      1: {
        id: 1,
        name: 'Sample',
        height: 'Sample',
        weight: 'Sample',
        photo: 'Sample',
      },
    }

    wrapper = shallow(<DTeam
      getPlayer={getPlayer}
      fullScreen={false}
      open
      onClose={onClose}
      team={team}
      squad={squad}
      players={players}
    />)
    instance = wrapper.instance()
  })

  it('must render properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentWillReceiveProps', () => {
    it('must set the dialog as "open"', () => {
      instance.componentWillReceiveProps({ open: true })
      expect(instance.state.open).toEqual(true)
    })
  })

  describe('fetch squad', () => {
    it('must fetch the entire squad', async () => {
      instance.state = {
        squadLoaded: false,
      }

      await instance.getSquad().then(() => {
        expect(instance.state.squadLoaded).toEqual(true)
      })
    })

    it('must render the entire squad', () => {
      instance.state = {
        squadLoaded: true,
      }

      expect(instance.renderSquad()).toMatchSnapshot()
    })
  })

  describe('render squad', () => {
    it('must render a circular progress while the squad isn\'t entirely loaded', () => {
      instance.state = {
        squadLoaded: false,
      }

      expect(instance.renderSquad()).toMatchSnapshot()
    })

    it('must render the entire squad', () => {
      instance.state = {
        squadLoaded: true,
      }

      expect(instance.renderSquad()).toMatchSnapshot()
    })
  })

  describe('dialog closing', () => {
    it('must update the state setting the dialog as closed', () => {
      instance.handleClose()
      expect(instance.state.open).toEqual(false)
      expect(instance.state.squadLoaded).toEqual(false)
      expect(onClose).toBeCalled()
    })
  })

  describe('mapStateToProps function', () => {
    it('must return the data related to the players', () => {
      const state = {
        players,
      }
      const result = mapStateToProps(state)
      expect(result).toHaveProperty('players')
      expect(result).toMatchSnapshot()
    })
  })
})
