import { configureStore } from "@reduxjs/toolkit";
import contractSlice from "./features/contractSlice";
import addressSlice from "./features/addressSlice";

export const store = configureStore({
  reducer: {
    contract: contractSlice,
    address: addressSlice,
  },
});
