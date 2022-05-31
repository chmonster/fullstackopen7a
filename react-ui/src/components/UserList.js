//import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

const UserList = () => {
  //const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  console.log('users', users)
  return (
    <div className='userlist'>
      <Header as ='h2'>User List</Header>
      <table><tbody>
        {[...users]
          .sort((a, b) => b.blogs.length - a.blogs.length)
          .map(user => (
            <tr key={user.id}>
              <td style={{ textAlign: 'justify' }}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
                &nbsp;({user.username})
              </td>
              <td style={{ textAlign: 'justify' }}>{user.blogs.length} blogs</td>
            </tr>
          ))
        }
      </tbody></table>
    </div>
  )
}
export default UserList