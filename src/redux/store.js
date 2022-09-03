import { configureStore } from "@reduxjs/toolkit";
import kakaomapSlice from "./kakaomapSlice";
const store = configureStore({
  reducer: {
    address: kakaomapSlice.reducer,
  },
});
export default store;
