import { useState, forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'
import { Form, Icon } from 'semantic-ui-react'

const LoginForm  = forwardRef((props, ref) => {
  LoginForm.displayName='LoginForm'

  const dispatch = useDispatch()
  const toggleVisibility = ref.current

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
    dispatch(handleLogin(credentials))
    setUsernameEntry('')
    setPasswordEntry('')
    toggleVisibility()
  }

  const onCancel = (event) => {
    event.preventDefault()
    setUsernameEntry('')
    setPasswordEntry('')
    toggleVisibility()
  }

  return (
    <div className='loginform'>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Field>
            <Form.Input inline
              id="username"
              label='Username'
              name="Username"
              onChange={handleUsernameChange}
              placeholder='username'
              type="text"
              value={usernameEntry}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input inline
              label='Password'
              type="password"
              value={passwordEntry}
              name="Password"
              id="password"
              placeholder='password'
              onChange={handlePasswordChange}
            />
          </Form.Field>
          <Form.Button id="login-button" type="submit">
            <Icon name='sign in' />log in
          </Form.Button>
          <Form.Button onClick={onCancel} id='cancel-button' type='reset'>
            <Icon name='cancel' />cancel
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  )
})

export default LoginForm
