import React from 'react'

import '../index.css'

const AnswerCorrect = ({ currentAnswersArray, correctAnswerIndex }) => {
  return (
    <div className="playerResultwrapper">
      <i className="massive check green circle icon userFeedbackIcons"></i>
      <br />
      <p>You got it right! { currentAnswersArray[correctAnswerIndex] } is correct.</p>
    </div>
  )
}

export default AnswerCorrect
