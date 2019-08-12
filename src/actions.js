
 import { SET_CURRENT_USER, UPDATE_USERNAME_FORM, TOGGLE_DELETE_ALERT, SET_CURRENT_PROJECT,
    RESET_CURRENT_PROJECT } from './types'
     
     
     
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
          return {type: SET_CURRENT_PROJECT, payload: project}

      }
      function updateCurrentUser(user){
        return {type: SET_CURRENT_USER, payload: user}
      }

      function resetCurrentProject(){
          return {type: RESET_CURRENT_PROJECT}
      }

      function deleteSession(session){
        
          return function(dispatch){  
            fetch(`http://localhost:3000/sessions/${session.id}`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify(session)
            } ).then(r => r.json())
            .then(user => {
              console.log("after fetch session delete", user)
                dispatch({type: SET_CURRENT_USER, payload: user})
                }
            ).then(()=>{
              console.log("about to update current project")
              updateCurrentProject({id: session.project_id})
            })
              
           
          
        }
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
          resetCurrentProject,
          deleteSession
      }
  