import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../stateSlice/TaskSlice";

export default configureStore({
  reducer: {
    task: taskSlice,
  },
});
