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

  constructor(props) {
    super(props)
    this.state = {
      code: null,
      startGame: false,
      createGame: false,
      games: [],
      currentTitle: null,
      matchingGames: []
    }
  }

  componentDidMount() {
    fetch('/games')
      .then(res => res.json())
      .then(response => this.setState({
        games: response,
        matchingGames: response
      }))
  }

  gameRedirect = (code) => {
    this.setState({ startGame: true, })
    this.props.updateGameCode(code)
  }

  createGame = () => {
    this.setState({ createGame: true, })
  }

  handleCardClick = e => {
    let title = e.currentTarget.attributes["data-title"].value
    this.props.updateGameTitle(title)
    this.setState({
      code: generateGameCode(4, 'ABCDEF0123456789'),
      currentTitle: title
    })
  }

  matchGames = value => {
    let regex = new RegExp(value, "i")
    let matches = this.state.games.filter(game => {
      if (game.title.match(regex) || game.description.match(regex)) return game
    })
    this.setState({ matchingGames: matches })
  }

  onType = event => {
    const { value } = event.target
    this.matchGames(value)
  }

  render() {
    if (this.state.startGame) {
      return (
        <Redirect push to={`/game/${this.state.code}`}/>
      )
    }

    if (this.state.createGame) {
      return (
        <Redirect push to={'/new'}/>
      )
    }

    let buttonOrCode

    if (this.state.code) {
      buttonOrCode =
      <div>
        You've selected: '{this.state.currentTitle}'<br />
        <Button
          className='Button'
          color="violet"
          basic={false}
          onClick={()=>this.gameRedirect(this.state.code)}
        >
          Start Game?
        </Button>
      </div>
    } else {
      buttonOrCode =
      <Button
        className='Button'
        color="violet"
        basic={false}
        onClick={()=>this.createGame()}
      >
        Create Your Own Game
      </Button>
    }

    let displayGames

    if (!this.state.code) {
      displayGames =
      <div>
        <div className="ui large icon input searchBar">
          <input
            type="text"
            name="searchValue"
            placeholder={"Search for Games"}
            onChange={this.onType}
          />
          <i className="circular search link icon"></i>
        </div>
        <div className="gameSelectionContainer">
          { this.state.matchingGames.map((game, index)=> {
            return (
              <div key={index} data-title={game.title} className='gameCard' onClick={this.handleCardClick}>
                <h3>{ game.title }</h3>
                <p>{ game.description }</p>
              </div>
            )
          }) }
        </div>
      </div>
    } else {
      displayGames = null
    }

    return (
      <Container text textAlign='center'>
        <h1 className='welcome'>{this.state.code ? 'Game Time!' : 'Select a Game'}</h1>
        <div className='buttonWrapper bigCode'>{buttonOrCode}</div>
        {displayGames}
        <Divider />
        <p className="footerBlurb">{this.state.code ? 'This will generate a special code for you to share with the other players.' : 'Pick a game or create your own!' }</p>
      </Container>
    )
  }
}

export default CreatePage
