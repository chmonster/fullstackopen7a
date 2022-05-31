
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogDeleted, blogLiked, commentAdded, errorMessage } from '../reducers/notificationReducer'
import { incLikes, deleteBlogById, addComment } from '../reducers/blogReducer'

const Blog = () => {

  const [commentEntry, setComment] = useState('')
  const handleCommentChange = (event) => setComment(event.target.value)

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

  const doComment = (event) => {
    event.preventDefault()
    try {
      dispatch(addComment(id, commentEntry))
      dispatch(commentAdded(blog.title))
      setComment('')
    } catch (error) {
      console.log(error)
      dispatch(errorMessage(error.response.data.error))
    }
  }

  if (!blog) {
    return null
  }

  console.log(blog)

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
      {blog.comments.length && (
        <h2>Comments:</h2>
      )}
      {blog.comments && (
        blog.comments.map((comment, i) => (
          <ul key={i}>
            <li>{comment}</li>
          </ul>
        ))
      )}
      <form onSubmit={doComment}>
        <input
          id="comment"
          value={commentEntry}
          onChange={handleCommentChange}
          placeholder="comment?"
        />
        <button id="save-comment" type="submit">
          save
        </button>
      </form>
    </div>
  )
}

export default Blog
