import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    value: [],
  },
  reducers: {
    setProfile(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
