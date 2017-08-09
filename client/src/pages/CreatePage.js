import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Divider } from 'semantic-ui-react'

import '../index.css'

const generateGameCode = (length, chars) => {
  let code = ''
  for (let i = length; i > 0; --i) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

class CreatePage extends React.Component {

  state = {
    code: null,
    startGame: false,
  }

  gameRedirect = () => { this.setState({ startGame: true, }) }

  render() {
    const { startGame } = this.state

    if (startGame) {
      return (
        <Redirect push to={`/game/${this.state.code}`}/>
      )
    }

    let buttonOrCode
    if (this.state.code) {
      buttonOrCode =
      <div>
        {this.state.code}
        <Button
          className='biggerButton'
          color="facebook"
          basic={false}
          onClick={this.gameRedirect}
        >
          Start Game
        </Button>
      </div>
    } else {
      buttonOrCode =
      <Button
        className='biggerButton'
        color="facebook"
        basic={false}
        onClick={ ()=> {
          this.setState({
            code: generateGameCode(4, 'ABCDEF0123456789'),
          })
        }}
      >
        Create Game
      </Button>
    }

    return (
      <Container text textAlign='center' className='wrapper'>
        <h1 className='welcome'>{this.state.code ? 'Game Time!' : 'Almost!'}</h1>
        <div className='buttonWrapper bigCode'>{buttonOrCode}</div>
        <Divider />
        <p>{this.state.code ? 'Share this code with the other players and have them log in to the game room.' : 'This will generate a special code for you to share with the other players.' }</p>
      </Container>
    )
  }
}


export default CreatePage
