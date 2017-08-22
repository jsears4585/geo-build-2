import React from 'react'
import { Button, Container, Input, Label, TextArea } from 'semantic-ui-react'

import '../index.css'

const CreateYourOwn = ({
  title,
  handleOnChange,
  handleSubmit,
  description,
  answers,
  displayNames
}) => {
  return (
    <div className="newGame">
      <Container text textAlign='center'>
        <h1 className='welcome'>Create Your Own</h1>
        <Label
          className="newGameLabel"
        >
          Game Title
        </Label><br />
        <Input
          type="text"
          name="title"
          required
          className="newGameInput"
          value={title}
          onChange={handleOnChange}
        /><br />
        <Label
          className="newGameLabel"
        >
          Game Description
        </Label><br />
        <TextArea
          type="text"
          name="description"
          required
          className="newGameTextArea"
          value={description}
          onChange={handleOnChange}
        />
        <h3 style={{
          textIndent: '16px',
          color: 'rgb(80, 80, 80)'
        }}>
          Selected Countries:
        </h3>
        <Container text className="pickedAnswers">
          {answers.join(', ')}
        </Container>
      </Container>
      {displayNames}
      <Button
        className="gameSubmitButton"
        size="huge"
        fluid={true}
        color="violet"
        onClick={()=>handleSubmit()}
      >
        Select these countries
      </Button>
    </div>
  )
}

export default CreateYourOwn
