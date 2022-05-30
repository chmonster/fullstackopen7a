//import Blog from './Blog'
import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {
  //const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  console.log('users', users)
  return (
    <div className='userList' style={{ textAlign: 'center', justifyContent: 'full' }}>
      <h2>User List</h2>
      {[...users]
        .sort((a, b) => b.blogs.length - a.blogs.length)
        .map(user => (
          <div key={user.id}>
            {user.name} ({user.username}) wrote {user.blogs.length} blogs
            <User user={user} />
            <br />
          </div>
        ))
      }
    </div>
  )
}
export default UserList