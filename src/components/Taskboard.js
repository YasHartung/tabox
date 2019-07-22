import React from 'react'
import { connect } from 'react-redux'

import {deleteTaskboardAlert, addTask} from '../actions'

import { Icon } from 'semantic-ui-react'
import { ListGroup, Card, Form } from 'react-bootstrap';


class Taskboard extends React.Component{
    state={
        formActive: false,
        newTask: ""
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleClick=(e)=>{
       
        if(e.target.className === "add icon"){
            this.setState({formActive: true})
        }
        if(e.target.className === "close icon"){
            console.log("clicked")
            this.props.deleteTaskboardAlert(this.props.taskboard)
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        
        let task={
          content: this.state.newTask,
          taskboard: this.props.taskboard,
        }
        this.props.addTask(task)
        this.setState({newTask: ''})

    }
    render(){

        console.log("taskboard props",this.props)

    
        return(
            <Card style={{ width: '15rem' }}>
                <Card.Title xs={10}>
                {this.props.taskboard.name}
                <Icon  onClick={this.handleClick} name="close"/>
                </Card.Title>
                <ListGroup variant="flush">
                    {this.props.taskboard.tasks.map(task =>{
                        return <ListGroup.Item xs={10} >{task.content}</ListGroup.Item>
                    })}
                    
                    <ListGroup.Item xs={10} >
                        {this.state.formActive
                        ?
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group >
                                <Form.Control placeholder="New Task..." onChange={this.handleChange} name="newTask" value={this.state.newTask}/>
                            </Form.Group>
                        </Form>
                        :
                        <Icon  onClick={this.handleClick} name="add"/>}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}

function msp(state){
    return state
}

 export default connect(msp, { deleteTaskboardAlert, addTask })(Taskboard)