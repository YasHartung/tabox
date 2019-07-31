import React from 'react'
import { connect } from 'react-redux'

import { updateCurrentProject, updateCurrentUser } from '../actions'
import '../css/dashboard.css'

import ProjectList from './ProjectList'
import ProjectDashboard from './ProjectDashboard'
import NewProjectForm from '../components/NewProjectForm'
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import UserDashboard from './UserDashboard'
let interval = null

class Dashboard extends React.Component{
  state = {
    show: false,
    session: '',
    comment: '',
    project: 'select',
    formActive: false
  }

  

toggleForm=() =>{
    this.setState({formActive: !this.state.formActive})
}

  getSession = () => {
    let urlStrings =  localStorage.getItem("chromeSaveSession")
   
    if(urlStrings){
      localStorage.clear()
      this.setState({show: true, session: urlStrings})   
    }
      
  }

  handleSubmit = (e) => {
      e.preventDefault()
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
          if(this.props.currentProject){

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

  componentWillUnmount = ()=>{
    clearInterval(interval);
  }

  findCurrentProject =()=>{
    
    return this.props.currentUser.projects.find(project => project.id === this.props.currentProject)
  }
  render(){
    console.log(this.state)
    this.checkForSession()
        return  (
          <div className="dashboard">
          
              <h4 id="dashboard-banner">Welcome, {this.props.currentUser.username}. Here's {this.props.currentProject ? this.findCurrentProject().name : "your"} Dashboard</h4>
            
            
             
                <ProjectList id="project-list"  toggleForm={this.toggleForm}/>
             
                <div className='specific-dashboard'>

                {
                  this.props.currentProject
                  ?
                  <ProjectDashboard findCurrentProject={this.findCurrentProject} />
                  :
                  <UserDashboard findCurrentProject={this.findCurrentProject} />
                }
                {
                 this.state.formActive
                 ?
                 <NewProjectForm formActive={this.state.formActive} toggleForm={this.toggleForm}/>
                 :
                 null
                 }
                </div>
             
             
           
            
        
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
          </div>
        )
      }
}

function msp(state){
    return state
  }

  
  

export default connect(msp, {updateCurrentUser, updateCurrentProject})(Dashboard);