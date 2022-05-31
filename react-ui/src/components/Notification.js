import { useSelector } from 'react-redux'
import { Icon } from 'semantic-ui-react'

const Notification = () => {

  const [message, messageType] = useSelector(state => state.notification)

  const icon = messageType === 'error'
    ? <Icon name='exclamation circle' />
    : <Icon name='checkmark' />

  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {icon}{message}
    </div>
  )
}

export default Notification
