import React from 'react'
import { connect } from 'react-redux'

import { Form, Button, Jumbotron } from 'react-bootstrap';
import { login, updateUsernameForm} from '../actions'

function SignIn(props){
    
    
    return (
    <div >
      <Jumbotron>
        <h1>Welcome to Freer</h1>
        <h3>Sign In or Sign Up</h3>
      </Jumbotron>
      <Form onSubmit={(e) => {
        e.preventDefault()
        props.login(props.usernameForm)
        }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="username" placeholder="Enter Username" onChange={(e) => props.updateUsernameForm(e.target.value)} name="username" value={props.usernameForm} placeholder="Enter Username..."/>
      
        </Form.Group>
        <Button variant="info" type="submit">
          Submit
        </Button>
      </Form>
        
    </div>
    )
}
function msp(state){
  
    return state
  }
  
 

export default connect(msp, { login, updateUsernameForm})(SignIn);

