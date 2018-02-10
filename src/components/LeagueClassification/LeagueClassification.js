import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table'
import { getStandings } from '../../store/actions/standings'

class TableExampleSimple extends Component {
  static propTypes = {
    getStandings: PropTypes.func.isRequired,
    standings: PropTypes.arrayOf(PropTypes.shape({
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

  constructor(props, context) {
    super(props, context)

    this.state = {
      order: 'asc',
      orderBy: 'name',
      list: [],
    }
  }

  componentDidMount() {
    this.props.getStandings(825)
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

  renderStandingList() {
    return this.props.standings.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.position}</TableCell>
        <TableCell>{item.name}</TableCell>
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
    )
  }
}

const mapStateToProps = ({ standings }) => ({
  standings: standings.standings.map((item, index) => ({
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
  getStandings,
})(TableExampleSimple)

export {
  TableExampleSimple as DTableExampleSimple,
  mapStateToProps,
}
