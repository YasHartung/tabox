
 import { SET_CURRENT_USER, UPDATE_USERNAME_FORM, TOGGLE_DELETE_ALERT, SET_CURRENT_CLIENT } from './types'
     
     
     
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
      function createClient(client){
        return function(dispatch){  
            fetch("http://localhost:3000/clients", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(client)
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
        console.log("reached add task action")
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


      export {
          login,
          updateUsernameForm,
          createClient,
          deleteTaskboardAlert,
          deleteTaskboard,
          addTask
      }
  