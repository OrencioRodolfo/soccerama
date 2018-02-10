import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog'
import styled from 'styled-components'

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
const Squad = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Player = styled.div`
  padding: 10px;
`

class TeamDialog extends React.Component {
  static propTypes = {
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
  }

  static defaultProps = {
    open: false,
    onClose: undefined,
  }

  state = {
    open: false,
  }

  componentWillReceiveProps(props) {
    this.setState({ open: props.open })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.onClose()
  }

  renderSquad() {
    return this.props.squad.map(player => (
      <Player key={player.player_id}>
        <img src="https://www.shareicon.net/data/128x128/2016/06/30/788946_people_512x512.png" alt="player" />
        <div style={{ textAlign: 'center' }}>{player.player_id}</div>
      </Player>
    ))
  }

  render() {
    const { fullScreen } = this.props

    return (
      <div >
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle>{this.props.team.name}</DialogTitle>
          <DialogContent style={{ minWidth: '400px' }}>
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

export default withMobileDialog()(TeamDialog)
