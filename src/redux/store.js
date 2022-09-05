import { configureStore } from "@reduxjs/toolkit";
import kakaomapSlice from "./kakaomapSlice";
const store = configureStore({
  reducer: {
    place: kakaomapSlice.reducer,
  },
});
export default store;
