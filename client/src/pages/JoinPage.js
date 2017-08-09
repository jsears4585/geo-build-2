import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Input, Container, Divider } from 'semantic-ui-react'

import '../index.css'

class JoinPage extends React.Component {

  state = {
    codeInput: '',
    startGame: false,
  }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    let { codeInput } = this.state
    if (!codeInput) return false
    this.setState({
      startGame: true,
    })
  }

  playerRedirect = () => { this.setState({ startGame: true, }) }

  render() {
    const { startGame } = this.state

    if (startGame) {
      return (
        <Redirect push to={`/game/${this.state.codeInput}`}/>
      )
    }

    return (
      <Container text textAlign='center' className='wrapper'>
        <h1 className='welcome'>Join A Game!</h1>
        <div className='buttonWrapper'>
          <form onSubmit={this.handleSubmit}>
            <div>
              <Input
                id='codeInput'
                name='codeInput'
                type='text'
                maxLength='4'
                pattern="[a-fA-F\d]+"
                placeholder='CODE GOES HERE'
                value={this.state.codeInput}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <Button id='joinButton' type='submit'>Join</Button>
            </div>
          </form>
        </div>
        <Divider />
        <p>Please input your 4-digit code. Don't worry, we're case-insensitive.</p>
      </Container>
    )
  }
}

export default JoinPage
