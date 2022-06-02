import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header, Container, Icon, Segment, Table } from 'semantic-ui-react'
import { setMenu } from '../reducers/menuReducer'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === id) )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMenu('users'))
  }, [])

  if(!user) {
    return null
  }
  return (
    <Container><div className="user">
      <Segment>
        <Header as ='h2'><Icon name='user' />{user.name} ({user.username})</Header>
      </Segment>
      <Table as='table'><Table.Body as='tbody'>
        {user.blogs.map(blog => (
          <Table.Row as='tr' key={blog.id}>
            <Table.Cell as='td' style={{ textAlign: 'justify' }}>
              <Icon name='book' />
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </Table.Cell>
            <Table.Cell as='td' style={{ textAlign: 'justify' }}>
              <Icon name='like' />{blog.likes} likes
            </Table.Cell>
            <Table.Cell as='td' style={{ textAlign: 'justify' }}>
              <Icon name='comment' />{blog.comments.length} comments
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body></Table>
    </div></Container>
  )
}

export default User
