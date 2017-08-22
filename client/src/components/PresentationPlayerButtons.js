import React from 'react'
import { Button } from 'semantic-ui-react'

import '../index.css'

const PresentationPlayerButtons = ({ answerSubmitted, handleAnswer }) => {
  return (
    <div>
      <Button
        className='squareButton'
        color='violet'
        disabled={ answerSubmitted }
        onClick={ ()=> { handleAnswer('A') } }
      >
        A
      </Button>
      <Button
        className='squareButton'
        color='violet'
        disabled={ answerSubmitted }
        onClick={ ()=> { handleAnswer('B') } }
      >
        B
      </Button><br />
      <Button
        className='squareButton'
        color='violet'
        disabled={ answerSubmitted }
        onClick={ ()=> { handleAnswer('C') } }
      >
        C
      </Button>
      <Button
        className='squareButton'
        color='violet'
        disabled={ answerSubmitted }
        onClick={ ()=> { handleAnswer('D') } }
      >
        D
      </Button>
    </div>
  )
}

export default PresentationPlayerButtons
