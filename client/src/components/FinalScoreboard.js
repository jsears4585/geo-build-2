import React from 'react'
import { Table } from 'semantic-ui-react'

import { sortNames } from '../lib/utils.js'
import '../index.css'

const FinalScoreboard = ({ playersScoreArray, winnerArray }) => {
    const sortedNames = sortNames(playersScoreArray)

    return (
      <div id="finalScoreboard">
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
                  <Table.Cell className="userFinal">{ player.username }</Table.Cell>
                  <Table.Cell>{ player.totalPoints }</Table.Cell>
                </Table.Row>
              )
            }) }
          </Table.Body>
          <Table.Footer></Table.Footer>
        </Table>

        <div id="finalScores">
          <div className="winners">
            <div className="winner_1">{ !winnerArray[0] ? null : winnerArray[0].username }</div>
            <div className="winner_2">{ !winnerArray[1] ? null : winnerArray[1].username }</div>
            <div className="winner_3">{ !winnerArray[2] ? null : winnerArray[2].username }</div>
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
        <img
          alt="earth"
          src={ require('../images/earth-real-2.png') }
          style={ { position: 'absolute',
                    top: '559px',
                    left: '655px',
                    zIndex: '15',
                    overflow: 'hidden'
          }}
          width="1080"
        />
      </div>
    )
}

export default FinalScoreboard
