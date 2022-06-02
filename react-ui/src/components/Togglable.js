import { useState, forwardRef, useImperativeHandle } from 'react'
//import PropTypes from 'prop-types'
import { Button, Icon, Modal } from 'semantic-ui-react'

const Togglable = forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'

  /*Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }*/

  const [visible, setVisible] = useState(false)

  //const hideWhenVisible = { display: visible ? 'none' : '' }
  //const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => toggleVisibility)

  /*const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  }*/

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      onOpen={() => setVisible(true)}
      trigger={<Button><Icon name={props.buttonIcon} />{props.buttonLabel}</Button>}
    >
      <Modal.Content>
        {props.children}
      </Modal.Content>
    </Modal>
  )
})
/*<Button style={hideWhenVisible} onClick={toggleVisibility} className="toggleVis">
  <Icon name='compose' />{props.buttonLabel}
</Button>
<Button style={showWhenVisible} onClick={toggleVisibility} className="cancelChild">
  <Icon name='hide' />cancel
</Button>*/
export default Togglable
