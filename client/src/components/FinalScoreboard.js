import React from 'react'
import { Table } from 'semantic-ui-react'

import { sortNames } from '../lib/utils.js'
import '../index.css'

const FinalScoreboard = ({playersScoreArray}) => {
    const sortedNames = sortNames(playersScoreArray)

    return (
      <div id="finalScoreboard">
        <h1>Final Scores!</h1>
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

        <div id="finalScores">
          <div className="winners">
            <div className="winner_1">Winner #1</div>
            <div className="winner_2">Winner #2</div>
            <div className="winner_3">Winner #3</div>
          </div>
          <div className="podium">
            <div className="podium_1">
              1<sup>st</sup>
            </div>
            <div className="podium_2">
              2<sup>nd</sup>
            </div>
            <div className="podium_3">
              3<sup>rd</sup>
            </div>
          </div>
        </div>
      </div>
    )
}

export default FinalScoreboard
