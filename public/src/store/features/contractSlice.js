import { createSlice } from '@reduxjs/toolkit'


const contractSlice = createSlice({
  name: 'contract',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    setContactLoading: (state, action) => {
      state.loading = action.payload;
    },
    setContactData: (state, action) => {
      state.data = action.payload;
    },
    setContactError: (state, action) => {
      state.error = action.payload;
    }
  }
});


export const { setContactLoading, setContactData, setContactError } = contractSlice.actions

export default contractSlice.reducer