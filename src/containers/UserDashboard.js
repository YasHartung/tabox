import React from 'react'
import { connect } from 'react-redux'

import '../css/UserDashboard.css'
import { Button } from 'react-bootstrap';

import TaskboardContainer from './TaskboardContainer';
import SessionContainer from './SessionContainer'



class UserDashboard extends React.Component{
  
 
    render(){
        return(
            <>
           
             
                 <>
                    <button id='add-project-button' onClick={this.toggleForm}   > Add a New Project</button> 
                    <TaskboardContainer/>
                    
                    <SessionContainer />
                </>
             
             
            </>
        )
    }
}


function msp(state){
      return state
    }
    
   
  
  export default connect(msp)(UserDashboard);