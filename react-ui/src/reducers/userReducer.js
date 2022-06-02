import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    appendUser(state, action) {
      state.push(action.payload)
    },
    setUsers(state, action) {
      return action.payload
    },
    updateUser(state, action) {
      const changedUser = action.payload
      return state.map(user =>
        user.id !== changedUser.id ? user : changedUser
      )
    }
  }
})

export const { appendUser, setUsers, updateUser } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const createUser = (username, name, password) =>  {
  return async dispatch => {
    const newUser = await userService.create({
      username, name, password
    })
    const addedUser = await userService.get(newUser.id)
    console.log('userReducer createUser', addedUser)
    dispatch(appendUser(addedUser))
  }
}

export const userDeletedBlog = (blogDeleted) => {
  return async dispatch => {
    const updatedUser = await userService.get(blogDeleted.user.id)
    //    console.log(updatedUser)
    dispatch(updateUser(updatedUser))
  }
}

export const userBlogLiked = (blogLiked) => {
  return async dispatch => {
    const updatedUser = await userService.get(blogLiked.user.id)
    //    console.log(updatedUser)
    dispatch(updateUser(updatedUser))
  }
}

export const userBlogCommented = (blogCommented) => {
  return async dispatch => {
    const updatedUser = await userService.get(blogCommented.user.id)
    //    console.log(updatedUser)
    dispatch(updateUser(updatedUser))
  }
}

export const userAddedBlog = (blogAdded) => {
  return async dispatch => {
    //    console.log('userAddedBlog', blogAdded)
    const updatedUser = await userService.get(blogAdded.user.id)
    //    console.log(updatedUser)
    dispatch(updateUser(updatedUser))
  }
}

export default userSlice.reducer