import React from 'react'
import { connect } from 'react-redux'

import {  Button } from 'react-bootstrap';

import { updateCurrentUser, resetCurrentClient} from '../actions'
import LogContainer from './LogContainer'
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
             <LogContainer />
             <SessionContainer />

             <Button variant="danger" onClick={this.handleClick}>Delete Client</Button>
            </>
        )
    }
}

function msp(state){
    return state
}

export default connect(msp, { updateCurrentUser, resetCurrentClient })(ClientDashboard)