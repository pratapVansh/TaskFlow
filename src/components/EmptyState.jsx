/**
 * EmptyState
 *
 * variant="empty"    → no tasks have been created yet
 * variant="filtered" → tasks exist but none match the current filters
 */
export default function EmptyState({ variant, onAdd }) {

  /* ── No tasks at all ──────────────────────────────────── */
  if (variant === 'empty') {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">

        {/* Layered icon composition */}
        <div className="relative mb-8">
          {/* Decorative background cards */}
          <div className="absolute -top-3 -left-4 w-16 h-10 bg-indigo-50 rounded-xl
                          rotate-[-8deg] border border-indigo-100/80" />
          <div className="absolute -top-1  left-5  w-16 h-10 bg-violet-50 rounded-xl
                          rotate-[5deg]  border border-violet-100/80" />
          {/* Main icon */}
          <div className="relative w-20 h-20 rounded-2xl
                          bg-gradient-to-br from-indigo-500 to-violet-600
                          flex items-center justify-center
                          shadow-xl shadow-indigo-500/25">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor"
                 strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
                   M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2
                   m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>

        <h3 className="text-slate-900 font-bold text-lg mb-2 tracking-tight">
          No tasks yet
        </h3>
        <p className="text-slate-400 text-sm max-w-[240px] leading-relaxed mb-6">
          Create your first task to start tracking your work.
        </p>

        {/* CTA — triggers the same "New Task" modal as the header button */}
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       text-sm font-semibold text-white
                       bg-gradient-to-r from-indigo-600 to-violet-600
                       shadow-lg shadow-indigo-500/25
                       hover:brightness-110 active:scale-[0.97]
                       transition-all duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor"
                 strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create your first task
          </button>
        )}

      </div>
    )
  }

  /* ── No results after filtering ──────────────────────── */
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">

      {/* Icon */}
      <div className="relative mb-7">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl
                        flex items-center justify-center">
          <svg className="w-9 h-9 text-slate-300" fill="none" stroke="currentColor"
               strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* Decorative dots */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-slate-200/80" />
        <span className="absolute -bottom-1 -left-1.5 w-2 h-2 rounded-full bg-slate-200/80" />
      </div>

      <h3 className="text-slate-800 font-bold text-base mb-2 tracking-tight">
        No matching tasks
      </h3>
      <p className="text-slate-400 text-sm max-w-[240px] leading-relaxed">
        Try adjusting your search term or changing the priority filter.
      </p>

    </div>
  )
}
