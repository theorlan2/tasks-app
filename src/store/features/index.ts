import { combineReducers } from "@reduxjs/toolkit";
//
import { apiSlice } from "./api/api.slice";

import tasks from "./tasks/tasks.slice";

export default combineReducers({
  tasks,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
