import { createSlice } from "@reduxjs/toolkit";
const kakaomapSlice = createSlice({
  name: "kakaomapSlice",
  initialState: { value: [] },
  reducers: {
    savedata: (state, action) => {
      console.log(action.payload);
      state.value = [...state.value, action.payload];
    },
  },
});
export default kakaomapSlice;
export const { savedata } = kakaomapSlice.actions;
