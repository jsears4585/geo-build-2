import React from 'react'
import '../index.css'

const io = require('socket.io-client')
let socket

class PlayerConnection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }
  }

  sayHello = name => {
    console.log(`Hello, ${name}`)
  }

  nextSlide = () => {
    console.log('Render next slide')
  }

  joinRoom = () => {
    socket = io('/current-players')
    socket.emit('new user join', { name: this.state.value })
    socket.on('say hello', (data) => this.sayHello(data.name))
    socket.on('say works', (data) => console.log(data.works))
    this.setState({ value: '' })
  }

  onHandleChange = (event) => {
    event.preventDefault()
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <div className='wrapper playerButtonBuffer'>
        <input type='text' name='username' value={this.state.value} onChange={this.onHandleChange}></input>
        <button onClick={()=>(this.joinRoom())}>Join</button>
      </div>
    )
  }
}

export default PlayerConnection
