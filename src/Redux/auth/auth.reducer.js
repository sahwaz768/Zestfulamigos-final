import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState = {
    data: null
}

export const Auth = createSlice({
  name: 'Auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    datafetched: (state, action) => {
        state.data = action.payload;
    },
  },
})

export const { fetchingData, datafetched } = Auth.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCompanionsData = (state) => state.Auth.data

export default Auth.reducer