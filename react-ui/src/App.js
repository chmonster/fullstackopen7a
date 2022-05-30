import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

import Header from './components/Header'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Header />
      <BlogList />
    </div>
  )
}

export default App
