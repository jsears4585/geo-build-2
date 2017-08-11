import React, { Component } from 'react'

import '../index.css'

export class NewGame extends Component {

  state = {
    countries: []
  }

  componentDidMount() {
    console.log('works')
    fetch('/get_country_names')
      .then(res => res.json())
      .then(response => this.setState({
        countries: response
      }))
  }



  render() {

    let displayNames

    if (!this.state.code) {
      displayNames = <div>
        { this.state.countries.map((name)=> {
          return (
            <li>{name}</li>
          )
        }) }
      </div>
    } else {
      displayNames = null
    }

    return (
      <div className="newGame">
        <ul>
          {displayNames}
        </ul>
      </div>
    )
  }
}

export default NewGame
