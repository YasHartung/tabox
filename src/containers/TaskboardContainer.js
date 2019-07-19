import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap';

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
        this.setState({show: false})
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    render(){
        console.log(this.state)
        return(
            <>
                <p>Taskboard's</p>
                <Taskboard/>
               
                <Button variant="info" onClick={this.handleShow}>
                    Add Taskboard
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>What would you like to call the new Taskboard?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="title" placeholder="Enter Title" onChange={this.handleChange} name="title" value={this.state.title} />
                    
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="info" onClick={this.handleClose}>
                        Create Taskboard
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default TaskboardContainer