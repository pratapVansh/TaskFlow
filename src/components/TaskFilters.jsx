import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, setPriorityFilter, setSortOrder } from '../store/taskSlice'

const PRIORITIES = ['All', 'High', 'Medium', 'Low']

/* Each priority tab is coloured by what it represents */
const PILL_ACTIVE = {
  All:    'bg-slate-800   text-white shadow-sm',
  High:   'bg-rose-500    text-white shadow-sm shadow-rose-500/30',
  Medium: 'bg-amber-400   text-white shadow-sm shadow-amber-400/25',
  Low:    'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25',
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
]

export default function TaskFilters() {
  const dispatch = useDispatch()
  const search   = useSelector((s) => s.tasks.searchTerm)
  const priority = useSelector((s) => s.tasks.priorityFilter)
  const sort     = useSelector((s) => s.tasks.sortOrder)

  /* Any active filter that narrows results */
  const hasActiveFilters = search.trim() !== '' || priority !== 'All'

  function clearFilters() {
    dispatch(setSearchTerm(''))
    dispatch(setPriorityFilter('All'))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">

      {/* ── Search ─────────────────────────────────────────── */}
      <div className="relative flex-1">
        {/* Search icon */}
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>

        <input
          type="text"
          placeholder="Search tasks by title…"
          value={search}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white
                     text-sm text-slate-700 placeholder-slate-400
                     focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400
                     transition-all duration-150"
        />

        {/* Clear search ×  */}
        {search && (
          <button
            onClick={() => dispatch(setSearchTerm(''))}
            className="absolute right-2.5 top-1/2 -translate-y-1/2
                       w-5 h-5 flex items-center justify-center
                       rounded-full bg-slate-200 text-slate-500
                       hover:bg-slate-300 transition"
            aria-label="Clear search"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Priority filter pills ─────────────────────────── */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200/60">
        {PRIORITIES.map((p) => (
          <button
            key={p}
            onClick={() => dispatch(setPriorityFilter(p))}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold
                        transition-all duration-150 ${
              priority === p
                ? PILL_ACTIVE[p]
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/70'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ── Sort ─────────────────────────────────────────── */}
      <div className="relative">
        {/* Sort icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
        <select
          value={sort}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
          className="pl-8 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white
                     text-sm text-slate-700 appearance-none cursor-pointer
                     focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400
                     transition-all duration-150"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        {/* Chevron */}
        <svg
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* ── Clear all filters (only when something is active) ── */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold
                     border border-slate-200 bg-white text-slate-500
                     hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200
                     active:scale-[0.97] transition-all duration-150 shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reset
        </button>
      )}

    </div>
  )
}
