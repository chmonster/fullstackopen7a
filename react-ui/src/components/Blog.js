import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlogById, incLikes } from '../reducers/blogReducer'
import { blogDeleted, blogLiked, errorMessage } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const [expand, setExpand] = useState(false)
  const dispatch = useDispatch()

  const toggleExpand = () => {
    setExpand(!expand)
  }
  const buttonText = expand ? 'hide' : 'view'

  const deleteBlog = (blog) => {
    try {
      if (window.confirm(`Confirm removal of '${blog.title}'`)) {
        dispatch(deleteBlogById(blog.id))
        dispatch(blogDeleted(blog.title))
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

  return (
    <div className="blog">
      <table>
        <tbody>
          <tr>
            <td>
              <a href={blog.url} title={blog.title} alt={blog.title}>
                {blog.title}
              </a>
            </td>
            <td style={{ textAlign: 'right' }}>
              {blog.author}
              <button className={buttonText} onClick={toggleExpand}>
                {buttonText}
              </button>
              {user && user.username === blog.user.username && (
                <button className="delete" onClick={() => deleteBlog(blog)}>
                  delete
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          {expand && (
            <tr>
              <td>URL: {blog.url}</td>
              <td>Posted by: {blog.user.name}</td>
              <td style={{ textAlign: 'right' }}>
                Likes: {blog.likes}
                <button className="like" onClick={() => likeBlog(blog)}>
                  like
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Blog
