import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState = {
    data: []
}

export const userNotifications = createSlice({
  name: 'userNotification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    datafetched: (state, action) => {
        state.data = action.payload;
    },
  },
})

export const { datafetched } = userNotifications.actions

// Other code such as selectors can use the imported `RootState` type
export const getNotificationData = (state) => state.userNotifications.data

export default userNotifications.reducer