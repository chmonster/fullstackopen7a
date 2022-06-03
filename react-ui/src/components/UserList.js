//import Blog from './Blog'
//import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Container, Icon } from 'semantic-ui-react'

const UserList = ({ users }) => {
  //const blogs = useSelector(state => state.blogs)
  //const users = useSelector(state => state.users)
  console.log('users', users)
  return (
    <div className='userlist'><Container>
      <Table as='table'><Table.Body as='tbody'>
        {[...users]
          .sort((a, b) => b.blogs.length - a.blogs.length)
          .map(user => (
            <Table.Row as='tr' key={user.id}>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Link to={`/users/${user.id}`}>
                  <Icon name='user' />{user.name}
                </Link>
                &nbsp;({user.username})
              </Table.Cell>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Icon name='book' />{user.blogs.length} blogs
              </Table.Cell>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Icon name='like' />
                {user.blogs.reduce((a,b) => a+b.likes, 0)} total likes
              </Table.Cell>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Icon name='comment' />
                {user.blogs.reduce((a,b) => a+b.comments.length, 0)} total comments
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body></Table>
    </Container></div>
  )
}
export default UserList