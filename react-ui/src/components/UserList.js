//import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'

const UserList = () => {
  //const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  console.log('users', users)
  return (
    <div className='userlist'>
      <Header as ='h2'>User List</Header>
      <Table as='table'><Table.Body as='tbody'>
        {[...users]
          .sort((a, b) => b.blogs.length - a.blogs.length)
          .map(user => (
            <Table.Row as='tr' key={user.id}>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
                &nbsp;({user.username})
              </Table.Cell>
              <Table.Cell as='td' style={{ textAlign: 'justify' }}>
                {user.blogs.length} blogs
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body></Table>
    </div>
  )
}
export default UserList