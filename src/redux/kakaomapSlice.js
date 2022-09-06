import { createSlice } from "@reduxjs/toolkit";
const kakaomapSlice = createSlice({
  name: "kakaomapSlice",
  initialState: { value: [] },
  reducers: {
    savedata: (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    },
    deletedata: (state, action) => {
      const id = action.payload;
      console.log(action.payload);
      const findplaceArr = state.value.filter((i) => i.place.id !== id);
      console.log(findplaceArr);
      state.value = findplaceArr;
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
export const { saveplace, saveContents, savedata, deletedata } =
  kakaomapSlice.actions;
