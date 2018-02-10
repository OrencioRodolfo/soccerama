import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Standing from '../Standing/Standing'
import actions from '../../store/actions'

const Title = styled.h1`
  text-align: center;
`

class League extends Component {
  static propTypes = {
    getLeague: PropTypes.func.isRequired,
    getStandings: PropTypes.func.isRequired,
    getSeason: PropTypes.func.isRequired,
    league: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      currentSeasonId: PropTypes.number,
    }).isRequired,
    season: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
    standings: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      played: PropTypes.number.isRequired,
      won: PropTypes.number.isRequired,
      draw: PropTypes.number.isRequired,
      lost: PropTypes.number.isRequired,
      goal: PropTypes.number.isRequired,
      difference: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    })).isRequired,
  }

  componentDidMount() {
    this.fetchData(501)
  }

  fetchData = (id) => {
    this.props.getLeague(id).then((res) => {
      this.props.getStandings(res.value.currentSeasonId)
      this.props.getSeason(res.value.currentSeasonId)
    })
  }

  render() {
    const { league, season } = this.props
    return (
      <div>
        <button onClick={() => this.fetchData(501)}>Refresh</button>
        <Title>{league.name} - {season.name}</Title>
        <Standing
          standings={this.props.standings}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ league }) => ({
  league: league.details,
  season: league.season,
  standings: league.standings.map((item, index) => ({
    id: item.team_id,
    position: (index + 1),
    name: item.team_name,
    played: item.overall.games_played,
    won: item.overall.won,
    draw: item.overall.draw,
    lost: item.overall.lost,
    goal: item.overall.goals_scored,
    difference: item.total.goal_difference,
    points: item.points,
  })),
})

export default connect(mapStateToProps, {
  getLeague: actions.getLeague,
  getStandings: actions.getStandings,
  getSeason: actions.getSeason,
})(League)

export {
  League as DLeague,
  mapStateToProps,
}
