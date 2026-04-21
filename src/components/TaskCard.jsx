import { useDispatch } from 'react-redux'
import { deleteTask } from '../store/taskSlice'
import { formatDate } from '../utils/formatDate'

/* ── Priority tokens ────────────────────────────────────────── */
const ACCENT = {
  High:   'bg-rose-500',
  Medium: 'bg-amber-400',
  Low:    'bg-emerald-500',
}

const BADGE = {
  High:   'bg-rose-50    text-rose-600   ring-1 ring-rose-200/70',
  Medium: 'bg-amber-50   text-amber-600  ring-1 ring-amber-200/70',
  Low:    'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/70',
}

const DOT = {
  High: 'bg-rose-500', Medium: 'bg-amber-400', Low: 'bg-emerald-500',
}

/* ── Calendar icon ──────────────────────────────────────────── */
function CalendarIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor"
         strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

/* ── Component ───────────────────────────────────────────────── */
export default function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch()

  return (
    <article
      className="group flex w-full bg-white rounded-2xl overflow-hidden
                 border border-slate-100 shadow-md
                 hover:shadow-lg hover:-translate-y-0.5
                 transition-all duration-200 ease-out"
    >
      {/* ── Left accent bar (priority colour) ── */}
      <div className={`w-1 shrink-0 ${ACCENT[task.priority]}`} />

      {/* ── Centre: badge · title · description ── */}
      <div className="flex flex-1 items-start gap-4 px-5 py-4 min-w-0">

        {/* Priority badge — stays fixed width so title always aligns */}
        <span
          className={`mt-0.5 inline-flex items-center gap-1.5
                      text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0
                      ${BADGE[task.priority]}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT[task.priority]}`} />
          {task.priority}
        </span>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[15px] text-slate-900 leading-snug
                         truncate overflow-hidden mb-1">
            {task.title}
          </h3>

          {task.description && (
            <p className="text-slate-500 text-[13px] leading-relaxed
                          line-clamp-2 overflow-hidden">
              {task.description}
            </p>
          )}

          {/* Date shown inline on mobile (hidden on sm+, shown in right panel) */}
          <div className="flex items-center gap-1.5 mt-2.5 text-slate-400
                          text-[11px] font-medium sm:hidden">
            <CalendarIcon />
            {formatDate(task.createdAt)}
          </div>
        </div>

      </div>

      {/* ── Right panel: date · divider · actions ── */}
      <div className="flex items-center gap-3 px-4 py-4 shrink-0">

        {/* Date — desktop only */}
        <div className="hidden sm:flex items-center gap-1.5
                        text-slate-400 text-[11px] font-medium whitespace-nowrap">
          <CalendarIcon />
          {formatDate(task.createdAt)}
        </div>

        {/* Visual separator */}
        <div className="hidden sm:block w-px h-5 bg-slate-100" />

        {/* Action buttons
            On desktop: low opacity at rest, full on hover (keeps the row clean).
            On mobile:  always full opacity (no hover on touch screens). */}
        <div className="flex items-center gap-0.5
                        sm:opacity-40 group-hover:opacity-100
                        transition-opacity duration-150">

          <button
            onClick={() => onEdit(task)}
            title="Edit task"
            className="w-8 h-8 flex items-center justify-center rounded-lg
                       text-slate-400 hover:text-indigo-600 hover:bg-indigo-50
                       transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor"
                 strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                   m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <button
            onClick={() => dispatch(deleteTask(task.id))}
            title="Delete task"
            className="w-8 h-8 flex items-center justify-center rounded-lg
                       text-slate-400 hover:text-rose-600 hover:bg-rose-50
                       transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor"
                 strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7
                   m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

        </div>
      </div>

    </article>
  )
}
