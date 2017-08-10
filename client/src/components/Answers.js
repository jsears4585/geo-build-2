import React, { Component } from 'react'

import '../index.css'

class Answers extends Component {

  render() {
    return (
      <div className="answerContainer">
        <div className="answerBox">A - {this.props.answersArray[0]}</div>
        <div className="answerBox">B - {this.props.answersArray[1]}</div>
        <div className="answerBox">C - {this.props.answersArray[2]}</div>
        <div className="answerBox">D - {this.props.answersArray[3]}</div>
      </div>
    )
  }
}

export default Answers
