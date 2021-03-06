import React from 'react'
import { connect } from 'react-redux'
import '../css/Taskboard.css'
import {deleteTaskboardAlert, addTask, updateCurrentUser} from '../actions'

import { Icon } from 'semantic-ui-react'
import {  Card } from 'react-bootstrap';


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

    findUserTaskboards = () =>{
        return this.props.currentUser.taskboards.filter(taskboard =>  taskboard.project_id === null && taskboard.id !== this.props.taskboard.id)
    }

    clickedTask = (task) =>{
        
        this.setState({currentTask: task, selectedTaskboard: this.findUserTaskboards()[0].id})
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
            <Card  id="t-board">
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
                   
                 
                    <button id='complete-task'  onClick={()=>this.completeTask()} >Completed?</button>
                    </>
                    :

                <ul id='task-list' >
                    {this.props.taskboard.tasks.map(task =>{
                        return <li id='task' key={task.id} onClick={() => this.clickedTask(task)} xs={10} >{task.content}</li>
                    })}
                    
                    <li id='li-new-task' >
                        {this.state.formActive
                        ?
                        <form id='new-task-form'onSubmit={this.handleSubmit}>
                        
                                <input id='new-task-input'placeholder="New Task..." onChange={this.handleChange} name="newTask" value={this.state.newTask}/>
                          
                        </form>
                        :
                        <Icon id='new-task' onClick={this.handleClick} name="add"/>}
                    </li>
                </ul>
                    }
            </Card>
        )
    }
}

function msp(state){
    return state
}

 export default connect(msp, { deleteTaskboardAlert, addTask, updateCurrentUser })(Taskboard)