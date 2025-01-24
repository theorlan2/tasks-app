import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";

import { Task } from "@/types/task/task.model";

export type TasksState = {
  tasks: Task[];
};

const tasksInitialState: TasksState = {
  tasks: [] as Task[],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    saveTasks: (state, payload: PayloadAction<Task[]>) => {
      state.tasks = payload.payload;
    },
    addTask: (state, payload: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, payload.payload];
    },
    updateTaskData: (state, payload: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload.payload.id ? payload.payload : task,
      );
    },
    deleteTaskById: (state, payload: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.payload);
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const {
  saveTasks,
  addTask,
  deleteTaskById,
  updateTaskData,
  clearTasks,
} = tasksSlice.actions;

// selectors
const tasksSelector = (state: RootState) => state.tasks;

export const selectTasks = createSelector(
  tasksSelector,
  (state) => state.tasks,
);

// reducer
export default tasksSlice.reducer;
