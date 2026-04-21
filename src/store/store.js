import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskSlice'
import { saveTasks } from '../utils/localStorage'

// Persist tasks to localStorage only when the tasks array actually changes.
// Comparing references works because Redux Toolkit (Immer) always returns a
// new array reference when a task is added, edited, or deleted.
const localStorageMiddleware = (store) => (next) => (action) => {
  const prevTasks = store.getState().tasks.tasks

  const result = next(action)

  const nextTasks = store.getState().tasks.tasks
  if (prevTasks !== nextTasks) {
    saveTasks(nextTasks)
  }

  return result
}

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})
