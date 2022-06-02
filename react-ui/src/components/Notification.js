import { useSelector } from 'react-redux'
import { Icon, Message } from 'semantic-ui-react'

const Notification = () => {

  const [message, messageType] = useSelector(state => state.notification)

  const icon = messageType === 'error'
    ? <Icon name='exclamation circle' />
    : <Icon name='checkmark' />

  if (message === null) {
    return null
  }

  return (
    <div className={messageType}><Message icon>
      {icon}
      <Message.Content>
        {message}
      </Message.Content>
    </Message></div>
  )
}

export default Notification
