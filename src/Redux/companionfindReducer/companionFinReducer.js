import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState = {
  isLoading: false,
  data: null,
  error: null,
}

export const companionFind = createSlice({
  name: 'companionFind',
  // `createSlice` will infer the state type from the `initialState` argument
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

export const { fetchingData, datafetched } = companionFind.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCompanionsData = (state) => state.companionFind.data

export default companionFind.reducer