import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import actions from '../../store/actions'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 50%;
  margin: 15px 0;
`

class SearchLeague extends Component {
  static propTypes = {
    queryStanding: PropTypes.func,
    getLeagues: PropTypes.func.isRequired,
    leagues: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      currentSeasonId: PropTypes.number,
      seasons: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })),
      }),
    })).isRequired,
  }

  static defaultProps = {
    queryStanding: () => {},
  }

  state = {
    league: -1,
    season: -1,
  }

  componentDidMount() {
    this.props.getLeagues()
  }

  findLeagueById = id => this.props.leagues.find(item => item.id === id)

  findSeasonById = (seasons, id) => seasons.find(item => item.id === id)

  handleLeagueChange = (event) => {
    this.setState({
      league: event.target.value,
      season: -1,
    })
  }

  handleSeasonChange = (event) => {
    this.setState({
      season: event.target.value,
    }, () => {
      const leagueId = this.state.league
      const seasonId = this.state.season
      if (leagueId >= 0 && seasonId >= 0) {
        const league = this.findLeagueById(leagueId)
        const season = this.findSeasonById(league.seasons.data, seasonId)
        this.props.queryStanding(league, season)
      }
    })
  }

  renderLeagues() {
    return this.props.leagues.map(league => (
      <MenuItem key={league.id} value={league.id}>
        <em>{league.name}</em>
      </MenuItem>
    ))
  }

  renderSeasons() {
    const league = this.findLeagueById(this.state.league)

    return league.seasons.data.map(season => (
      <MenuItem key={season.id} value={season.id}>
        <em>{season.name}</em>
      </MenuItem>
    ))
  }

  render() {
    return (
      <Form autoComplete="off">
        <FormControl style={{ width: '50%' }}>
          <InputLabel htmlFor="league">League</InputLabel>
          <Select
            style={{ width: '100%' }}
            value={this.state.league}
            onChange={this.handleLeagueChange}
            inputProps={{
              name: 'league',
              id: 'league',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.renderLeagues()}
          </Select>
        </FormControl>

        {
          (this.state.league >= 0) &&
          <FormControl style={{ width: '50%' }}>
            <InputLabel htmlFor="season">Season</InputLabel>
            <Select
              style={{ width: '100%' }}
              value={this.state.season}
              onChange={this.handleSeasonChange}
              inputProps={{
                name: 'season',
                id: 'season',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.renderSeasons()}
            </Select>
          </FormControl>
        }
      </Form>
    )
  }
}

const mapStateToProps = ({ league }) => ({
  league: league.details,
  leagues: league.list,
})

export default connect(mapStateToProps, {
  getLeagues: actions.getLeagues,
})(SearchLeague)

export {
  SearchLeague as DSearchLeague,
  mapStateToProps,
}
