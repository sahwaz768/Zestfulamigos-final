import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  message: null,
  type: 'error',
  duration: 3000,
  open: false
};

export const notiReducer = createSlice({
  name: 'notiReducer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    notitrigger: (state, action) => {
      state.message =
        typeof action.payload.message === 'undefined'
          ? null
          : action.payload.message;
      state.duration = action.payload.duration || 3000;
      state.type = action.payload.type || 'error';
      state.open = typeof action.payload.open === 'undefined' ? true : false;
    }
  }
});

export const { notitrigger } = notiReducer.actions;

// Other code such as selectors can use the imported `RootState` type
export const notiReducerData = (state) => state.notiReducer;

export default notiReducer.reducer;
