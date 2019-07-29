import { SET_CURRENT_USER, UPDATE_USERNAME_FORM, TOGGLE_DELETE_ALERT, SET_CURRENT_PROJECT,  RESET_CURRENT_PROJECT } from './types'


const defaultState = {
   currentUser: null,
   usernameForm: "",
   deleteAlertTaskboard: false,
   currentTaskboard: null,
   currentProject:  null
   
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
    case TOGGLE_DELETE_ALERT:
      return{...prevState, currentTaskboard: action.payload, deleteAlertTaskboard: !prevState.deleteAlertTaskboard}
    case SET_CURRENT_PROJECT:
    
      return{...prevState, currentProject: action.payload}
    case RESET_CURRENT_PROJECT:
      return {...prevState, currentProject: null}
    default:
      return prevState
  }

}

export default reducer
