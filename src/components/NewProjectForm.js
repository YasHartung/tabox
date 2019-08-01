import React from 'react'
import { connect } from 'react-redux'
import { createProject } from '../actions'

import '../css/NewProjectForm.css'
import {  Modal } from 'react-bootstrap';

class NewProjectForm extends React.Component{
    state={
        name: ''
    }

    handleChange=(e)=>{
      
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
       
        return(
            <Modal id='new-proj-modal' show={this.props.formActive} onHide={this.props.toggleForm}>
                <h4 id='new-proj-banner'>Set Up a New Project</h4>
                <form id='new-proj-form'onSubmit={(e)=>{
                    e.preventDefault()
                    this.props.createProject({...this.state, user_id: this.props.currentUser.id})
                    this.setState({name: ''})
                    
                    this.props.toggleForm()

                }}>
                   
                        <label id="labelguy">Project Name:
                        <br></br>
                        <input id='new-proj-name' type="name" name="name" placeholder="Enter Name" onChange={this.handleChange}  value={this.state.name} />
                        </label>
                  
                    <br></br>
                    <button id="submit-new-proj-button" type="submit">
                    Add
                    </button>
                </form>
            </Modal>
        )
    }
}

function msp(state){
    
      return state
    }
    
   
  
  export default connect(msp, { createProject })(NewProjectForm);