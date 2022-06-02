//import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlogById } from '../reducers/blogReducer'
import { blogDeleted, errorMessage } from '../reducers/notificationReducer'
import { Button, Table, Icon, Container } from 'semantic-ui-react'

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
      dispatch(errorMessage(error.response.data.error))
    }
  }

  return (
    <div className='bloglist'><Container>
      <Table as='table'><Table.Body as='tbody'>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Table.Row as='tr' key={blog.id}>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Icon name='book' />
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </Table.Cell>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Icon name='pencil' />{blog.author}
              </Table.Cell>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Icon name='like' />{blog.likes} Likes
              </Table.Cell>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Icon name='comment' />{blog.comments.length} Comments
              </Table.Cell>
              <Table.Cell as='td'>
                <Icon name='user' />
                <Link to={`/users/${blog.user.id}`}>
                  {blog.user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {user && user.username === blog.user.username && (
                  <Button className="delete" onClick={() => deleteBlog(blog)}>
                    <Icon name='delete' />delete blog
                  </Button>
                )}
              </Table.Cell>

            </Table.Row>
          ))
        }
      </Table.Body></Table>
    </Container></div>
  )
}
export default BlogList