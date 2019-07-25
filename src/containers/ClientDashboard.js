import React from 'react'
import { connect } from 'react-redux'

import {  Button } from 'react-bootstrap';

import { updateCurrentUser, resetCurrentClient} from '../actions'

import TaskboardContainer from './TaskboardContainer';
import SessionContainer from './SessionContainer'

class ClientDashboard extends React.Component{

    handleClick = () => {
        fetch(`http://localhost:3000/clients/${this.props.currentClient.id}`, {
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
        ).then(this.props.resetCurrentClient)
        
       
    }
    render(){
        return(
            <>
             <TaskboardContainer/>
            
             <SessionContainer />

             <Button variant="danger" onClick={this.handleClick}>Delete Client</Button>
            <p>Contact {this.props.currentClient.name}: email: {this.props.currentClient.email}, tel: {this.props.currentClient.phone}</p>
            </>
        )
    }
}

function msp(state){
    return state
}

export default connect(msp, { updateCurrentUser, resetCurrentClient })(ClientDashboard)