import { createSlice } from '@reduxjs/toolkit'

const initialState = [null, null]

let timeoutID = null
const duration = 5

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    doConfirm(state, action) {
      const message = action.payload
      return [message, 'confirm']
    },
    doError(state, action) {
      const message = action.payload
      return [message, 'error']
    },
    clearOnTimeout(){
      return [null, null]
    }
  },
})

export const { doConfirm, doError, clearOnTimeout } = notificationSlice.actions

export const userLoggedIn = (username) =>  {
  return dispatch => {
    dispatch(doConfirm(`${username} logged in`))
    if(timeoutID){
      console.log('timeoutID', timeoutID)
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(clearOnTimeout())
    }, duration*1000)
  }
}

export const userLoggedOut = (username) =>  {
  return dispatch => {
    dispatch(doConfirm(`${username} logged out`))
    if(timeoutID){
      console.log('timeoutID', timeoutID)
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(clearOnTimeout())
    }, duration*1000)
  }
}

export const blogLiked = (title) =>  {
  return dispatch => {
    dispatch(doConfirm(`You liked '${title}'`))
    if(timeoutID){
      console.log('timeoutID', timeoutID)
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(clearOnTimeout())
    }, duration*1000)
  }
}

export const blogDeleted = (title) =>  {
  return dispatch => {
    dispatch(doConfirm(`You deleted '${title}'`))
    if(timeoutID){
      console.log('timeoutID', timeoutID)
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(clearOnTimeout())
    }, duration*1000)
  }
}

export const blogCreated = (title) =>  {
  return dispatch => {
    dispatch(doConfirm(`'${title}' created`))
    if(timeoutID){
      console.log('timeoutID', timeoutID)
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(clearOnTimeout())
    }, duration*1000)
  }
}

export const errorMessage = (message) =>  {
  return dispatch => {
    dispatch(doError(`Error: ${message}`))
    if(timeoutID){
      console.log('timeoutID', timeoutID)
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(clearOnTimeout())
    }, duration*1000)
  }
}


export default notificationSlice.reducer