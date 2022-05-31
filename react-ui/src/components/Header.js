//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import BlogEntryForm from './BlogEntryForm'
import Togglable from './Togglable'

const Header = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(handleLogout())
  }
  const loggedUser = useSelector(state => state.login)

  const username = loggedUser ? loggedUser.username : ''
  const name = loggedUser ? loggedUser.name : ''

  const togglableLoginRef = useRef()
  const togglableBlogRef = useRef()

  const loggedIn = loggedUser ? true : false
  const hideWhenLoggedIn = { display: loggedIn ? 'none' : '' }
  const showWhenLoggedIn = { display: loggedIn ? '' : 'none' }

  const padding = {
    padding: 5
  }

  return (
    <div className="header">
      <h2>Blogs</h2>
      <div className='menu'>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <div style={showWhenLoggedIn}>
        {username} ({name}) logged in
        <button onClick={logout}>Log out</button>
        <Togglable buttonLabel="new blog" ref={togglableBlogRef}>
          <BlogEntryForm ref={togglableBlogRef} />
        </Togglable>
      </div>
      <div style={hideWhenLoggedIn}>
        <Togglable buttonLabel="log in" ref={togglableLoginRef}>
          <LoginForm />
        </Togglable>
      </div>
    </div>
  )
}

export default Header
