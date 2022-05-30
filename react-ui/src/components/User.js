//import { useState } from 'react'
//import { useDispatch } from 'react-redux'

//import { deleteBlogById, incLikes } from '../reducers/blogReducer'
//import { blogDeleted, blogLiked, errorMessage } from '../reducers/notificationReducer'

const User = ({ user }) => {
  //const [expand, setExpand] = useState(false)
  //const dispatch = useDispatch()

  //const toggleExpand = () => {
  //  setExpand(!expand)
  //}
  //const buttonText = expand ? 'hide' : 'view'

  if(user) {
    return (
      <div className="user">
        <h2>{user.name} ({user.username})</h2>
        Blogs:
        {
          user.blogs.map(blog => (
            <div key={blog.id}>
              <a href={blog.url} title={blog.title} alt={blog.title}>
                {blog.title}
              </a>
            </div>
          ))
        }
      </div>
    )
  } else {
    return <></>
  }
}

export default User
