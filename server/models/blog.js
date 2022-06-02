const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [3, 'title too short'],
  },
  author: {
    type: String,
    minlength: [3, 'author too short'],
  },
  url: {
    type: String,
    minlength: [3, 'url too short'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: String
    }
  ]
})

blogSchema.pre('validate', function (next) {
  if (!this.url && !this.title) {
    this.invalidate('url', 'must have either URL or title', this.url)
  }
  next()
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
