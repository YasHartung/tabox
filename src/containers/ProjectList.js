import React from 'react'
import { connect } from 'react-redux'

import {updateCurrentProject, resetCurrentProject} from '../actions'

import { ListGroup, Button } from 'react-bootstrap';


class ProjectList extends React.Component { 

    render(){
   
        return <div>
            
            <br></br>
            <br></br>
            {this.props.currentProject
            ?
            <Button onClick={this.props.resetCurrentProject} variant="outline-info"> My Dashboard</Button>
            :
            null
            }
            <br></br>
            <p>Project List</p>
            <ListGroup>
        
                {this.props.currentUser.projects.map(project => {
                 return   <ListGroup.Item onClick={()=> this.props.updateCurrentProject(project.id)} variant="info" key={project.id}>{project.name}</ListGroup.Item>
                })
            }
            </ListGroup>
        </div>
    }
}
function msp(state){
    return state
}

export default connect(msp, { updateCurrentProject, resetCurrentProject })(ProjectList)