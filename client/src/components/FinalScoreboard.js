import React from 'react'
import { Table } from 'semantic-ui-react'

import '../index.css'

const FinalScoreboard = ({playersScoreArray}) => {
    const sortedNames = playersScoreArray.sort(function(a, b) {
      return b.totalPoints - a.totalPoints
    })

    return (
      <div>
        <Table celled className="leaderboard">
          <Table.Header>
            <Table.HeaderCell className="playerColumn">Player</Table.HeaderCell>
            <Table.HeaderCell className="scoreColumn">Score</Table.HeaderCell>
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
      </div>
    )
}

export default FinalScoreboard
