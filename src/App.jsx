import { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import EditTaskModal from './components/EditTaskModal'

/* ── Stat pill ──────────────────────────────────────────────── */
const STAT_CONFIG = [
  { key: 'total',  label: 'Total',  cls: 'bg-slate-100  text-slate-600  ring-1 ring-slate-200'  },
  { key: 'high',   label: 'High',   cls: 'bg-rose-50    text-rose-600   ring-1 ring-rose-100'   },
  { key: 'medium', label: 'Medium', cls: 'bg-amber-50   text-amber-600  ring-1 ring-amber-100'  },
  { key: 'low',    label: 'Low',    cls: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' },
]

function StatPill({ label, count, cls }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold ${cls}`}>
      <span className="text-sm font-bold tabular-nums leading-none">{count}</span>
      <span className="opacity-60 font-medium">{label}</span>
    </div>
  )
}

/* ── App ─────────────────────────────────────────────────────── */
export default function App() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [taskToEdit,  setTaskToEdit]  = useState(null)

  const tasks = useSelector((s) => s.tasks.tasks)
  const stats = {
    total:  tasks.length,
    high:   tasks.filter((t) => t.priority === 'High').length,
    medium: tasks.filter((t) => t.priority === 'Medium').length,
    low:    tasks.filter((t) => t.priority === 'Low').length,
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  function openAdd()  { setShowAddForm(true) }
  function closeAdd() { setShowAddForm(false) }

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Sticky dark nav ── */}
      <Header onAdd={openAdd} />

      {/* ── Page body ── */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 py-10 space-y-8">

        {/* Page title row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 mb-1.5">
              Dashboard
            </p>
            <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              My Tasks
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              Everything in one place — organised by priority.
            </p>
          </div>
          <p className="text-slate-400 text-xs font-medium shrink-0 sm:pb-1">{today}</p>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap gap-2">
          {STAT_CONFIG.map(({ key, label, cls }) => (
            <StatPill key={key} label={label} count={stats[key]} cls={cls} />
          ))}
        </div>

        {/* Filter / search card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80
                        shadow-card px-4 py-3.5">
          <TaskFilters />
        </div>

        {/* Task grid */}
        <TaskList
          onEdit={(task) => setTaskToEdit(task)}
          onAdd={openAdd}
        />

      </main>

      {/* ── Modals ── */}
      {showAddForm && <TaskForm  onClose={closeAdd} />}
      {taskToEdit  && <EditTaskModal task={taskToEdit} onClose={() => setTaskToEdit(null)} />}

    </div>
  )
}
