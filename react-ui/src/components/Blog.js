
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { blogDeleted, blogLiked, commentAdded, errorMessage } from '../reducers/notificationReducer'
import { incLikes, deleteBlogById, addComment } from '../reducers/blogReducer'
import { setMenu } from '../reducers/menuReducer'
import { Container, Button, Header, Form, Input, List, Label, Icon, Segment } from 'semantic-ui-react'

const Blog = ({ blog, login }) => {

  useEffect(() => {
    dispatch(setMenu('blogs'))
  }, [])

  const [commentEntry, setComment] = useState('')
  const handleCommentChange = (event) => setComment(event.target.value)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //const id = useParams().id

  //const login = useSelector(state => state.login)

  useEffect(() => {
    dispatch(setMenu('blogs'))
  }, [])

  const deleteBlog = (blog) => {
    try {
      if (window.confirm(`Confirm removal of '${blog.title}'`)) {
        dispatch(deleteBlogById(blog.id))
        dispatch(blogDeleted(blog.title))
        navigate('/blogs')
      }
    } catch (error) {
      console.log(error)
      dispatch(errorMessage(error.response.data.error))
    }
  }

  const likeBlog = (blog) => {
    try {
      dispatch(incLikes(blog.id))
      dispatch(blogLiked(blog.title))
    } catch (error) {
      console.log(error)
      dispatch(errorMessage(error.response.data.error))
    }
  }

  const doComment = (event) => {
    event.preventDefault()
    try {
      dispatch(addComment(blog.id, commentEntry))
      dispatch(commentAdded(blog.title))
      setComment('')
    } catch (error) {
      console.log(error)
      dispatch(errorMessage(error.response.data.error))
    }
  }

  if (!blog) {
    return null
  }

  //console.log(blog)

  return (
    <div className='blog'><Container>
      <Segment>
        <Header as ='h2'><Icon name='book' />{blog.title}</Header>
        <h3><a href={blog.url} title={blog.title}>
          {blog.url}
        </a></h3>
        <br />
        Likes: {blog.likes}
        <Button className="like" onClick={() => likeBlog(blog)}>
          <Icon name='like' />like
        </Button>
      </Segment>
      <Segment>
        Posted by: <Icon name='user' /><Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        {login && login.username === blog.user.username && (
          <Button className="delete" onClick={() => deleteBlog(blog)}>
            <Icon name='delete' />delete
          </Button>
        )}
      </Segment>
      <Segment>
        {blog.comments.length && (
          <><Header as ='h2'>Comments:</Header>
            <Container text textAlign='justified'><List>
              {[...blog.comments].map((comment, i) =>
                (<List.Item key={i}>
                  <List.Icon name='comment' />
                  <List.Content>{comment}</List.Content>
                </List.Item>)
              )}
            </List></Container></>
        ) || (
          <Header as ='h2'>No Comments Yet</Header>
        )}
      </Segment>
      <Segment>
        <Form onSubmit={doComment}>
          <Form.Field>
            <Label><Icon name='comment' />Add a comment</Label>
            <Input
              id="comment"
              value={commentEntry}
              onChange={handleCommentChange}
              placeholder="comment?"
            />
          </Form.Field>
          <Button id="save-comment" type="submit">
            <Icon name='save' />save
          </Button>
        </Form>
      </Segment>
    </Container></div>
  )
}

export default Blog
