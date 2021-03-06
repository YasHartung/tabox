import React from 'react'
import { connect } from 'react-redux'

import {updateCurrentProject, resetCurrentProject} from '../actions'
import '../css/project-list.css'




class ProjectList extends React.Component { 

    render(){
   
        return <div>
            
        
           
            <br></br>
            
            <ul >
                {this.props.currentProject
                ?
                <li  onClick={this.props.resetCurrentProject} > My Dashboard</li>
                :
                <li className='active' onClick={this.props.resetCurrentProject} > My Dashboard</li>
                }
                {this.props.currentUser.projects.map(project => {
                    if(this.props.currentProject === project.id){
                        return   <li className='active' onClick={()=> this.props.updateCurrentProject(project.id)} key={project.id}>{project.name}</li>
                    }else{
                        return   <li onClick={()=> this.props.updateCurrentProject(project.id)} key={project.id}>{project.name}</li>
                    }
                     })
                 }
                <li id='add-project-button' onClick={this.props.toggleForm}> + </li>
            </ul>
        </div>
    }
}
function msp(state){
    return state
}

export default connect(msp, { updateCurrentProject, resetCurrentProject })(ProjectList)