import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],   
  reducers: {
    addfeed: (state, action) => action.payload,
    removefeed: () => [],
  },
});

export const { addfeed, removefeed } = feedSlice.actions;
export default feedSlice.reducer;
