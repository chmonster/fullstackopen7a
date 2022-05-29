import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    const newBlog = await blogService.create(content)
    const addedBlog = await blogService.get(newBlog.id)
    console.log('blogReducer createBlog', addedBlog)
    dispatch(appendBlog(addedBlog))
  }
}

export const deleteBlogById = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const incLikes = id => {
  return async dispatch => {
    console.log('incLikes', id)
    const blog = await blogService.get(id)
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    const response = await blogService.update(id, updatedBlog)
    dispatch(updateBlog(response))
  }
}

export default blogSlice.reducer