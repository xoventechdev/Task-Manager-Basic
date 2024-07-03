import { createSlice } from "@reduxjs/toolkit";

const SummarySlice = createSlice({
  name: "summary",
  initialState: {
    value: [],
  },
  reducers: {
    addSummary(state, action) {
      state.value = action.payload;
    },
  },
});

export const { addSummary } = SummarySlice.actions;
export default SummarySlice.reducer;
