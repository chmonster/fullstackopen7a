import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route //, Link
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLogin } from './reducers/loginReducer'

import BlogHeader from './components/BlogHeader'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'

const App = () => {

  const dispatch = useDispatch()

  //const padding = {
  //  padding: 5
  //}

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeLogin())
  }, [dispatch])

  return (
    <>
      <Notification />
      <Router>
        <BlogHeader />
        <Routes>
          <Route path='/blogs/:id' element={<Blog />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/' element={<BlogList />} />
          <Route path='/users' element={<UserList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
