import React, { Component } from 'react'
import { Input, Label, Button, Loader, Container } from 'semantic-ui-react'

import * as utils from '../lib/utils.js'

import '../index.css'

export class NewGame extends Component {

  state = {
    countries: [],
    title: '',
    description: '',
    answers: [],
    payload: [],
    matchingCountries: []
  }

  componentDidMount() {
    fetch('/get_country_names')
      .then(res => res.json())
      .then(response => this.setState({
        countries: response,
        matchingCountries: response
      }))
  }

  handleOnChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  randomizeAnswers = () => {
    let answers = this.state.answers
    let randomizedArrays = answers.map((answer, index) => {
      let tempArray = [answers[index]]
        while (tempArray.length <= 3) {
          let countryIndex = this.state.countries.indexOf(answer)
          let randomIndex = countryIndex
          while (randomIndex === countryIndex) {
            randomIndex = utils.getRandomInt(0, this.state.countries.length)
          }
          tempArray.push(this.state.countries[randomIndex])
          tempArray = utils.uniqueArray(tempArray)
        }
      return tempArray
    })
    return randomizedArrays
  }

  handleSubmit = () => {
    let payload = this.randomizeAnswers()
    fetch('/game', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        "game" : {
          "title": this.state.title,
          "description": this.state.description,
          "answers": payload
        }
      })
    }).then(res => res.json())
      .then(response => console.log(response))
  }

  uniqueAnswers = (name) => {
    let answers = utils.uniqueArray([...this.state.answers, name])
    this.setState({
      answers: answers
    })
  }

  removeAnswer = (name) => {
    let index = this.state.answers.indexOf(name)
    this.setState({
      answers: this.state.answers.filter((_, i) => i !== index)
    })
  }

  render() {

    let displayNames
    if (this.state.countries) {
      displayNames =
      <div>
        { this.state.matchingCountries.map((name, index)=> {

          let slugged = name.split(" ").join("-")
          return (
            <div
              id={`${name}`}
              className='flagContainers noselect'
              onClick={(event)=> {
                if (event.currentTarget.classList.contains('selected')) {
                  event.currentTarget.classList.remove('selected')
                  this.removeAnswer(name)
                } else {
                  event.currentTarget.classList.add('selected')
                  this.uniqueAnswers(name)
                }
              }}
            >
              {name}<br />
              <img
                src={require(`../images/flags/${slugged}.png`)}
                alt={slugged}
              />
            </div>
          )
        }) }
      </div>
    } else {
      displayNames = <Loader active inline='centered' />
    }

    return (
      <div className="newGame">
        <Label>Title</Label><br />
        <Input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleOnChange}
        /><br />
        <Label>Description</Label><br />
        <Input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleOnChange}
        />
        <Container text className="pickedAnswers">
          {this.state.answers.join(', ')}
        </Container>
        {displayNames}
        <Button color="pink" onClick={()=>this.handleSubmit()}>
          Select your countries
        </Button>
      </div>
    )
  }
}

export default NewGame
