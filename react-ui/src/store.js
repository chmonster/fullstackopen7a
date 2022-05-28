import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
//import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
  //    users: userReducer,
    blogs: blogReducer,
    notification: notificationReducer
  }
})

export default store