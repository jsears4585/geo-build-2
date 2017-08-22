import React from 'react'
import { Table, Button, Loader } from 'semantic-ui-react'

import '../index.css'

const Names = ({
    playersNameArray,
    startGame,
    gameCode,
    countriesLength,
    answersLength
  }) => {

  let button
  if (countriesLength === answersLength) {
    button =
    <div className="readyButton">
      <Button
        size='huge'
        color='green'
        circular={true}
        onClick={ ()=> { startGame() } }
      >
        Ready?
      </Button>
    </div>
  } else {
    button = <Loader active size="massive">Loading Countries</Loader>
  }

  return (
    <div>
      <h1 className="gameCodeNames">Use this code: <span className="codeSpan">
        {gameCode || 'ABCD'}</span>
      </h1>
      <Table celled className="leaderboard">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { playersNameArray.map(name => {
            return (
              <Table.Row>
                <Table.Cell>{ name }</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            )
          }) }
        </Table.Body>
        <Table.Footer></Table.Footer>
      </Table>
      {button}
    </div>
  )
}

export default Names
