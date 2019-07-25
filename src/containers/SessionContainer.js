import React from 'react'
import { connect } from 'react-redux'

import { updateCurrentUser, updateCurrentClient } from '../actions'

import {  Button, Table } from 'react-bootstrap';

class SessionContainer extends React.Component{

    restoreSession = (session) => {
        console.log("session from react",session)
        localStorage.setItem("chromeRestoreSession", session.tabs)
    }

    getSession = () => {
      let urlStrings =  localStorage.getItem("chromeSaveSession")
      console.log("FROM REACT!!!",urlStrings)
      console.log("lenght", urlStrings.length)

      fetch(`http://localhost:3000/sessions`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({tabs: urlStrings, client_id: this.props.currentClient.id})
        } ).then(r => r.json())
        .then(user => {
                this.props.updateCurrentUser(user)
            }
        ).then( () => {
            this.props.updateCurrentClient(this.props.currentClient)
        })
        

    }

    render(){
        return(
            <>
            {this.props.currentClient.id
            ?
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Session Created On</th>
                    <th>Restore Session</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.currentClient.sessions.map( session => {
                            return (
                                <tr key={session.id}>
                                    <td>1</td>
                                    <td>{session.created_at.slice(0,10)}</td>
                                    <td><Button variant="info" size="sm" onClick={()=> this.restoreSession(session)}>Restore</Button></td>
                                
                                </tr>
                            )
                         })
                    }
              
                </tbody>
            </Table>
            
            :
            null
            }
            {
                this.props.currentClient.id
                ?
                <Button variant='info' onClick={this.getSession}>Pull Chrome Session from Container</Button>
                :
                null
            }
                
            </>
        )
    }
}

function msp(state){
    console.log("Session container state", state)
    return state
}
export default connect(msp, { updateCurrentUser, updateCurrentClient } )(SessionContainer)