import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLogin } from './reducers/loginReducer'

import Header from './components/Header'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
//import User from '.components/User'
import Notification from './components/Notification'

const App = () => {

  const dispatch = useDispatch()
  //const loggedUser = useSelector(state => state.login)

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
