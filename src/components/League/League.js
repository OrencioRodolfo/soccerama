import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Standing from '../Standing/Standing'
import actions from '../../store/actions'
import TeamDialog from '../Team/Team'
import SearchLeague from '../SearchLeague/SearchLeague'

const Title = styled.h1`
  text-align: center;
`

class League extends Component {
  static propTypes = {
    getStandings: PropTypes.func.isRequired,
    getTeam: PropTypes.func.isRequired,
    team: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      logo: PropTypes.string,
    }).isRequired,
    squad: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      logo: PropTypes.string,
    })).isRequired,
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

  state = {
    queryTeam: false,
    league: {},
    season: {},
  }

  queryTeam = id => this.props.getTeam(id).then(() => {
    this.setState({
      queryTeam: true,
    })
  })

  handleTeamDailogClose = () => {
    this.setState({
      queryTeam: false,
    })
  }

  queryStanding = (league, season) => {
    this.setState({
      league,
      season,
    })
    this.props.getStandings(season.id)
  }

  render() {
    const { league, season } = this.state
    return (
      <div>
        {league.name && season.name && <Title>{league.name} - {season.name}</Title>}
        <TeamDialog
          open={this.state.queryTeam}
          team={this.props.team}
          squad={this.props.squad}
          onClose={this.handleTeamDailogClose}
        />
        <SearchLeague queryStanding={this.queryStanding} />
        <Standing
          standings={this.props.standings}
          onTeamSelect={this.queryTeam}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ league, team }) => ({
  team: team.details,
  squad: team.squad,
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
  getStandings: actions.getStandings,
  getTeam: actions.getTeam,
})(League)

export {
  League as DLeague,
  mapStateToProps,
}
