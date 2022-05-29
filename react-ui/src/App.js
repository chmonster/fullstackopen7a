import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogEntryForm from './components/BlogEntryForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import {
  userLoggedIn,
  userLoggedOut,
  errorMessage
} from './reducers/notificationReducer'
import {
  initializeBlogs,
} from './reducers/blogReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const togglableLoginRef = useRef()
  const togglableBlogRef = useRef()
  const loginRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = loginRef.current.username
    const password = loginRef.current.password
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      loginRef.current.setUsername('')
      loginRef.current.setPassword('')
      dispatch(userLoggedIn(user.name))
    } catch (exception) {
      dispatch(errorMessage('Wrong credentials'))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out ', user.username)
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      dispatch(userLoggedOut(user.username))
      setUser(null)
      console.log(loginRef.current)
    } catch (error) {
      console.log('logout error', error)
      dispatch(errorMessage(error.message))
    }
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="log in" ref={togglableLoginRef}>
          <LoginForm ref={loginRef} onSubmit={handleLogin} />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => (
    <>
      <Togglable buttonLabel="new blog" ref={togglableBlogRef}>
        <BlogEntryForm ref={togglableBlogRef} />
      </Togglable>
    </>
  )

  const blogs = useSelector(state => state.blogs)
  console.log(blogs)

  return (
    <div>
      <Notification />
      <Header user={user} handleLogout={handleLogout} />
      {user === null ? loginForm() : blogForm()}

      {blogs
        //.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
