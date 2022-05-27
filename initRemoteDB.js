console.clear()

const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcrypt')
const Blog = require('./server/models/blog')
const User = require('./server/models/user')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error', error.message))

const makeTestUser = async () => {
  await User.deleteMany({})
  const hash = await bcrypt.hash('P4ss0rF41l', 10)
  const user = new User({
    username: 'test',
    name: 'Robert J. Test',
    blogs: [],
    passwordHash: hash,
  })
  await user.save()
}
 
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]


const initRemoteDB = async () => {
  await Blog.deleteMany({})
  const testUser = makeTestUser()
  for (let blog of initialBlogs) {
    let blogObject = new Blog({ ...blog, user: testUser.id })
    //console.log(blogObject)
    await blogObject.save()
  }
}

initRemoteDB()