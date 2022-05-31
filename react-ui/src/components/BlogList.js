//import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlogById } from '../reducers/blogReducer'
import { blogDeleted, errorMessage } from '../reducers/notificationReducer'

const BlogList = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

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

  return (
    <div className='bloglist'>
      <h2>Blog List</h2>
      <table><tbody>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <tr key={blog.id}>
              <td style={{ textAlign: 'justify' }}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td style={{ textAlign: 'justify' }}>
                {blog.author}
              </td>
              <td>
                {user && user.username === blog.user.username && (
                  <button className="delete" onClick={() => deleteBlog(blog)}>
                    delete
                  </button>
                )}
              </td>
            </tr>
          ))
        }
      </tbody></table>
    </div>
  )
}
export default BlogList