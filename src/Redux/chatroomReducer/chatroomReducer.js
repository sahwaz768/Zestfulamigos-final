import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  data: null,
  error: null,
}

export const chatrooms = createSlice({
  name: 'chatrooms',
  initialState,
  reducers: {
    fetchingData: (state) => {
        state.isLoading = true
    },
    datafetched: (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
    },
  },
})

export const { fetchingData, datafetched } = chatrooms.actions

export const selectChatRoomData = (state) => state.chatrooms.data

export default chatrooms.reducer