import React from 'react'
import { connect } from 'react-redux'

import '../App.css';

import { login, updateUsernameForm} from '../actions'

function SignIn(props){
    
    
    return (
    <div className='sign-in' >
      <div className='sign-in-banner'>
        <h1>Welcome to Tabox</h1>
        <h3>Sign In or Sign Up</h3>
      </div>
      <div className='sign-in-form'>

      
        <form onSubmit={(e) => { e.preventDefault(); props.login(props.usernameForm)}}>

          <label for='username'>Username:</label>
          <input  id="username" placeholder=" Enter Username" onChange={(e) => props.updateUsernameForm(e.target.value)} name="username" value={props.usernameForm} />
      
     
        <button className='button' type="submit">
          Submit
        </button>
    
        </form>
      </div>
        
    </div>
    )
}
function msp(state){
  
    return state
  }
  
 

export default connect(msp, { login, updateUsernameForm})(SignIn);

