
 import { SET_CURRENT_USER, UPDATE_USERNAME_FORM } from './types'
     
     
     
     function updateUsernameForm(user){
        return {type: UPDATE_USERNAME_FORM, payload: user}
     }
     function login(username){
        return function(dispatch){  
            
            console.log("before fetch", username)
            fetch("http://localhost:3000/login", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({username: username})
            } ).then(r => r.json())
            .then(user => {
                console.log("then",  user)
                dispatch({type: SET_CURRENT_USER, payload: user})
                }
            )
        }
        
      }


      export {
          login,
          updateUsernameForm
      }
  