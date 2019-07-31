import React from 'react'
import { connect } from 'react-redux'


import '../css/ProjectDashboard.css'
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
           
            </div>
        )
    }
}

function msp(state){
    return state
}

export default connect(msp, { updateCurrentUser, resetCurrentProject })(ProjectDashboard)