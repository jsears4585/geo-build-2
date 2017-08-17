import React from 'react'
import { Button, Input, Label } from 'semantic-ui-react'

import '../index.css'

const io = require('socket.io-client')
let socket

class PlayerContainer extends React.Component {

  state = {
    value: '',
    score: 1000,
    finished: false,
    renderSignin: true,
    answerSubmitted: false,
    controllerShouldRender: false,
    showRoundResults: false,
    currentAnswersArray: [],
    currentCountryAnswers: [],
    userAnswer: '',
    correctAnswer: '',
    username: ''
  }

  scoreKeeping = seconds => {
    let scoring = setInterval(() => {
      if (this.state.score <= 0) {
        clearInterval(scoring)
        this.setState({
          controllerShouldRender: false,
          finished: true,
          score: 1000
        })
        setTimeout(function() {
          this.setState({ showRoundResults: true })
        }.bind(this), 1000)
      } else {
        this.setState({ score: this.state.score - 1 })
      }
    }, seconds)
  }

  handleAnswer = answer => {
    socket.emit('send answer', {
      username: this.state.username,
      answer: answer,
      points: this.state.score
    })
    this.setState({
      answerSubmitted: true,
      userAnswer: answer
    })
  }

  sayHello = name => this.setState({ username: name })

  nextSlide = () => {
    console.log('Render next slide')
  }

  fire = () => {
    let seconds = 10
    this.scoreKeeping(seconds)
  }

  joinRoom = () => {
    socket = io('/current-players')
    socket.emit('new user join', { name: this.state.value })
    socket.on('say hello', (data) => this.sayHello(data.name))
    socket.on('render controller', (data) => {
      this.setState({
        controllerShouldRender: true,
        finished: false,
        answerSubmitted: false
       })
      this.fire()
    })
    socket.on('receive round data', (data) => {
      this.setState({
        correctAnswer: data.correctAnswer,
        currentAnswersArray: data.answersArray
      })
    })
    this.setState({
      value: '',
      renderSignin: false,
    })
  }

  onHandleChange = e => {
    e.preventDefault()
    this.setState({ value: e.target.value })
  }

  render() {

    let show
    if (this.state.controllerShouldRender) {
      show =
      <div>
        <Button
          className='squareButton'
          color='violet'
          disabled={this.state.answerSubmitted}
          onClick={()=> {this.handleAnswer('A')} }
        >
          A
        </Button>
        <Button
          className='squareButton'
          color='violet'
          disabled={this.state.answerSubmitted}
          onClick={()=> {this.handleAnswer('B')} }
        >
          B
        </Button><br />
        <Button
          className='squareButton'
          color='violet'
          disabled={this.state.answerSubmitted}
          onClick={()=> {this.handleAnswer('C')} }
        >
          C
        </Button>
        <Button
          className='squareButton'
          color='violet'
          disabled={this.state.answerSubmitted}
          onClick={()=> {this.handleAnswer('D')} }
        >
          D
        </Button>
      </div>
    } else {

      if (this.state.showRoundResults) {
        show =
        <div>
          <p>You answered: {this.state.userAnswer}</p>
          <p>Correct answer: {this.state.correctAnswer}</p>
          <p> {  this.state.userAnswer === this.state.correctAnswer
                ? 'You got it right!'
                : 'Better luck next time!'
              }
          </p>
        </div>
      } else {
        show = null
      }
    }

    let signIn
    if (this.state.renderSignin) {
      signIn =
      <div>
        <Label pointing='below'>Make up a cool name!</Label><br />
        <Input
          type='text'
          name='username'
          value={this.state.value}
          onChange={this.onHandleChange}>
        </Input>
        <Button
          className="joinButtonPlayer"
          color="violet"
          onClick={()=>(this.joinRoom())}>
          Join
        </Button>
      </div>
    } else {
      signIn = null
    }

    return (
      <div className='wrapper playerButtonBuffer'>
        {signIn}
        {show}
      </div>
    )
  }
}

export default PlayerContainer
