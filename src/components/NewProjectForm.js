import React from 'react'
import { connect } from 'react-redux'
import { createProject } from '../actions'

import { Form, Button, Modal } from 'react-bootstrap';

class NewProjectForm extends React.Component{
    state={
        name: ''
    }

    handleChange=(e)=>{
      
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
       
        return(
            <Modal show={this.props.formActive} onHide={this.props.toggleForm}>
                <h4>Set Up a New Project</h4>
                <Form onSubmit={(e)=>{
                    e.preventDefault()
                    this.props.createProject({...this.state, user_id: this.props.currentUser.id})
                    this.setState({name: ''})
                    
                    this.props.toggleForm()

                }}>
                    <Form.Group controlId="formName">
                        <Form.Label>Project Name:</Form.Label>
                        <Form.Control type="name" name="name" placeholder="Enter Name" onChange={this.handleChange}  value={this.state.name} />
                    </Form.Group>
                
                    <Button variant="info" type="submit">
                    Submit
                    </Button>
                </Form>
            </Modal>
        )
    }
}

function msp(state){
    
      return state
    }
    
   
  
  export default connect(msp, { createProject })(NewProjectForm);