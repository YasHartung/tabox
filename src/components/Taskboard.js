import React from 'react'
import { connect } from 'react-redux'

import {deleteTaskboardAlert, addTask, updateCurrentUser} from '../actions'

import { Icon } from 'semantic-ui-react'
import { ListGroup, Card, Form, Button } from 'react-bootstrap';


class Taskboard extends React.Component{
    state={
        formActive: false,
        newTask: "",
        currentTask: null,
        selectedTaskboard: null
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleClick=(e)=>{
       
        if(e.target.className === "add icon"){
            this.setState({formActive: true})
        }
        if(e.target.className === "close icon"){
          
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

    clickedTask = (task) =>{
        
        this.setState({currentTask: task})
    }

    completeTask = () =>{
        fetch(`http://localhost:3000/tasks/${this.state.currentTask.id}`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify(this.state.currentTask)
            } ).then(r => r.json())
            .then(user => {
                console.log("user after deleted task", user)
                this.props.updateCurrentUser(user)
                }
            ).then(this.setState({currentTask: null}))
        }

    addTaskToBoard = (e) =>{
        e.preventDefault()
     
        let task ={
            task_id: this.state.currentTask.id,
            taskboard_id: this.state.selectedTaskboard
        }
        fetch(`http://localhost:3000/tasks/${this.state.currentTask.id}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(task)
        }).then(r => r.json())
        .then(user => {
            this.props.updateCurrentUser(user)
        }).then(() => this.setState({currentTask: null, selectedTaskboard: null}))
        
    }
    
    
    handleSelected = (e) => {
       
        this.setState({selectedTaskboard: e.target.value})
    }

    render(){

      

    
        return(
            <Card style={{ width: '15rem' }}>
                <Card.Title xs={10}>
                {this.props.taskboard.name}
                <Icon  onClick={this.handleClick} name="close"/>
                </Card.Title>
                {
                    this.state.currentTask 
                    ?
                    <>
                    <Card.Text>
                     {this.state.currentTask.content}
                    </Card.Text>
                   
                    <Form onSubmit={this.addTaskToBoard}>
                        <Form.Group onSubmit={this.addTaskToBoard} controlId="exampleForm.ControlSelect1">
                            <Form.Label>Add To Another Taskboard?</Form.Label>
                            <Form.Control onChange={this.handleSelected} value={this.state.selectedTaskboard} as="select">
                                {this.props.currentUser.taskboards.filter(taskboard =>  taskboard.project_id === null && taskboard.id !== this.props.taskboard.id).map(taskboard => {
                                    return  <option value={taskboard.id} key={taskboard.id}>{taskboard.name}</option>
                                })}
                            
                            </Form.Control>
                            <Button variant="info" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                    <Button variant="outline-info" onClick={()=>this.completeTask()} >Completed?</Button>
                    </>
                    :

                <ListGroup variant="flush">
                    {this.props.taskboard.tasks.map(task =>{
                        return <ListGroup.Item key={task.id} onClick={() => this.clickedTask(task)} xs={10} >{task.content}</ListGroup.Item>
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
                    }
            </Card>
        )
    }
}

function msp(state){
    return state
}

 export default connect(msp, { deleteTaskboardAlert, addTask, updateCurrentUser })(Taskboard)