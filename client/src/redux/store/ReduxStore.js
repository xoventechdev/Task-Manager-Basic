import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../stateSlice/TaskSlice";
import SettingSlice from "../stateSlice/SettingSlice";

export default configureStore({
  reducer: {
    task: taskSlice,
    setting: SettingSlice,
  },
});
