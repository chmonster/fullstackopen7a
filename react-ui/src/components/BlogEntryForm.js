import { useState, forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { blogCreated, errorMessage } from '../reducers/notificationReducer'
import { Form, Icon } from 'semantic-ui-react'

const BlogEntryForm = forwardRef((props, ref) => {
  BlogEntryForm.displayName='BlogEntryForm'

  const dispatch = useDispatch()
  const toggleVisibility = ref.current

  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)

  const onSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    //console.log(blogObject)
    try {
      console.log('create', blogObject)
      dispatch(createBlog(blogObject))
      dispatch(blogCreated(blogObject.title))
    } catch(error) {
      console.log('newBlog error', error.response.data)
      dispatch(errorMessage(error.response.data.error))
    }
    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
    toggleVisibility()
  }

  const onCancel = (event) => {
    event.preventDefault()
    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
    console.log('Blogentry onCancel')
    toggleVisibility()
  }

  return (
    <div className="blogEntryForm">
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Field>
            <Form.Input inline
              label="Title:"
              name='Title'
              type='text'
              id="title"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="title"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input inline
              label='URL:'
              type='text'
              name='URL'
              id="url"
              value={newUrl}
              onChange={handleUrlChange}
              placeholder="URL"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input inline
              label='Author:'
              name='Author'
              type='text'
              id="author"
              value={newAuthor}
              onChange={handleAuthorChange}
              placeholder="author"
            />
          </Form.Field>
          <Form.Button id="save-button" type="submit">
            <Icon name='save' />save
          </Form.Button>
          <Form.Button id='cancel-button' type='reset' onClick={onCancel}>
            <Icon name='cancel' />cancel
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  )
})

export default BlogEntryForm
