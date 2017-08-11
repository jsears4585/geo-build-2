import React from 'react'
import { Table, Button } from 'semantic-ui-react'

import '../index.css'

const Names = ({playersNameArray, startGame, gameCode}) => {
  return (
    <div>
      <h1 className="gameCodeNames">Use this code:
        <span className="codeSpan">{gameCode || 'ABCD'}</span>
      </h1>
      <Table celled className="leaderboard">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="playerColumn">Player</Table.HeaderCell>
            <Table.HeaderCell className="scoreColumn">Score</Table.HeaderCell>
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
      <div className="readyButton">
        <Button
          size='huge'
          color='violet'
          circular={true}
          onClick={ ()=> { startGame() } }
        >
          Ready?
        </Button>
      </div>
    </div>
  )
}

export default Names
