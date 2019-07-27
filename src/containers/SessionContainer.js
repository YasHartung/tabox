import React from 'react'
import { connect } from 'react-redux'

import { updateCurrentUser, updateCurrentProject } from '../actions'

import {  Button, Table } from 'react-bootstrap';

class SessionContainer extends React.Component{

    restoreSession = (session) => {
     
        localStorage.setItem("chromeRestoreSession", session.tabs)
    }

   


    sessionTable = () => {
        console.log("sessionTable", this.props.currentProject.sessions )
        return this.props.currentProject.sessions.reverse()
    }

    render(){
        return(
            <>
            {this.props.currentProject.id
            ?
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    
                    <th>Session Created On</th>
                    <th>Comment</th>
                    <th>Restore Session</th>
                    <th>Delete Session</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                        this.sessionTable().map( session => {
                            return (
                                <tr key={session.id}>
                                    
                                    <td>{session.created_at.slice(0,10)}</td>
                                    <td>{session.comment}</td>
                                    <td><Button variant="info" size="sm" onClick={()=> this.restoreSession(session)}>Restore</Button></td>
                                    <td>X</td>
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
                this.props.currentProject.id
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
export default connect(msp, { updateCurrentUser, updateCurrentProject } )(SessionContainer)