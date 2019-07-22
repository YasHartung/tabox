import React from 'react'
import { connect } from 'react-redux'
import { createClient } from '../actions'

import { Form, Button } from 'react-bootstrap';

class NewClientForm extends React.Component{
    state={
        name: '',
        email: '',
        phone: ''
    }

    handleChange=(e)=>{
        console.log(e.target.name)
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        console.log(this.state)
        return(
            <>
            <h4>Set Up a New Client</h4>
            <Form onSubmit={(e)=>{
                e.preventDefault()
                this.props.createClient({...this.state, user_id: this.props.currentUser.id})
                this.setState({name: '', email: '', phone: ''})
                
                this.props.toggleForm()

            }}>
                <Form.Group controlId="formName">
                    <Form.Label>Client Name:</Form.Label>
                    <Form.Control type="name" name="name" placeholder="Enter Name" onChange={this.handleChange}  value={this.state.name} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Client Email:</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" onChange={this.handleChange}  value={this.state.email} />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Client Phone Number:</Form.Label>
                    <Form.Control type="phone" name="phone" placeholder="Enter Phone Number" onChange={this.handleChange}  value={this.state.phone} />
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
    console.log(state)
      return state
    }
    
   
  
  export default connect(msp, { createClient })(NewClientForm);