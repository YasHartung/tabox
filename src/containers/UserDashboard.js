import React from 'react'
import { connect } from 'react-redux'

import '../css/UserDashboard.css'


import TaskboardContainer from './TaskboardContainer';




class UserDashboard extends React.Component{
  
 
    render(){

        return(
            <div>
           
                    <TaskboardContainer/>
                    
            </div>
        )
    }
}


function msp(state){
      return state
    }
    
   
  
  export default connect(msp)(UserDashboard);