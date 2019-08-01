import React from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'react-bootstrap';
import '../css/ProjectDashboard.css'
import { updateCurrentUser, resetCurrentProject} from '../actions'

import TaskboardContainer from './TaskboardContainer';
import SessionContainer from './SessionContainer'

class ProjectDashboard extends React.Component{
    state={
        deleteProject: false
    }

    toggleDeleteProject = () => {
        this.setState({deleteProject: !this.state.deleteProject})
    }
    handleClick = () => {
        this.toggleDeleteProject()
    }

    deleteProject = () => {
        console.log("delete project")
        fetch(`http://localhost:3000/projects/${this.props.currentProject}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({})
        } ).then(r => r.json())
        .then(user => {
            this.props.resetCurrentProject()
            this.props.updateCurrentUser(user)
            }
        )
        this.toggleDeleteProject()
        
       
    }
    render(){
        return(
            <div >
             <TaskboardContainer findCurrentProject={this.props.findCurrentProject}/>
             {
                       this.props.findCurrentProject() && this.props.findCurrentProject().sessions.length > 0
                       ?
                       <SessionContainer findCurrentProject={this.props.findCurrentProject}/>
                        :
                        null
                    }
           

             <button id='delete-proj-btn' onClick={this.handleClick}>Delete Project</button>


             <Modal
                    id='delete-session-alert'
                    show={this.state.deleteProject}
                    onHide={this.toggleDeleteProject}
                    aria-labelledby="example-modal-sizes-title-sm"
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Are you sure you want to delete this project?
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={this.deleteProject}variant="info">Delete Project</Button>
                    </Modal.Body>
                </Modal>
           
            </div>
        )
    }
}

function msp(state){
    return state
}

export default connect(msp, { updateCurrentUser, resetCurrentProject })(ProjectDashboard)