import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

const Togglable = forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(false)
    console.log('toggleVisible', visible)
  }

  useImperativeHandle(ref, () => toggleVisibility)

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
      <Modal.Actions>
        <Button onClick={() => setVisible(false)} id='cancel-button' type='reset'>
          <Icon name='cancel' />cancel
        </Button>
      </Modal.Actions>
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
