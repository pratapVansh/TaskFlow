const STORAGE_KEY = 'taskflow_tasks'

/**
 * Load the saved tasks array from localStorage.
 * Returns an empty array if nothing is stored or the data is corrupted.
 */
export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Persist the tasks array to localStorage.
 * Called automatically by the Redux middleware after every relevant action.
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
