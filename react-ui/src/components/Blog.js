//import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogDeleted, blogLiked, errorMessage } from '../reducers/notificationReducer'
import { incLikes, deleteBlogById } from '../reducers/blogReducer'

const Blog = () => {
//  const [expand, setExpand] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.login)

  const deleteBlog = (blog) => {
    try {
      if (window.confirm(`Confirm removal of '${blog.title}'`)) {
        dispatch(deleteBlogById(blog.id))
        dispatch(blogDeleted(blog.title))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      dispatch(errorMessage(error.response.data.error, 'error'))
    }
  }

  const likeBlog = (blog) => {
    try {
      dispatch(incLikes(blog.id))
      dispatch(blogLiked(blog.title))
    } catch (error) {
      console.log(error)
      dispatch(errorMessage(error.response.data.error))
    }
  }

  console.log(blog.user.id)

  return (
    <div className='blog'>
      <h2>{blog.title}</h2>
      <a href={blog.url} title={blog.title}>
        {blog.url}
      </a><br />
      Posted by: <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link><br />
      Likes: {blog.likes}
      <button className="like" onClick={() => likeBlog(blog)}>
        like
      </button>
      {user && user.username === blog.user.username && (
        <button className="delete" onClick={() => deleteBlog(blog)}>
          delete
        </button>
      )}
    </div>
  )
}

export default Blog
