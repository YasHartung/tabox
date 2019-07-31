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
        }).then(() => this.setState({show: false}))
        
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
                
               
                
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name of the New Taskboard?</Form.Label>
                        <Form.Control type="title" placeholder="Enter Title" onChange={this.handleChange} name="title" value={this.state.title} />
                    
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="info" onClick={this.handleClose}>
                        Create Taskboard
                    </Button>
                    </Modal.Footer>
                </Modal>
                {
                    this.props.currentTaskboard
                    ?

                    <Modal
                    size="sm"
                    show={this.props.deleteAlertTaskboard}
                    onHide={this.props.deleteTaskboardAlert}
                    aria-labelledby="example-modal-sizes-title-sm"
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Are you sure you want to delete the {this.props.currentTaskboard.name} taskboard?
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={() => this.props.deleteTaskboard(this.props.currentTaskboard)}variant="info">Delete Taskboard</Button>
                    </Modal.Body>
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