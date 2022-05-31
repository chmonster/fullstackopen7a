import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === id) )
  if(!user) {
    return null
  }
  return (
    <div className="user">
      <Header as ='h2'>{user.name} ({user.username})</Header>
      Blogs:
      {
        user.blogs.map(blog => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default User
