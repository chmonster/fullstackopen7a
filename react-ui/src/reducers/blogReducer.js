/* eslint-disable no-debugger */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { userAddedBlog, userDeletedBlog, userBlogLiked, userBlogCommented } from './userReducer'
import { errorMessage } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const idToDelete = action.payload
      return state.filter(blog => idToDelete !== blog.id)
    },
    updateBlog (state, action) {
      const changedBlog = action.payload
      return state.map(blog =>
        blog.id !== changedBlog.id ? blog : changedBlog
      )
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, updateBlog, removeBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) =>  {
  return async dispatch => {
    let newBlog
    try {
      newBlog = await blogService.create(content)
    } catch(error) {
      dispatch(errorMessage(error.response.data.error))
    }
    const addedBlog = await blogService.get(newBlog.id)
    console.log('blogReducer createBlog', addedBlog)
    try {
      dispatch(appendBlog(addedBlog))
      dispatch(userAddedBlog(addedBlog))
    } catch(error) {
      dispatch(errorMessage(error.response.data.error))
    }
  }
}

export const deleteBlogById = id => {
  return async dispatch => {
    //debugger
    const blogToDelete = await blogService.get(id)
    //dispatch(userDeletedBlog(blogToDelete))
    await blogService.remove(id)
    dispatch(removeBlog(id))
    dispatch(userDeletedBlog(blogToDelete))
  }
}

export const incLikes = id => {
  return async dispatch => {
    const blog = await blogService.get(id)
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    const response = await blogService.update(id, updatedBlog)
    console.log('incLikes', response)
    dispatch(updateBlog(response))
    dispatch(userBlogLiked(updatedBlog))
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const sendObject = { 'comment': comment }
    const response = await blogService.comment(id, sendObject)
    console.log('addComment', response)
    dispatch(updateBlog(response))
    dispatch(userBlogCommented(response))
  }
}

export default blogSlice.reducer