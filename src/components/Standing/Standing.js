import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table'
import actions from '../../store/actions'
import TeamDialog from '../Team/Team'

const LinkBtn = styled.button`
  color: blue;
  border: 0;
  cursor: pointer;
  text-align: left;
`

class Standing extends Component {
  static propTypes = {
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
    order: 'asc',
    orderBy: 'name',
    list: [],
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.standings,
    })
  }

  createSortHandler = property => (event) => {
    this.handleRequestSort(event, property)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const list =
      order === 'desc'
        ? this.state.list.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.list.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState({ list, order, orderBy })
  }

  queryTeam = (id) => {
    this.props.getTeam(id).then(() => {
      this.setState({
        queryTeam: true,
      })
    })
  }

  handleTeamDailogClose = () => {
    this.setState({
      queryTeam: false,
    })
  }

  renderStandingList() {
    return this.props.standings.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.position}</TableCell>
        <TableCell>
          <LinkBtn
            onClick={() => { this.queryTeam(item.id) }}
          >
            {item.name}
          </LinkBtn>
        </TableCell>
        <TableCell>{item.played}</TableCell>
        <TableCell>{item.won}</TableCell>
        <TableCell>{item.draw}</TableCell>
        <TableCell>{item.lost}</TableCell>
        <TableCell>{item.goal}</TableCell>
        <TableCell>{item.difference}</TableCell>
        <TableCell>{item.points}</TableCell>
      </TableRow>
    ))
  }

  renderHeadings = () => {
    const headings = [
      { id: 'position', desc: 'Position' },
      { id: 'name', desc: 'Team name' },
      { id: 'played', desc: 'Played' },
      { id: 'won', desc: 'Won' },
      { id: 'draw', desc: 'Drawn' },
      { id: 'lost', desc: 'Lost' },
      { id: 'goal', desc: 'Goal' },
      { id: 'difference', desc: 'Difference' },
      { id: 'points', desc: 'Points' },
    ]

    return headings.map(item => (
      <TableCell
        key={item.id}
      >
        <TableSortLabel
          active
          direction="asc"
          onClick={this.createSortHandler(item.id)}
        >
          {item.desc}
        </TableSortLabel>
      </TableCell>
    ))
  }

  render() {
    return (
      <div>
        <TeamDialog
          open={this.state.queryTeam}
          team={this.props.team}
          squad={this.props.squad}
          onClose={this.handleTeamDailogClose}
        />
        <Table>
          <TableHead>
            <TableRow>
              {this.renderHeadings()}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderStandingList()}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = ({ team }) => ({
  team: team.details,
  squad: team.squad,
})

export default connect(mapStateToProps, {
  getTeam: actions.getTeam,
})(Standing)
