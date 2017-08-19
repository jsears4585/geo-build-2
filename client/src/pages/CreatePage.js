import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Divider, Form, Radio } from 'semantic-ui-react'

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
      matchingGames: [],
      gameMode: '',
      clicked: false
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
    this.setState({
      startGame: true,
      clicked: true
    })
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
    // eslint-disable-next-line
    let matches = this.state.games.filter(game => {
      if (game.title.match(regex) || game.description.match(regex)) {
        return game
      }
    })
    this.setState({ matchingGames: matches })
  }

  onType = event => {
    const { value } = event.target
    this.matchGames(value)
  }

  handleChange = (e, { value }) => this.setState({ gameMode: value })

  render() {
    if (this.state.gameMode === 'solo' && this.state.clicked) {
      return <Redirect push to={`/solo`}/>
    }

    if (this.state.gameMode === 'presentation' && this.state.clicked) {
      return <Redirect push to={`/game/${this.state.code}`}/>
    }

    if (this.state.createGame) {
      return <Redirect push to={'/new'}/>
    }

    let buttonOrCode

    if (this.state.code) {
      buttonOrCode =
      <div>
        Next up: '{this.state.currentTitle}'<br />

        <div className="gameToggles">
          <h3>Select your gameplay mode:</h3>
          <Form>
            <Form.Field>
              <Radio
                label="Solo"
                name='radioGroup'
                value='solo'
                checked={this.state.gameMode === 'solo'}
                onChange={this.handleChange}
                toggle
              /><br />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Presentation"
                name='radioGroup'
                value='presentation'
                checked={this.state.gameMode === 'presentation'}
                onChange={this.handleChange}
                toggle
              /><br />
            </Form.Field>
          </Form>
        </div>
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
        size='huge'
        onClick={()=>this.createGame()}
      >
        Create Your Own Game
      </Button>
    }

    let displayGames

    if (!this.state.code) {
      displayGames =
        <div className="gameSelectionContainer">
          <div className="ui huge icon input searchBar">
            <input
              type="text"
              name="searchValue"
              placeholder={"Search for Games"}
              onChange={this.onType}
            />
            <i className="circular search link icon"></i>
          </div>

          <div>
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
        <h1 className='welcome'>{this.state.code ? 'Game Time!' : 'Pick or Create'}</h1>
        <div className='buttonWrapper bigCode'>{buttonOrCode}</div>
        {displayGames}
        <Divider />
        <p className="footerBlurb">
          { this.state.code
            ?
              'Please select a game mode. You can play by yourself, with friends, or lead a class.'
            :
              'Geography is pretty fun, huh?'
          }
        </p>
      </Container>
    )
  }
}

export default CreatePage
