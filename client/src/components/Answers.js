import React from 'react'

import '../index.css'

const Answers = ({answersArray}) => {
  return (
    <div className="answerContainer">
      <div className="answerBox">A - {answersArray[0]}</div>
      <div className="answerBox">B - {answersArray[1]}</div>
      <div className="answerBox">C - {answersArray[2]}</div>
      <div className="answerBox">D - {answersArray[3]}</div>
    </div>
  )
}

export default Answers
