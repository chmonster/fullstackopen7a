import { useState } from 'react'
import { useDispatch } from 'react-redux'
//import PropTypes from 'prop-types'
import { handleLogin } from '../reducers/loginReducer'
import { Button, Input, Form, Label, Icon } from 'semantic-ui-react'

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
    <div className='loginform'>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Label><Icon name='user' />Username:</Label>
          <Input
            type="text"
            value={usernameEntry}
            name="Username"
            id="username"
            onChange={handleUsernameChange}
          />
        </Form.Field>
        <Form.Field>
          <Label><Icon name='eye slash' />Password:</Label>
          <Input
            type="password"
            value={passwordEntry}
            name="Password"
            id="password"
            onChange={handlePasswordChange}
          />
        </Form.Field>
        <br />
        <Button id="login-button" type="submit">
          <Icon name='sign in' />log in
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
