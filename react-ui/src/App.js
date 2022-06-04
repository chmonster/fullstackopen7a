import { useEffect } from 'react'
import {
  Routes, Route, Navigate, useMatch
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLogin } from './reducers/loginReducer'

import { Container } from 'semantic-ui-react'

import BlogHeader from './components/BlogHeader'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeLogin())
  }, [dispatch])

  const matchBlog = useMatch('/blogs/:id')
  const blogs = useSelector(state => state.blogs)
  const blog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  const matchUser = useMatch('/users/:id')
  const users = useSelector(state => state.users)
  const user = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const login = useSelector(state => state.login)
  const menu = useSelector(state => state.menu)

  return (
    <div className='app'><Container>
      <Notification />

      <BlogHeader menu={menu} />
      <Routes>
        <Route path='/blogs/:id' element={<Blog blog={blog} login={login} />} />
        <Route path='/users/:id' element={<User user={user} />} />
        <Route path='/blogs' element={<BlogList blogs={blogs} login={login} />} />
        <Route path='/users' element={<UserList users={users} />} />
        <Route path='/' element={<Navigate replace to="/blogs" />} />
      </Routes>

    </Container></div>
  )
}

export default App
