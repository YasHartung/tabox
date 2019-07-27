import React from 'react'
import { connect } from 'react-redux'
import { createProject } from '../actions'

import { Form, Button } from 'react-bootstrap';

class NewProjectForm extends React.Component{
    state={
        name: ''
    }

    handleChange=(e)=>{
      
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
       
        return(
            <>
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
            </>
        )
    }
}

function msp(state){
    
      return state
    }
    
   
  
  export default connect(msp, { createProject })(NewProjectForm);