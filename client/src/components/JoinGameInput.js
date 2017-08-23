import React from 'react'
import { Button, Input, Label } from 'semantic-ui-react'

import '../index.css'

const JoinGameInput = ({ value, onHandleChange, joinRoom }) => {
  return (
    <div>
      <Label
        pointing='below'
        style={{ background: '#fff' }}
      >
        Make up a cool name!
      </Label>
      <br />
      <Input
        type='text'
        name='username'
        value={ value }
        onChange={ onHandleChange} >
      </Input>
      <Button
        className="joinButtonPlayer"
        color="green"
        onClick={ ()=> joinRoom() }>
        Join
      </Button>
    </div>
  )
}

export default JoinGameInput
