//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'
import { useRef } from 'react'

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

  return (
    <div className="header" style={{ textAlign: 'center', justifyContent: 'full' }}>
      <h2 >Blog List</h2>
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
