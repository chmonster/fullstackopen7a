import { useState, forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { blogCreated, errorMessage } from '../reducers/notificationReducer'
import { Button, Form, Header, Input, Table, Label, Icon } from 'semantic-ui-react'

const BlogEntryForm = forwardRef((props, ref) => {
  BlogEntryForm.displayName='BlogEntryForm'

  const dispatch = useDispatch()
  const toggleVisibility = ref.current
  //console.log(toggleVisibility)

  const newBlog = async (blogObject) => {
    toggleVisibility()
    try {
      console.log('create', blogObject)
      dispatch(createBlog(blogObject))
      dispatch(blogCreated(blogObject.title))
    } catch(error) {
      console.log(error)
      dispatch(errorMessage(error.response.data.error))
    }
  }

  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    //console.log(blogObject)
    newBlog(blogObject)
    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }

  return (
    <div className="blogEntryForm">
      <Header as='h2'>Enter a Blog</Header>
      <Form onSubmit={addBlog}>
        <Table as='table'>
          <Table.Body as='tbody'>
            <Table.Row as='tr'>
              <Table.Cell as='td'>
                <Form.Field>
                  <Label><Icon name='book' />Title</Label>
                  <Input
                    id="title"
                    value={newTitle}
                    onChange={handleTitleChange}
                    placeholder="title"
                  />
                </Form.Field>
              </Table.Cell>
              <Table.Cell as='td'>
                <Form.Field>
                  <Label><Icon name='linkify' />URL</Label>
                  <Input
                    id="url"
                    value={newUrl}
                    onChange={handleUrlChange}
                    placeholder="URL"
                  />
                </Form.Field>
              </Table.Cell>
              <Table.Cell as='td'>
                <Form.Field>
                  <Label><Icon name='pencil' />Author</Label>
                  <Input
                    id="author"
                    value={newAuthor}
                    onChange={handleAuthorChange}
                    placeholder="author"
                  />
                </Form.Field>
              </Table.Cell>
              <Table.Cell as='td'>
                <Button id="save-button" type="submit">
                  <Icon name='save' />save
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Form>
    </div>
  )
})

export default BlogEntryForm
