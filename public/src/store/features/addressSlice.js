import { createSlice } from '@reduxjs/toolkit'


const addressSlice = createSlice({
  name: 'address',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    setAddressLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAddressData: (state, action) => {
      state.data = action.payload;
    },
    setAddressError: (state, action) => {
      state.error = action.payload;
    }
  }
});


export const { setAddressLoading, setAddressData, setAddressError } = addressSlice.actions

export default addressSlice.reducer