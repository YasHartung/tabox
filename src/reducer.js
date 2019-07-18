import { SET_CURRENT_USER, UPDATE_USERNAME_FORM } from './types'


const defaultState = {
   currentUser: null,
   usernameForm: ""
   
  }

function reducer(prevState = defaultState, action){
  
  // console.log("STATE", prevState)
  // console.log("ACTION", action)
  // whatever is returned from this function (i.e. the reducer) BECOMES state
  switch(action.type){
    case SET_CURRENT_USER:
      return {...prevState, currentUser: action.payload}
    case UPDATE_USERNAME_FORM:
      return {...prevState, usernameForm: action.payload}
    default:
      return prevState
  }

}

export default reducer
