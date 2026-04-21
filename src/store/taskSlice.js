import { createSlice, nanoid } from '@reduxjs/toolkit'
import { loadTasks } from '../utils/localStorage'

// ─────────────────────────────────────────────────────────────
// Initial state
// tasks        → loaded from localStorage on startup
// searchTerm   → controlled by the search input
// priorityFilter → 'All' | 'Low' | 'Medium' | 'High'
// sortOrder    → 'newest' | 'oldest'
// ─────────────────────────────────────────────────────────────
const initialState = {
  tasks: loadTasks(),
  searchTerm: '',
  priorityFilter: 'All',
  sortOrder: 'newest',
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // ── Task CRUD ──────────────────────────────────────────

    // Uses the "prepare" callback to build the full task object
    // so components only need to pass { title, description, priority }
    addTask: {
      reducer(state, action) {
        state.tasks.unshift(action.payload) // newest at top
      },
      prepare({ title, description, priority }) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            description: description.trim(),
            priority,           // 'Low' | 'Medium' | 'High'
            createdAt: new Date().toISOString(),
          },
        }
      },
    },

    editTask(state, action) {
      const { id, title, description, priority } = action.payload
      const task = state.tasks.find((t) => t.id === id)
      if (task) {
        task.title = title.trim()
        task.description = description.trim()
        task.priority = priority
      }
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload)
    },

    // ── Filters ────────────────────────────────────────────

    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },

    setPriorityFilter(state, action) {
      state.priorityFilter = action.payload
    },

    setSortOrder(state, action) {
      state.sortOrder = action.payload
    },
  },
})

export const {
  addTask,
  editTask,
  deleteTask,
  setSearchTerm,
  setPriorityFilter,
  setSortOrder,
} = taskSlice.actions

export default taskSlice.reducer

// ─────────────────────────────────────────────────────────────
// Selector — reads filters directly from Redux state so
// components don't need to pass anything as arguments
// ─────────────────────────────────────────────────────────────
export function selectFilteredTasks(state) {
  const { tasks, searchTerm, priorityFilter, sortOrder } = state.tasks

  let result = [...tasks]

  // 1. Filter by search term (case-insensitive title match)
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase()
    result = result.filter((t) => t.title.toLowerCase().includes(q))
  }

  // 2. Filter by priority
  if (priorityFilter !== 'All') {
    result = result.filter((t) => t.priority === priorityFilter)
  }

  // 3. Sort by creation date
  result.sort((a, b) => {
    const diff = new Date(b.createdAt) - new Date(a.createdAt)
    return sortOrder === 'newest' ? diff : -diff
  })

  return result
}
