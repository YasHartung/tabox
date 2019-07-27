import React from 'react'
import { connect } from 'react-redux'

import { updateCurrentProject, updateCurrentUser } from '../actions'

import ProjectList from './ProjectList'
import ProjectDashboard from './ProjectDashboard'
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import UserDashboard from './UserDashboard'
let interval = null

class Dashboard extends React.Component{
  state = {
    show: false,
    session: '',
    comment: '',
    project: 'select'
  }

  getSession = () => {
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
      body: JSON.stringify({tabs: this.state.session, project_id: this.state.project, comment: this.state.comment})
  } ).then(r => r.json())
  .then(user => {
          this.props.updateCurrentUser(user)
      }
  ).then( () => {
    if(this.props.currentProject.id){

      this.props.updateCurrentProject(this.props.currentProject)
    }
  })
      this.handleHide()
  }

  checkForSession = () => {
     interval = setInterval(this.getSession, 300)
  }

  handleHide = () => {
    this.setState({show: false})
  }
  handleChange=(e) => {
    this.setState({[e.target.name]: e.target.value})
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
              <h4>Welcome, {this.props.currentUser.username}. Here's {this.props.currentProject.id ? this.props.currentProject.name : "your"} Dashboard</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <ProjectList/>
              </Col>
              <Col xs={9}>
                {
                  this.props.currentProject.id
                  ?
                  <ProjectDashboard/>
                  :
                  <UserDashboard />
                }
                
              </Col>
             
            </Row>
            
          </Container>
          <Modal show={this.state.show} onHide={this.handleHide}>
            <Form>
              <Modal.Title>
                A Chrome Session Has Been Saved
              </Modal.Title>
              <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Add a Comment to this Session?</Form.Label>
                    <Form.Control type="comment" placeholder="Enter Comment" onChange={this.handleChange} name="comment" value={this.state.comment} />
                    <Form.Label>Add Session to a Project?</Form.Label>
                      <select name="project" onChange={this.handleChange} value={this.state.project}>
                        <option value='select'>Select a Project</option>
                        {this.props.currentUser.projects.map( project => {
                          return <option key={project.id} value={project.id}>{project.name}</option>
                        })}
                      </select>
                
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="info" onClick={this.handleSubmit}>
                    Save Session
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          </>
        )
      }
}

function msp(state){
    return state
  }

  
  

export default connect(msp, {updateCurrentUser, updateCurrentProject})(Dashboard);