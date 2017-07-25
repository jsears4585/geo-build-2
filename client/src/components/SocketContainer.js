import React, { Component } from "react"
const io = require('socket.io-client')
const socket = io()

class SocketContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
    socket.on('say hello', (data) => this.sayHello(data.name))
    socket.on('message', (data) => console.log(data))
  }

  sayHello = name => {
    console.log(`Hello, ${name}`)
  }

  joinRoom = () => {
    socket.emit('new user join', { name: this.state.value } )
    this.setState({ value: '' })
  }

  onHandleChange = (event) => {
    event.preventDefault()
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <div>
        <input type='text' name='username' value={this.state.value} onChange={this.onHandleChange}></input>
        <button onClick={()=>(this.joinRoom())}>Join</button>
      </div>
    )
  }
}

export default SocketContainer
