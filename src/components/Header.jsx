import { useSelector } from 'react-redux'

export default function Header({ onAdd }) {
  const count = useSelector((state) => state.tasks.tasks.length)

  return (
    <header className="bg-slate-900 border-b border-slate-800/80 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">

        {/* ── Brand ── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Gradient icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600
                          flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor"
                 strokeWidth="2.3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
                   M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2
                   m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span className="text-white font-bold text-[15px] tracking-tight">TaskFlow</span>
        </div>

        {/* ── Right side ── */}
        <div className="flex items-center gap-3">
          {/* Live task count */}
          {count > 0 && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg
                            bg-slate-800 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 text-xs font-medium tabular-nums">
                {count} {count === 1 ? 'task' : 'tasks'}
              </span>
            </div>
          )}

          {/* Add Task CTA */}
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                       text-white bg-gradient-to-r from-indigo-600 to-violet-600
                       shadow-lg shadow-indigo-500/25
                       hover:shadow-indigo-500/40 hover:brightness-110
                       active:scale-[0.97] transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                 strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

      </div>
    </header>
  )
}
