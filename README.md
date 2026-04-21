# TaskFlow — Task Manager App

A clean, modern task manager built with **React**, **Redux Toolkit**, and **Tailwind CSS**.  
Tasks are saved to `localStorage` so your data persists across page refreshes — no backend required.

---

## Features

- **Add Tasks** — Create a task with a title, optional description, and a priority level (Low / Medium / High)
- **Edit Tasks** — Update any task's title, description, or priority using the edit modal
- **Delete Tasks** — Remove a task instantly with the delete button on each card
- **Search** — Filter tasks in real time by typing in the search bar
- **Priority Filter** — Show only High, Medium, or Low priority tasks using the filter tabs
- **Sort** — Sort tasks by newest or oldest creation date
- **Reset Filters** — Clear all active search/filter settings in one click
- **Persistent Storage** — All tasks are saved to `localStorage` and restored on page load
- **Empty States** — Friendly UI when there are no tasks or no search results
- **Fully Responsive** — Works on mobile, tablet, and desktop screens

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Redux Toolkit | Global state management |
| React Redux | Connecting React to the Redux store |
| Tailwind CSS v3 | Utility-first styling |
| Vite | Build tool and dev server |
| localStorage | Client-side data persistence |

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Top navigation bar with brand + Add Task button
│   ├── TaskForm.jsx       # Modal form to create a new task
│   ├── TaskFilters.jsx    # Search, priority filter, and sort controls
│   ├── TaskList.jsx       # Renders the list of task cards
│   ├── TaskCard.jsx       # Individual task row with edit/delete actions
│   ├── EditTaskModal.jsx  # Modal form to edit an existing task
│   └── EmptyState.jsx     # Shown when no tasks exist or no results match
├── store/
│   ├── store.js           # Redux store + localStorage sync middleware
│   └── taskSlice.js       # Task actions, reducers, and selector
├── utils/
│   ├── localStorage.js    # loadTasks() and saveTasks() helpers
│   └── formatDate.js      # Formats ISO date strings for display
├── App.jsx                # Root layout — wires all components together
├── main.jsx               # React entry point with Redux Provider
└── index.css              # Tailwind directives + global styles
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) — version 18 or higher
- npm — comes bundled with Node.js

You can verify by running:

```bash
node -v
npm -v
```

---

### Installation

**1. Clone or download the project**

If you have Git:
```bash
git clone <your-repo-url>
cd Task_Manager
```

Or simply download the ZIP and extract it, then open a terminal inside the `Task_Manager` folder.

---

**2. Install dependencies**

```bash
npm install
```

This installs React, Redux Toolkit, Tailwind CSS, Vite, and all other required packages.

---

**3. Start the development server**

```bash
npm run dev
```

Vite will start a local server. Open your browser and go to:

```
http://localhost:5173
```

The app will hot-reload automatically whenever you save a file.

---

### Other Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production (output in `/dist`) |
| `npm run preview` | Preview the production build locally |

---

## How It Works

### State Management
All task data and filter state (search term, priority filter, sort order) live in a single Redux slice (`taskSlice.js`).  
A custom Redux middleware watches for any task mutation (add, edit, delete) and automatically writes the updated task array to `localStorage`.

### localStorage Persistence
On app startup, `loadTasks()` reads the saved task array from `localStorage` and sets it as the Redux initial state.  
On every task change, `saveTasks()` writes the latest array back — so data is never lost on refresh.

### Filtering & Sorting
The `selectFilteredTasks` selector in `taskSlice.js` applies search, priority filter, and sort order all in one pass — directly from Redux state — so no filter state needs to be passed as props.

---

## Assignment Details

- **Framework:** React + Vite
- **State:** Redux Toolkit (`createSlice`, `nanoid`, custom middleware)
- **Styling:** Tailwind CSS (utility-first, no external component library)
- **Storage:** Browser `localStorage` (no backend, no API)
- **Data per task:** `id`, `title`, `description`, `priority`, `createdAt`
