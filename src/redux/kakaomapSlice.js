import { createSlice } from "@reduxjs/toolkit";
const kakaomapSlice = createSlice({
  name: "kakaomapSlice",
  initialState: { value: [] },
  reducers: {
    initdata: (state) => {
      state.value = [];
    },
    fetchdata: (state) => {
      return state;
    },
    savedata: (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    },
    updatedata: (state, action) => {
      const id = action.payload;
      const findplaceArr = state.value.map((i) => {
        if (i.place.position.lat == id.place.position.lat) {
          return id;
        } else {
          return i;
        }
      });
      state.value = findplaceArr;
    },
    deletedata: (state, action) => {
      const id = action.payload;
      console.log(action.payload);
      const findplaceArr = state.value.filter(
        (i) => i.place.position.lat !== id.place.position.lat
      );
      console.log(findplaceArr);
      state.value = findplaceArr;
    },
  },
});
export default kakaomapSlice;
export const { fetchdata, initdata, savedata, deletedata, updatedata } =
  kakaomapSlice.actions;
