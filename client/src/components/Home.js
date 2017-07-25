import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Divider } from 'semantic-ui-react'

import '../index.css'

class Home extends React.Component {

  state = {
    redirectCreate: false,
    redirectJoin: false,
  }

  joinRedirect = () => { this.setState({ redirectJoin: true, }) }
  createRedirect = () => { this.setState({ redirectCreate: true, }) }

  render() {
    const { redirectCreate, redirectJoin } = this.state

    if (redirectCreate) {
      return (
        <Redirect push to={'/create'}/>
      )
    } else if (redirectJoin) {
      return (
        <Redirect push to={'/join'}/>
      )
    }

    return (
      <Container text textAlign='center' className='wrapper'>
        <h1 className='welcome'>Welcome!</h1>
        <div className='buttonWrapper'>
          <Button
            className='bigButton'
            color="facebook"
            onClick={this.joinRedirect}
          >
            Join
          </Button>
          <Button
            className='bigButton'
            color="facebook"
            basic={true}
            onClick={this.createRedirect}
          >
            Create
          </Button>
        </div>
        <Divider />
        <p>An interactive geography game powered by Socket.io, MongoDB, & React.</p>
      </Container>
    )
  }
}

export default Home
