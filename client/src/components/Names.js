import React from 'react'
import { Table, Button } from 'semantic-ui-react'

import '../index.css'

const Names = ({playersNameArray, startGame}) => {
  return (
    <div>
      <Table celled className="leaderboard">
        <Table.Header>
          <Table.HeaderCell className="playerColumn">Player</Table.HeaderCell>
          <Table.HeaderCell className="scoreColumn">Score</Table.HeaderCell>
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
      <div className="dashboardButtons">
        <Button
          color='facebook'
          basic={true}
          onClick={ ()=> { startGame() } }
        >
          Everybody Ready?
        </Button>
      </div>
    </div>
  )
}

export default Names
