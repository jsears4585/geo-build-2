import React from 'react'
import { Button, Progress } from 'semantic-ui-react'

import '../index.css'

const io = require('socket.io-client')
let socket

class PlayerContainer extends React.Component {

  state = {
    value: '',
    percent: 1,
    score: 1000,
    finished: false,
    renderSignin: true,
    answerSubmitted: false,
    controllerShouldRender: false,
    username: ''
  }

  functioning = seconds => {
    let progressing = setInterval(() => {
      if (this.state.percent >= 100) {
        clearInterval(progressing)
        this.setState({
          percent: 1
        })
      } else {
        this.setState({ percent: this.state.percent + 1 })
      }
    }, seconds * 10)
  }

  scoreKeeping = seconds => {
    let scoring = setInterval(() => {
      if (this.state.score <= 0) {
        clearInterval(scoring)
        this.setState({
          finished: true,
          score: 1000
        })
      } else {
        this.setState({ score: this.state.score - 1 })
      }
    }, seconds)
  }

  handleAnswer = answer => {
    let clientAnswer = {
      username: this.state.username,
      answer: answer,
      points: this.state.score
    }
    socket.emit('send answer', clientAnswer)
    this.setState({
      answerSubmitted: true
    })
  }

  sayHello = name => {
    console.log(`Hello, ${name}`)
    this.setState({
      username: name
    })
  }

  nextSlide = () => {
    console.log('Render next slide')
  }

  fire = () => {
    let seconds = 10
    this.functioning(seconds)
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
        <div className='timer'>{ this.state.finished ? `Time's up!` : this.state.score }</div>
        <div><Progress percent={ this.state.percent } color="teal" active className='progressBar' /></div>
        <Button
          className='squareButton'
          color='facebook'
          disabled={this.state.answerSubmitted}
          onClick={()=> {this.handleAnswer('A')} }
        >
          A
        </Button>
        <Button
          className='squareButton'
          color='facebook'
          disabled={this.state.answerSubmitted}
          onClick={()=> {this.handleAnswer('B')} }
        >
          B
        </Button><br />
        <Button
          className='squareButton'
          color='facebook'
          disabled={this.state.answerSubmitted}
          onClick={()=> {this.handleAnswer('C')} }
        >
          C
        </Button>
        <Button
          className='squareButton'
          color='facebook'
          disabled={this.state.answerSubmitted}
          onClick={()=> {this.handleAnswer('D')} }
        >
          D
        </Button>
      </div>
    } else {
      show = null
    }

    let signIn
    if (this.state.renderSignin) {
      signIn =
      <div>
        <input type='text' name='username' value={this.state.value} onChange={this.onHandleChange}></input>
        <button onClick={()=>(this.joinRoom())}>Join</button>
      </div>
    } else {
      signIn = null
    }

    return (
      <div className='wrapper playerButtonBuffer'>
        {signIn}
        {this.state.finished ? null : show}
      </div>
    )
  }
}

export default PlayerContainer
