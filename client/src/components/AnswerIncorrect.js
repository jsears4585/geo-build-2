import React from 'react'

import '../index.css'

const AnswerIncorrect = ({ currentAnswersArray, userAnswer, userAnswerIndex, correctAnswerIndex }) => {
  return (
    <div className="playerResultWrapper">
      <i className="massive remove red circle icon userFeedbackIcons"></i>
      <br />
      <p>
        You answered { userAnswer === ''
          ?
            'nothing this round.'
          :
            currentAnswersArray[userAnswerIndex]
          }
      </p>
      <p>
        The correct answer was { currentAnswersArray[correctAnswerIndex] }.
      </p>
    </div>
  )
}

export default AnswerIncorrect
