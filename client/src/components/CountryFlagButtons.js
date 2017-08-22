import React from 'react'

import '../index.css'

const CountryFlagButtons = ({
  matchingCountries,
  removeAnswer,
  uniqueAnswers
}) => {
  return (
    <div>
      { matchingCountries.map((name, index)=> {
        let slugged = name.split(" ").join("-")
        return (
          <div
            id={ `${name}` }
            key={ index }
            className='flagContainers noselect'
            onClick={(event)=> {
              if (event.currentTarget.classList.contains('selected')) {
                event.currentTarget.classList.remove('selected')
                removeAnswer(name)
              } else {
                event.currentTarget.classList.add('selected')
                uniqueAnswers(name)
              }
            }}
          >
            <img
              src={ require(`../images/flags/${ slugged }.png`) }
              className="newGameFlag"
              alt={ slugged }
            />
            <p className="newGameCountryName">{ name }</p>
          </div>
        )
      }) }
    </div>
  )
}

export default CountryFlagButtons
