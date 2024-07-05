import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../stateSlice/TaskSlice";
import SettingSlice from "../stateSlice/SettingSlice";
import SummarySlice from "../stateSlice/SummarySlice";
import ProfileSlice from "../stateSlice/ProfileSlice";

export default configureStore({
  reducer: {
    task: taskSlice,
    setting: SettingSlice,
    summary: SummarySlice,
    profile: ProfileSlice,
  },
});
