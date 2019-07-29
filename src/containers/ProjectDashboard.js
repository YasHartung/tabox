import React from 'react'
import { connect } from 'react-redux'

import {  Button } from 'react-bootstrap';

import { updateCurrentUser, resetCurrentProject} from '../actions'

import TaskboardContainer from './TaskboardContainer';
import SessionContainer from './SessionContainer'

class ProjectDashboard extends React.Component{

    handleClick = () => {
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
        
       
    }
    render(){
        return(
            <>
             <TaskboardContainer findCurrentProject={this.props.findCurrentProject}/>
            
             <SessionContainer findCurrentProject={this.props.findCurrentProject}/>

             <Button variant="danger" onClick={this.handleClick}>Delete Project</Button>
           
            </>
        )
    }
}

function msp(state){
    return state
}

export default connect(msp, { updateCurrentUser, resetCurrentProject })(ProjectDashboard)