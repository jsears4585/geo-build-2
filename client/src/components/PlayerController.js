import React from 'react'
import { Button, Progress } from 'semantic-ui-react'
import '../index.css'

class PlayerController extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percent: 1,
      score: 1000,
      finished: false,
      answerSubmitted: false,
    }
  }

  componentDidMount() {
    let seconds = 10
    this.functioning(seconds)
    this.scoreKeeping(seconds)
  }

  functioning = seconds => {
    let progressing = setInterval(() => {
      if (this.state.percent >= 100) {
        clearInterval(progressing)
        this.setState({
          finished: true
        })
      }
      this.setState({
        percent: this.state.percent + 1,
      })
    }, seconds * 10)
  }

  scoreKeeping = (seconds) => {
    let scoring = setInterval(() => {
      if (this.state.score <= 0) {
        clearInterval(scoring)
      }
      this.setState({
        score: this.state.score - 1,
      })
    }, seconds)
  }

  handleAnswer = answer => {
    console.log({
      answer: answer,
      clientPoints: this.state.score
    })
    this.setState({
      answerSubmitted: true
    })
  }

  render() {
    return (
      <div className='wrapper playerButtonBuffer'>
        <div className='timer'>{ this.state.finished ? `Time's up!` : this.state.score }</div>
        <div><Progress percent={this.state.percent} color="teal" active className='progressBar' /></div>
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
    )
  }
}

export default PlayerController
