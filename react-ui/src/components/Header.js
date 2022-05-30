//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import { useRef } from 'react'

import LoginForm from './LoginForm'
import BlogEntryForm from './BlogEntryForm'
import Togglable from './Togglable'

const Header = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(handleLogout())
  }
  const user = useSelector(state => state.user)

  const username = user ? user.username : ''
  const name = user ? user.name : ''

  const togglableLoginRef = useRef()
  const togglableBlogRef = useRef()

  const loggedIn = user ? true : false
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
