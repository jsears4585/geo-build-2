import React from 'react'
import { Table, Button } from 'semantic-ui-react'

import { sortNames } from '../lib/utils.js'
import '../index.css'

const Scoreboard = ({playersScoreArray, startGame}) => {
    const sortedNames = sortNames(playersScoreArray)

    return (
      <div>
        <Table celled className="leaderboard">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="playerColumn">Player</Table.HeaderCell>
              <Table.HeaderCell className="scoreColumn">Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { sortedNames.map(player => {
              return (
                <Table.Row>
                  <Table.Cell>{ player.username }</Table.Cell>
                  <Table.Cell>{ player.totalPoints }</Table.Cell>
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

export default Scoreboard
