import { createSlice } from "@reduxjs/toolkit";
const taskSlice = createSlice({
  name: "task",
  initialState: {
    newTask: [],
    inProgressTask: [],
    completedTask: [],
    canceledTask: [],
  },
  reducers: {
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
    setInProgressTask: (state, action) => {
      state.inProgressTask = action.payload;
    },
    setCompletedTask: (state, action) => {
      state.completedTask = action.payload;
    },
    setCanceledTask: (state, action) => {
      state.canceledTask = action.payload;
    },
  },
});

export const {
  setNewTask,
  setInProgressTask,
  setCompletedTask,
  setCanceledTask,
} = taskSlice.actions;

export default taskSlice.reducer;
