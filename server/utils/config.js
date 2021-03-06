require('dotenv').config()

//console.log(process.env)

const PORT = process.env.PORT
let MONGODB_URI
/*process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI*/
switch(process.env.NODE_ENV) {
case 'test':
  MONGODB_URI = process.env.TEST_MONGODB_URI
  break
case 'production':
  MONGODB_URI = process.env.MONGODB_URI
  break
default:
  MONGODB_URI = process.env.DEV_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
