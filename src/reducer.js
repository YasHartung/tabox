const defaultState = {
   currentUser: null
  }

function reducer(prevState = defaultState, action){
  // console.log("STATE", prevState)
  // console.log("ACTION", action)
  // whatever is returned from this function (i.e. the reducer) BECOMES state
  switch(action.type){
    case "INCREMENT_LIKES":
      return {...prevState, likes: prevState.likes + 1}
  
    default:
      return prevState
  }

}

export default reducer
