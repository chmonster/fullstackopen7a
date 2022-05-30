import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
//import { useSelector } from 'react-redux'
import { errorMessage, userLoggedIn, userLoggedOut } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    logoutUser(state, action) {
      return null
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions

export const handleLogin = (credentials) => {
  return async dispatch => {
    console.log('logging in ', credentials.username)
    try {
      const user = await loginService.login(credentials)
      //console.log(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      dispatch(userLoggedIn(user.name))
    } catch (error) {
      dispatch(errorMessage('Wrong credentials'))
      console.log('login error', error)
    }
  }
}

export const handleLogout = () => {
  //const user = useSelector(state => state.user)
  return async dispatch => {
    const user = window.localStorage.getItem('loggedBlogappUser')
    console.log('logging out ', user.username)
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      dispatch(logoutUser())
      dispatch(userLoggedOut(user.username))
    } catch (error) {
      console.log('logout error', error)
      dispatch(errorMessage(error.message))
    }
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        const loggedUser = JSON.parse(loggedUserJSON)
        console.log('initializeUser', loggedUser)
        blogService.setToken(loggedUser.token)
        dispatch(loginUser(loggedUser))
      } catch(error) {
        console.log('initializeUser error', error)
      }
    }
  }
}

export default userSlice.reducer