import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { getStandings } from '../../store/actions/standings'

class TableExampleSimple extends Component {
  static propTypes = {
    getStandings: PropTypes.func.isRequired,
    standings: PropTypes.arrayOf(PropTypes.shape({
      team_id: PropTypes.number.isRequired,
      team_name: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
      overall: PropTypes.shape({
        draw: PropTypes.number.isRequired,
        games_played: PropTypes.number.isRequired,
        goals_scored: PropTypes.number.isRequired,
        lost: PropTypes.number.isRequired,
        won: PropTypes.number.isRequired,
      }).isRequired,
      total: PropTypes.shape({
        goal_difference: PropTypes.string.isRequired,
      }).isRequired,
      points: PropTypes.number.isRequired,
    })).isRequired,
  }

  componentDidMount() {
    this.props.getStandings(825)
  }

  renderStandingList() {
    return this.props.standings.map((item, index) => (
      <TableRow key={item.team_id}>
        <TableRowColumn>{index + 1}</TableRowColumn>
        <TableRowColumn>{item.team_name}</TableRowColumn>
        <TableRowColumn>{item.overall.games_played}</TableRowColumn>
        <TableRowColumn>{item.overall.won}</TableRowColumn>
        <TableRowColumn>{item.overall.draw}</TableRowColumn>
        <TableRowColumn>{item.overall.lost}</TableRowColumn>
        <TableRowColumn>{item.overall.goals_scored}</TableRowColumn>
        <TableRowColumn>{item.total.goal_difference}</TableRowColumn>
        <TableRowColumn>{item.points}</TableRowColumn>
      </TableRow>
    ))
  }

  render() {
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Position</TableHeaderColumn>
            <TableHeaderColumn>Team name</TableHeaderColumn>
            <TableHeaderColumn>Played</TableHeaderColumn>
            <TableHeaderColumn>Won</TableHeaderColumn>
            <TableHeaderColumn>Drawn</TableHeaderColumn>
            <TableHeaderColumn>Lost</TableHeaderColumn>
            <TableHeaderColumn>Goal</TableHeaderColumn>
            <TableHeaderColumn>Difference</TableHeaderColumn>
            <TableHeaderColumn>Points</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderStandingList()}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = ({ standings }) => ({
  standings: standings.standings,
})

export default connect(mapStateToProps, {
  getStandings,
})(TableExampleSimple)
export { TableExampleSimple as DTableExampleSimple }
