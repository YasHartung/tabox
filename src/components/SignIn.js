import React from 'react'
import { connect } from 'react-redux'

import '../App.css';
import '../css/sign-in.css';
import logo from '../img/Yasmin-01.png';

import { login, updateUsernameForm} from '../actions'

function SignIn(props){
    
    
    return (
    <div  >
      <div id='top-sign-in'>
        <img id='logo-sign-in' src={logo} alt="Logo" />
        <h3 id='sign-in-prompt'>Sign In or Sign Up</h3>
      </div>
    

      
        <form id="submitform" onSubmit={(e) => { e.preventDefault(); props.login(props.usernameForm)}}>

            <input  id="username" placeholder=" Enter Username" onChange={(e) => props.updateUsernameForm(e.target.value)} name="username" value={props.usernameForm} />
         
          
     
          <button id='sign-in-button' type="submit">
            Submit
          </button>
    
        </form>
      
        
    </div>
    )
}
function msp(state){
  
    return state
  }
  
 

export default connect(msp, { login, updateUsernameForm})(SignIn);

