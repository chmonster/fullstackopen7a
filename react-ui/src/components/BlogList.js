//import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlogById } from '../reducers/blogReducer'
import { blogDeleted, errorMessage } from '../reducers/notificationReducer'
import { Button, Header, Table, Icon } from 'semantic-ui-react'

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
      <Header as='h2'>Blog List</Header>
      <Table as='table'><Table.Body as='tbody'>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Table.Row as='tr' key={blog.id}>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </Table.Cell>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                {blog.author}
              </Table.Cell>
              <Table.Cell as='td'>
                {user && user.username === blog.user.username && (
                  <Button className="delete" onClick={() => deleteBlog(blog)}>
                    <Icon name='delete' />delete
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body></Table>
    </div>
  )
}
export default BlogList