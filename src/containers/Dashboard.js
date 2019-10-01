import React from 'react'
import { connect } from 'react-redux'

import { updateCurrentProject, updateCurrentUser } from '../actions'
import '../css/dashboard.css'

import logo from '../img/Yasmin-01.png';
import ProjectList from './ProjectList'
import ProjectDashboard from './ProjectDashboard'
import NewProjectForm from '../components/NewProjectForm'
import {  Modal, Form, Button } from 'react-bootstrap';
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

  
//Toggles the new project form
toggleForm=() =>{
    this.setState({formActive: !this.state.formActive})
}

//Grabs session from local storage. Set on an interval, it checks if a session has been saved by the extension.
  getSession = () => {
    let urlStrings =  localStorage.getItem("chromeSaveSession")
   
    if(urlStrings){
      localStorage.clear()
      this.setState({show: true, session: urlStrings})   
    }
      
  }
//Sends new session object to backend.
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
//sets interval for checking session
  checkForSession = () => {
     interval = setInterval(this.getSession, 300)
  }
//Hides "save session" modal
  handleHide = () => {
    this.setState({show: false, comment: ''})
  }

  handleChange=(e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  componentWillUnmount = ()=>{
    clearInterval(interval);
  }

  //Passes current project down to project dashboard
  findCurrentProject =()=>{
    
    return this.props.currentUser.projects.find(project => project.id === this.props.currentProject)
  }
  render(){
   
    this.checkForSession()
        return  (
          <div className="dashboard">
              <div id='logo-container'>
              <img id='logo-t' src={logo} alt="Logo" />
              </div>
              <h4 id="dashboard-banner">Dashboard</h4>
            
            
             
                <ProjectList id="project-list"  toggleForm={this.toggleForm}/>
             
                <div className='specific-dashboard'>

                { 
                  this.props.currentProject
                  ?
                  <ProjectDashboard findCurrentProject={this.findCurrentProject} />
                  :
                  <UserDashboard  />
                }
                {
                 this.state.formActive
                 ?
                 <NewProjectForm formActive={this.state.formActive} toggleForm={this.toggleForm}/>
                 :
                 null
                 }
                </div>
             
             
           
            
                 
          <Modal id='save-session-modal' show={this.state.show} onHide={this.handleHide}>
            <form id='save-session-form'>
              <Modal.Title>
                A Chrome Session Has Been Saved
              </Modal.Title>
             
               
                   
                    <input id='save-session-input' type="comment" placeholder="Enter Comment" onChange={this.handleChange} name="comment" value={this.state.comment} />
                  
                      <select id='save-session-select' name="project" onChange={this.handleChange} value={this.state.project}>
                        <option value='select'>Select a Project</option>
                        {this.props.currentUser.projects.map( project => {
                          return <option key={project.id} value={project.id}>{project.name}</option>
                        })}
                      </select>
                
               
           
             
                <button  id='save-session-btn'onClick={this.handleSubmit}>
                    Save Session
                </button>
              
            </form>
          </Modal>
          </div>
        )
      }
}

function msp(state){
    return state
  }

  
  

export default connect(msp, {updateCurrentUser, updateCurrentProject})(Dashboard);