import { configureStore } from "@reduxjs/toolkit";
import contractSlice from "./features/contractSlice";

export const store = configureStore({
  reducer: {
    contract: contractSlice,
  },
});
