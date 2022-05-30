import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLogin } from './reducers/loginReducer'

import Header from './components/Header'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeLogin())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Header />
      <BlogList />
      <UserList />
    </div>
  )
}

export default App
