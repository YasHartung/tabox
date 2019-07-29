import React from 'react'
import { connect } from 'react-redux'

import {   deleteSession } from '../actions'

import {  Button, Table, Modal } from 'react-bootstrap';

class SessionContainer extends React.Component{
    state={
        deleteSession: false,
        selectedSession: null
    }

    restoreSession = (session) => {
     
        localStorage.setItem("chromeRestoreSession", session.tabs)
    }

   


    sessionTable = () => {
     
        return this.props.findCurrentProject().sessions.reverse()
    }


    toggleDeleteSession = (session) => {
    
        this.setState({deleteSession: !this.state.deleteSession, selectedSession: session})
    }
    
    deleteSession = () => {
        this.props.deleteSession(this.state.selectedSession)
        this.toggleDeleteSession(null)
    }
    

    render(){
    
        return(
            <>
            {this.props.currentProject
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
                                    <td><button onClick={() => this.toggleDeleteSession(session)}>X</button></td>
                                </tr>
                            )
                         })
                    }
              
                </tbody>
            </Table>
            
            :
            null
            }
          
                <Modal
                    size="sm"
                    show={this.state.deleteSession}
                    onHide={()=>this.toggleDeleteSession(null)}
                    aria-labelledby="example-modal-sizes-title-sm"
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Are you sure you want to delete this session?
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={this.deleteSession}variant="info">Delete Session</Button>
                    </Modal.Body>
                </Modal>
            
            
                
            </>
        )
    }
}

function msp(state){
    
    return state
}
export default connect(msp, {   deleteSession } )(SessionContainer)