import { createSlice } from '@reduxjs/toolkit'

const initialState = 'blogs'

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    clearMenu(state, action) {
      return 'none'
    },
  },
})

export const { setMenu, clearMenu } = menuSlice.actions

export default menuSlice.reducer