import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
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

  const padding = {
    padding: 5
  }


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeLogin())
  }, [dispatch])


  return (
    <>
      <Notification />
      <Header />
      <Router>
        <div>
          <Link style={padding} to='/blogs'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
        </div>
        <Routes>
          <Route path='/blogs' element={<BlogList />} />
          <Route path='/users' element={<UserList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
