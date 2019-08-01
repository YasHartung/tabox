import React from 'react'
import { connect } from 'react-redux'
import '../css/TaskboardContainer.css'
import { Modal, Button, Form } from 'react-bootstrap';


import {deleteTaskboardAlert, deleteTaskboard, updateCurrentUser} from '../actions'
import Taskboard from '../components/Taskboard'

class TaskboardContainer extends React.Component{
    state={
        show: false,
        title: ""
    }
    handleShow = () => {
        this.setState({show: true})
    }
    handleClose = () => {

        let taskboard={
            name: this.state.title,
            user_id: this.props.currentUser.id,
            project_id: this.props.currentProject
            
        }
        
        fetch("http://localhost:3000/taskboards", {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(taskboard)
        }).then(r => r.json())
        .then(user => {
            this.props.updateCurrentUser(user)
        }).then(() => this.setState({show: false, title: ''}))
        
    }
    handleChange = (e) => {
       
        this.setState({[e.target.name]: e.target.value})
    }


    render(){
        

        return(
            <div id="taskboard-container">
                <Button id="add-board" variant="info" onClick={this.handleShow}>
                    +
                </Button>
                {
                    this.props.currentUser.taskboards
                    ?
                    this.props.currentUser.taskboards.filter(taskboard =>  this.props.currentProject === taskboard.project_id).map(taskboard => {
                        return  <Taskboard key={taskboard.id} taskboard={taskboard}/>
                    })
                    :
                    null
                }
                
               
                
                <Modal id='create-tb-modal' show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label id='title-label'>Title of the New Taskboard?</Form.Label>
                        <Form.Control type="title" placeholder="Enter Title" onChange={this.handleChange} name="title" value={this.state.title} />
                    
                    </Form.Group>
                    </Modal.Body>
                  
                    <button id='modal-button-create' onClick={this.handleClose}>
                        Create
                    </button>
                 
                </Modal>
                {
                    this.props.currentTaskboard
                    ?

                    <Modal
                    id='delete-tb-alert'
                    show={this.props.deleteAlertTaskboard}
                    onHide={this.props.deleteTaskboardAlert}
                    
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Are you sure you want to delete the {this.props.currentTaskboard.name} taskboard?
                    </Modal.Title>
                    </Modal.Header>
                    <div className='button-container'>
                        <button id='modal-button-delete' onClick={() => this.props.deleteTaskboard(this.props.currentTaskboard)}variant="info">Delete</button>
                    </div>
                </Modal>
                :
                null
                }
              
            </div>
        )
    }
}
function msp(state){
    return state
}

export default connect(msp, { deleteTaskboardAlert, deleteTaskboard, updateCurrentUser })(TaskboardContainer)