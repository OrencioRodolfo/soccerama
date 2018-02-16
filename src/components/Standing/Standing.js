import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table'

const LinkBtn = styled.button`
  color: blue;
  border: 0;
  cursor: pointer;
  text-align: left;
`

class Standing extends Component {
  static propTypes = {
    onTeamSelect: PropTypes.func.isRequired,
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
    orderBy: 'position',
    list: [],
    pendingRequest: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.standings,
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const result = (nextProps.standings.length !== this.props.standings.length)
    || (!this.isArrayEqual(nextProps.standings, this.props.standings))
    || (
      nextState.order !== this.state.order ||
      nextState.orderBy !== this.state.orderBy ||
      nextState.pendingRequest !== this.state.pendingRequest
    )

    return result
  }

  isArrayEqual = (x, y) => _(x).differenceWith(y, _.isEqual).isEmpty()

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

    this.setState({
      list,
      order,
      orderBy,
    })
  }

  handleTeamSelection = (id) => {
    this.setState({
      pendingRequest: true,
    })

    this.props.onTeamSelect(id).then(() => {
      this.setState({
        pendingRequest: false,
      })
    })
  }

  renderHeadings = () => {
    const { orderBy, order } = this.state
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
        padding="none"
      >
        <TableSortLabel
          active={orderBy === item.id}
          direction={order}
          onClick={this.createSortHandler(item.id)}
        >
          {item.desc}
        </TableSortLabel>
      </TableCell>
    ))
  }

  renderStandingList() {
    if (this.props.standings && this.props.standings.length) {
      return this.props.standings.map(item => (
        <TableRow key={item.id}>
          <TableCell padding="none">{item.position}</TableCell>
          <TableCell padding="none">
            <LinkBtn
              onClick={() => { this.handleTeamSelection(item.id) }}
              disabled={this.state.pendingRequest}
            >
              {item.name}
            </LinkBtn>
          </TableCell>
          <TableCell padding="none">{item.played}</TableCell>
          <TableCell padding="none">{item.won}</TableCell>
          <TableCell padding="none">{item.draw}</TableCell>
          <TableCell padding="none">{item.lost}</TableCell>
          <TableCell padding="none">{item.goal}</TableCell>
          <TableCell padding="none">{item.difference}</TableCell>
          <TableCell padding="none">{item.points}</TableCell>
        </TableRow>
      ))
    }

    return (
      <TableRow>
        <TableCell colSpan="9" style={{ textAlign: 'center' }}>No results</TableCell>
      </TableRow>
    )
  }

  render() {
    return (
      <div>
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

export default Standing
