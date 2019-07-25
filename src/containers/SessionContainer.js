import React from 'react'
import { connect } from 'react-redux'

import { updateCurrentUser, updateCurrentClient } from '../actions'

import {  Button, Table } from 'react-bootstrap';

class SessionContainer extends React.Component{

    restoreSession = (session) => {
     
        localStorage.setItem("chromeRestoreSession", session.tabs)
    }

   


    sessionTable = () => {
        return this.props.currentClient.sessions.slice(0,5).reverse()
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
                        this.sessionTable().map( session => {
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
                <Button variant='info' onClick={this.getSession}>Pull Chrome Session from Extension</Button>
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