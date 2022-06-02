import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import menuReducer from './reducers/menuReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    blogs: blogReducer,
    users: userReducer,
    notification: notificationReducer,
    menu: menuReducer
  }
})

export default store