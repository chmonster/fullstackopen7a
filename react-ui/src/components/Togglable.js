import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

const Togglable = forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => toggleVisibility)

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} style={buttonStyle} className="toggle">
          <Icon name='compose' />{props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button onClick={toggleVisibility} className="cancel" style={buttonStyle}>
          <Icon name='hide' />cancel
        </Button>
      </div>
    </div>
  )
})

export default Togglable
