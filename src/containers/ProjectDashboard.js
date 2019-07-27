import React from 'react'
import { connect } from 'react-redux'

import {  Button } from 'react-bootstrap';

import { updateCurrentUser, resetCurrentProject} from '../actions'

import TaskboardContainer from './TaskboardContainer';
import SessionContainer from './SessionContainer'

class ProjectDashboard extends React.Component{

    handleClick = () => {
        fetch(`http://localhost:3000/projects/${this.props.currentProject.id}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({})
        } ).then(r => r.json())
        .then(user => {
            this.props.updateCurrentUser(user)
            }
        ).then(this.props.resetCurrentProject)
        
       
    }
    render(){
        return(
            <>
             <TaskboardContainer/>
            
             <SessionContainer />

             <Button variant="danger" onClick={this.handleClick}>Delete Project</Button>
           
            </>
        )
    }
}

function msp(state){
    return state
}

export default connect(msp, { updateCurrentUser, resetCurrentProject })(ProjectDashboard)