//console.clear()

const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcrypt')
const Blog = require('./server/models/blog')
const User = require('./server/models/user')
const { forEach } = require('lodash')

//const url = process.env.MONGODB_URI
const url = process.env.DEV_MONGODB_URI

const makeTestUsers = async () => {
  await User.deleteMany({})
  const hash = await bcrypt.hash(process.env.TEST_PASS, 10)
  const users = [
    new User({
      username: 'test',
      name: 'Robert J. Test',
      passwordHash: hash,
    }),
    new User({
      username: 'gawd',
      name: 'Jesus H. Gawd',
      passwordHash: hash,
    }),
    new User({
      username: 'wilbur',
      name: 'Wilbur George',
      passwordHash: hash,
    })
  ]
  let user = users[0]
  await user.save()
  console.log(user.username, 'created')
  user = users[1]
  await user.save()
  console.log(user.username, 'created')
  user = users[2]
  await user.save()
  console.log(user.username, 'created')
  return users
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

  try {
    await mongoose.connect(url)
    console.log('connected to MongoDB')
  } catch(error) {
    console.log('error', error.message)
  }
  
  await Blog.deleteMany({})
  const users = await makeTestUsers()
  for (let blog of initialBlogs) {
    const testUser = users[Math.floor(Math.random()*users.length)]
    const blogObject = new Blog({ ...blog, user: testUser.id })
    await blogObject.save()
    testUser.blogs = testUser.blogs.concat(blogObject._id)
    await testUser.save()
    console.log(blogObject.title, 'created')
  }
  mongoose.connection.close()
}

initRemoteDB()
