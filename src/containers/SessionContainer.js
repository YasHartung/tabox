import React from 'react'
import { connect } from 'react-redux'

import {   deleteSession } from '../actions'

import '../css/SessionContainer.css'
import {  Button,  Modal } from 'react-bootstrap';

class SessionContainer extends React.Component{
    state={
        deleteSession: false,
        selectedSession: null
    }

    restoreSession = (session) => {
     
        localStorage.setItem("chromeRestoreSession", session.tabs)
    }

   

    //builds sessions table from current user. Orders them from last session to first.
    sessionTable = () => {
     
        return this.props.findCurrentProject().sessions.reverse()
    }

    //Toggles session delete alert
    toggleDeleteSession = (session) => {
    
        this.setState({deleteSession: !this.state.deleteSession, selectedSession: session})
    }
    
    //Deletes session through Actions file
    deleteSession = () => {
        this.props.deleteSession(this.state.selectedSession)
        this.toggleDeleteSession(null)
    }
    

    render(){
    
        return(
            <div id='session-container'>
            {this.props.currentProject
            ?
            <table id="session-table">
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
                                    <td><button className='restore-session-btn'  onClick={()=> this.restoreSession(session)}>Restore</button></td>
                                    <td><button className='delete-session-btn' onClick={() => this.toggleDeleteSession(session)}>X</button></td>
                                </tr>
                            )
                         })
                    }
              
                 </tbody>
            </table>
            
            :
            null
            }
          //Modal for delete sessions alert
                <Modal
                    id='delete-session-alert'
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
            
            
                
                </div>
        )
    }
}

function msp(state){
    
    return state
}
export default connect(msp, {   deleteSession } )(SessionContainer)