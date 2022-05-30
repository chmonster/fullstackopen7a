import { useState } from 'react'
import { useDispatch } from 'react-redux'
//import PropTypes from 'prop-types'
import { handleLogin } from '../reducers/loginReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [usernameEntry, setUsernameEntry] = useState('')
  const [passwordEntry, setPasswordEntry] = useState('')
  const handleUsernameChange = (event) => setUsernameEntry(event.target.value)
  const handlePasswordChange = (event) => setPasswordEntry(event.target.value)

  const onSubmit = (event) => {
    event.preventDefault()
    const credentials = {
      username: usernameEntry,
      password: passwordEntry
    }
    //console.log(credentials)
    dispatch(handleLogin(credentials))
    setUsernameEntry('')
    setPasswordEntry('')
  }

  return (
    <div className="loginform">
      <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
        Username:
        <input
          type="text"
          value={usernameEntry}
          name="Username"
          id="username"
          onChange={handleUsernameChange}
        />
        Password:
        <input
          type="password"
          value={passwordEntry}
          name="Password"
          id="password"
          onChange={handlePasswordChange}
        />
        <br />
        <button id="login-button" type="submit">
          log in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
