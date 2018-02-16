import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog'
import { CircularProgress } from 'material-ui/Progress'
import styled from 'styled-components'
import actions from '../../store/actions'
import Card from '../Card/Card'

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
const Squad = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
`
const Player = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const HeadContent = styled.div`
  display: flex;
  justify-content: space-between;
`
const Ul = styled.ul`
  padding: 0;
  margin: 0;
`
const Li = styled.li`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d6d6d6;
  margin: 10px 0;
`
const Title = styled.h2`
  color: rgba(255, 255, 255, 0.87);
  margin: 0;
`
const styles = {
  dialogHead: {
    background: '#009688',
    color: 'rgba(255, 255, 255, 0.87)',
  },
}

class TeamDialog extends Component {
  static propTypes = {
    getPlayer: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
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
    players: PropTypes.shape({
      id: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        height: PropTypes.string,
        weight: PropTypes.string,
        photo: PropTypes.string,
      }),
    }).isRequired,
  }

  static defaultProps = {
    open: false,
    onClose: undefined,
  }

  state = {
    open: false,
    squadLoaded: false,
  }

  componentWillReceiveProps(props) {
    this.setState({ open: props.open })
  }

  getSquad = () => {
    if (this.props.squad) {
      const requests = this.props.squad.reduce((promises, player) => {
        if (!this.props.players[player.player_id]) {
          return [...promises, this.props.getPlayer(player.player_id)]
        }
        return []
      }, [])

      return Promise.all(requests).then(() => {
        this.setState({
          squadLoaded: true,
        })
      })
    }

    return null
  }

  handleClose = () => {
    this.setState({
      open: false,
      squadLoaded: false,
    })
    this.props.onClose()
  }

  renderSquad = () => {
    if (this.state.squadLoaded) {
      if (this.props.squad.length) {
        return this.props.squad.map((squadMember) => {
          const player = this.props.players[squadMember.player_id]

          return (
            player &&
            <Player key={player.id}>
              <Card>
                <Card.Header>
                  <HeadContent>
                    <img src={player.photo} alt="player" />
                    <b>{player.name}</b>
                  </HeadContent>
                </Card.Header>
                <Card.Content>
                  <Ul>
                    {player.position && <Li><b>Position:</b> {player.position}</Li>}
                    {player.weight && <Li><b>Weight:</b> {player.weight}</Li>}
                    {player.height && <Li><b>Height:</b> {player.height}</Li>}
                    {player.nationality && <Li><b>Nationality:</b> {player.nationality}</Li>}
                  </Ul>
                </Card.Content>
              </Card>
            </Player>
          )
        })
      }

      return (
        <h3>Squad not available</h3>
      )
    }

    return (
      <CircularProgress />
    )
  }

  render() {
    const { fullScreen } = this.props

    return (
      <div >
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          onEnter={this.getSquad}
          aria-labelledby="Team squad"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle style={styles.dialogHead} disableTypography>
            <Title>{this.props.team.name}</Title>
          </DialogTitle>
          <DialogContent style={{ padding: '15px' }}>
            <LogoContainer>
              <img src={this.props.team.logo} alt="team logo" />
            </LogoContainer>
            <Squad>{this.renderSquad()}</Squad>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Dismiss
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ players }) => ({
  players,
})

export default connect(mapStateToProps, {
  getPlayer: actions.getPlayer,
})(withMobileDialog()(TeamDialog))

export {
  TeamDialog as DTeam,
  mapStateToProps,
}
