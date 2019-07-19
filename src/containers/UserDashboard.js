import React from 'react'
import { connect } from 'react-redux'
import { openClientForm } from '../actions'

import { Button } from 'react-bootstrap';

import LogContainer from './LogContainer'
import TaskboardContainer from './TaskboardContainer';
import SessionContainer from './SessionContainer'
import NewClientForm from '../components/NewClientForm'


class UserDashboard extends React.Component{
    state={
        formActive: false
       
    }

    toggleForm=() =>{
        this.setState({formActive: !this.state.formActive})
    }
 
    render(){
        console.log(this.state)
        return(
            <>
           
             {
                 this.state.formActive
                 ?
                 <NewClientForm toggleForm={this.toggleForm}/>
                 :
                 <>
                    <Button onClick={this.toggleForm} variant="outline-info" size="sm" className='float-right'> Add a New Client</Button> <br></br><br></br>
                    <TaskboardContainer/>
                    <LogContainer />
                    <SessionContainer />
                </>
             }
             
            </>
        )
    }
}


function msp(state){
    console.log(state)
      return state
    }
    
   
  
  export default connect(msp)(UserDashboard);