import React from 'react'
import { Button } from 'semantic-ui-react'

import '../index.css'

const SoloAnswers = ({ answersArray, recordAnswer, disableButtons }) => {
  return (
    <div className="answerContainer">
      <div className="buttonContainer">
        <Button
          className="answerButton"
          disabled={disableButtons}
          onClick={()=>recordAnswer('A')}
        >
          {answersArray[0]}
        </Button>
        <Button
          className="answerButton"
          disabled={disableButtons}
          onClick={()=>recordAnswer('B')}
        >
          {answersArray[1]}
        </Button><br />
        <Button
          className="answerButton"
          disabled={disableButtons}
          onClick={()=>recordAnswer('C')}
        >
          {answersArray[2]}
        </Button>
        <Button
          className="answerButton"
          disabled={disableButtons}
          onClick={()=>recordAnswer('D')}
        >
          {answersArray[3]}
        </Button>
      </div>
    </div>
  )
}

export default SoloAnswers
