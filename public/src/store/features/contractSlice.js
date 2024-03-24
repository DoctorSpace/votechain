import { createSlice } from '@reduxjs/toolkit'


const contractSlice = createSlice({
  name: 'contract',
  initialState: {
    // Начальное состояние переменной contact
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    // Действия для обновления состояния переменной contact
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

// Action creators are generated for each case reducer function
export const { setContactLoading, setContactData, setContactError } = contractSlice.actions

export default contractSlice.reducer