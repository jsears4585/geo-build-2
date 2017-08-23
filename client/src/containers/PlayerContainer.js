import React from 'react'
import { Button, Input, Label } from 'semantic-ui-react'

import PresentationPlayerButtons from '../components/PresentationPlayerButtons'
import JoinGameInput from '../components/JoinGameInput'
import AnswerCorrect from '../components/AnswerCorrect'
import AnswerIncorrect from '../components/AnswerIncorrect'

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
        }.bind(this), 1747)
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

  fire = () => {
    let seconds = 10
    this.scoreKeeping(seconds)
  }

  joinRoom = () => {
    socket = io('/current-players')
    socket.emit('new user join', { name: this.state.value })
    socket.on('say hello', data => this.sayHello(data.name))
    socket.on('render controller', data => {
      this.setState({
        controllerShouldRender: true,
        userAnswer: '',
        finished: false,
        answerSubmitted: false
       })
      this.fire()
    })
    socket.on('receive round data', data => {
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

  onHandleChange = event => {
    event.preventDefault()
    this.setState({ value: event.target.value })
  }

  render() {
    let show
    if (this.state.controllerShouldRender) {
      show =
        <PresentationPlayerButtons
          answerSubmitted={ this.state.answerSubmitted }
          handleAnswer={ this.handleAnswer }
        />
    } else {
      let answerKey = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }
      if (this.state.showRoundResults) {
        let correctAnswerIndex = answerKey[this.state.correctAnswer]
        if (this.state.userAnswer === this.state.correctAnswer) {
          show =
            <AnswerCorrect
              currentAnswersArray={ this.state.currentAnswersArray }
              correctAnswerIndex={ correctAnswerIndex }
            />
        } else {
          show =
            <AnswerIncorrect
              currentAnswersArray={ this.state.currentAnswersArray }
              userAnswer={ this.state.userAnswer }
              userAnswerIndex={ answerKey[this.state.userAnswer] }
              correctAnswerIndex={ correctAnswerIndex }
            />
        }
      } else if (   !this.state.renderSignin
                    && !this.state.showRoundResults
                    && this.state.currentAnswersArray.length <= 0 ) {
        show =
          <div>
            <p>The game is about ready to start!</p>
          </div>
      }
    }
    let signIn
    if (this.state.renderSignin) {
      signIn =
        <JoinGameInput
          value={ this.state.value }
          onHandleChange={ this.onHandleChange }
          joinRoom={ this.joinRoom }
        />
    } else {
      signIn = null
    }
    return (
      <div className='wrapper playerButtonBuffer'>
        { signIn }
        { show }
      </div>
    )
  }
}

export default PlayerContainer
