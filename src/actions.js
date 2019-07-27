
 import { SET_CURRENT_USER, UPDATE_USERNAME_FORM, TOGGLE_DELETE_ALERT, SET_CURRENT_PROJECT,
    RESET_CURRENT_PROJECT, UPDATE_CURRENT_PROJECT } from './types'
     
     
     
     function updateUsernameForm(user){
        return {type: UPDATE_USERNAME_FORM, payload: user}
     }
     function login(username){
         
        return function(dispatch){  
            fetch("http://localhost:3000/login", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({username: username})
            } ).then(r => r.json())
            .then(user => {
             
                dispatch({type: SET_CURRENT_USER, payload: user})
                }
            )
        }
        
      }
      function createProject(project){
        return function(dispatch){  
            fetch("http://localhost:3000/projects", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(project)
            } ).then(r => r.json())
            .then(user => {
                dispatch({type: SET_CURRENT_USER, payload: user})
                }
            )
        }
        
      }

      function deleteTaskboardAlert(taskboard){
          return {type: TOGGLE_DELETE_ALERT, payload: taskboard}
      }

      function deleteTaskboard(taskboard){
         
        return function(dispatch){  
            fetch(`http://localhost:3000/taskboards/${taskboard.id}`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify(taskboard)
            } ).then(r => r.json())
            .then(user => {
                dispatch({type: SET_CURRENT_USER, payload: user})
                }
            )
            dispatch({type: TOGGLE_DELETE_ALERT, payload: null})
           
        }
      }

      function addTask(task){
     
        return function(dispatch){  
            fetch(`http://localhost:3000/tasks`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(task)
            } ).then(r => r.json())
            .then(user => {
                dispatch({type: SET_CURRENT_USER, payload: user})
                }
            )
            dispatch({type: TOGGLE_DELETE_ALERT, payload: null})
           
        }
      }

      function updateCurrentProject(project){
          console.log("reached update current project action")
          return function(dispatch){
            fetch(`http://localhost:3000/projects/${project.id}`) 
           .then(r => r.json())
            .then(project => {
                
                dispatch({type: SET_CURRENT_PROJECT, payload: project})
                }
            )
          }

      }
      function updateCurrentUser(user){
          
        return {type: SET_CURRENT_USER, payload: user}
      }

      function resetCurrentProject(){
          return {type: RESET_CURRENT_PROJECT}
      }


      export {
          login,
          updateUsernameForm,
          createProject,
          deleteTaskboardAlert,
          deleteTaskboard,
          addTask,
          updateCurrentProject,
          updateCurrentUser,
          resetCurrentProject
      }
  