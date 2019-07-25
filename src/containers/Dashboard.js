import React from 'react'
import { connect } from 'react-redux'

import ClientList from './ClientList'
import ClientDashboard from './ClientDashboard'
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import UserDashboard from './UserDashboard'
let interval = null

class Dashboard extends React.Component{
  state = {
    show: false,
    session: '',
    comment: ''
  }

  getSession = () => {
    console.log("interval")

    let urlStrings =  localStorage.getItem("chromeSaveSession")
   
    if(urlStrings){
      localStorage.clear()
      this.setState({show: true, session: urlStrings})   
    }
      
  }

  handleSubmit = () => {
    fetch(`http://localhost:3000/sessions`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({tabs: this.state.session, client_id: this.props.currentClient.id})
  } ).then(r => r.json())
  .then(user => {
          this.props.updateCurrentUser(user)
      }
  ).then( () => {
      this.props.updateCurrentClient(this.props.currentClient)
  })
  }

  checkForSession = () => {
     interval = setInterval(this.getSession, 300)
  }

  componentWillUnmount(){
    clearInterval(interval);
  }
  render(){
    console.log(this.state)
    this.checkForSession()
        return  (
          <>
          <Container>
            <Row>
              <Col>
              <h4>Welcome, {this.props.currentUser.username}. Here's {this.props.currentClient.id ? this.props.currentClient.name : "your"} Dashboard</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <ClientList/>
              </Col>
              <Col xs={9}>
                {
                  this.props.currentClient.id
                  ?
                  <ClientDashboard/>
                  :
                  <UserDashboard />
                }
                
              </Col>
             
            </Row>
            
          </Container>
          <Modal show={this.state.show} onHide={()=>console.log('onhide')}>
              <Modal.Body>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Name of the New Taskboard?</Form.Label>
                  <Form.Control type="title" placeholder="Enter Title" onChange={()=>console.log("onChange")} name="title" value={this.state.comment} />
              
              </Form.Group>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="info" onClick={()=>console.group("click")}>
                  Create Taskboard
              </Button>
              </Modal.Footer>
          </Modal>
          </>
        )
      }
}

function msp(state){
    return state
  }

  
  

export default connect(msp)(Dashboard);