import React from 'react'
import { connect } from 'react-redux'

import LogContainer from './LogContainer'
import TaskboardContainer from './TaskboardContainer';
import SessionContainer from './SessionContainer'


function UserDashboard(props){
    return(
        <>
         <p>Welcome {props.currentUser.username}</p>
         <LogContainer />
         <TaskboardContainer/>
         <SessionContainer />
         
        </>
    )
}


function msp(state){
    console.log(state)
      return state
    }
    
   
  
  export default connect(msp)(UserDashboard);