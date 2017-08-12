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

    if (this.state.countries) {
      displayNames = <div>
        { this.state.countries.map((name)=> {

          let slugged = name.split(" ").join("-")

          return (
            <div className='flagContainers'>
              {name}<br />
              <img src={require(`../images/flags/${slugged}.png`)} />
            </div>
          )
        }) }
      </div>
    } else {
      displayNames = null
    }

    return (
      <div className="newGame">
        {displayNames}
      </div>
    )
  }
}

export default NewGame
