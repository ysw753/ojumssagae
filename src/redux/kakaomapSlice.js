import { createSlice } from "@reduxjs/toolkit";
const kakaomapSlice = createSlice({
  name: "kakaomapSlice",
  initialState: { value: [] },
  reducers: {
    savedata: (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    },
    // savePlace: (state, action) => {
    //   console.log(action.payload);
    //   state.value.push(action.payload);
    // },
    // saveContents: (state, action) => {
    //   console.log(action.payload);
    // },
  },
});
export default kakaomapSlice;
export const { saveplace, saveContents, savedata } = kakaomapSlice.actions;
