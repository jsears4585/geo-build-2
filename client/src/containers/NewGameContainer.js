import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import CreateYourOwn from '../components/CreateYourOwn'
import CountryFlagButtons from '../components/CountryFlagButtons'

import * as utils from '../lib/utils.js'
import '../index.css'

export class NewGameContainer extends Component {

  state = {
    countries: [],
    title: '',
    description: '',
    answers: [],
    payload: [],
    matchingCountries: [],
    redirect: false
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
      .then(response => this.handleRedirect())
  }

  handleRedirect = () => {
    this.setState({redirect: true})
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

    if (this.state.redirect) {
      return (
        <Redirect push to={ '/create/' }/>
      )
    }

    let displayNames
    if (this.state.countries) {
      displayNames =
        <CountryFlagButtons
          matchingCountries={this.state.matchingCountries}
          removeAnswer={this.removeAnswer}
          uniqueAnswers={this.uniqueAnswers}
        />

    } else {
      displayNames = <Loader active inline='centered' />
    }

    return (
      <CreateYourOwn
        title={ this.state.title }
        handleOnChange={ this.handleOnChange }
        handleSubmit={ this.handleSubmit }
        description={ this.state.description }
        answers={ this.state.answers }
        displayNames={ displayNames }
      />
    )
  }
}

export default NewGameContainer
