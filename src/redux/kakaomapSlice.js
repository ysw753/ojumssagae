import { createSlice } from "@reduxjs/toolkit";
const kakaomapSlice = createSlice({
  name: "kakaomapSlice",
  initialState: { value: [] },
  reducers: {
    savedata: (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
      return state;
    },
  },
});
export default kakaomapSlice;
export const { savedata } = kakaomapSlice.actions;
