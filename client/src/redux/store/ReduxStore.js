import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../stateSlice/TaskSlice";
import SettingSlice from "../stateSlice/SettingSlice";
import SummarySlice from "../stateSlice/SummarySlice";

export default configureStore({
  reducer: {
    task: taskSlice,
    setting: SettingSlice,
    summary: SummarySlice,
  },
});
