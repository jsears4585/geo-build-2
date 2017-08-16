import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Divider } from 'semantic-ui-react'

import '../index.css'

class HomePage extends React.Component {

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
            color="violet"
            onClick={this.joinRedirect}
          >
            Join
          </Button>
          <br />
          <Button
            className='bigButton'
            basic={true}
            onClick={this.createRedirect}
          >
            Create
          </Button>
        </div>
        <Divider />
        <p className="footerBlurb">An interactive geography game powered by React, MongoDB, Node.js, Mapbox GL, & Socket.io.</p>
      </Container>
    )
  }
}

export default HomePage
