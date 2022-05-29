import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))
      }
    </>
  )
}
export default BlogList