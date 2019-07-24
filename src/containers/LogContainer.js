import React from 'react'


import {  Button, Modal, Form } from 'react-bootstrap';

class LogContainer extends React.Component{
    state ={
        show: false,
        started: null, 
        date: new Date()
    }
    handleChange = (date) => {
        this.setState({date: date})
    }
    handleClose = () => {
        this.setState({show: false})
    }

    handleClick = () => {
        this.setState({show: true})
    }

    render(){
        return(
            <>
                <p>LogContainer</p>
                 <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>New Log Entry</Form.Label>
                       
                    
                    </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="info" onClick={this.handleClose}>
                        Add Log Entry
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                <Button onClick={this.handleClick} variant="info">Add Log Entry</Button>
            </>
        )
    }
}

export default LogContainer