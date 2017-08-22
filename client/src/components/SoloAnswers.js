import React from 'react'
import { Button } from 'semantic-ui-react'

import '../index.css'

const SoloAnswers = ({ answersArray, recordAnswer, disableButtons }) => {
  return (
    <div className="answerContainer">
      <div className="buttonContainer">
        <Button
          className="answerButton"
          disabled={ disableButtons }
          color="violet"
          onClick={ (event)=> {
            recordAnswer('A')
            event.target.classList.add('answerSelected')
          }}
        >
          { answersArray[0] }
        </Button>
        <Button
          className="answerButton"
          color="violet"
          disabled={ disableButtons }
          onClick={ (event)=> {
            recordAnswer('B')
            event.target.classList.add('answerSelected')
          }}
        >
          { answersArray[1] }
        </Button><br />
        <Button
          className="answerButton"
          color="violet"
          disabled={ disableButtons }
          onClick={ (event)=> {
            recordAnswer('C')
            event.target.classList.add('answerSelected')
          }}
        >
          { answersArray[2] }
        </Button>
        <Button
          className="answerButton"
          color="violet"
          disabled={ disableButtons }
          onClick={ (event)=> {
            recordAnswer('D')
            event.target.classList.add('answerSelected')
          }}
        >
          { answersArray[3] }
        </Button>
      </div>
    </div>
  )
}

export default SoloAnswers
