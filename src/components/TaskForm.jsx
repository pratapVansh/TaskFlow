import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../store/taskSlice'

/* ── Priority config ─────────────────────────────────────────── */
const PRIORITIES = ['Low', 'Medium', 'High']

const PRIORITY_ACTIVE = {
  Low:    'border-emerald-400 bg-emerald-50   text-emerald-700',
  Medium: 'border-amber-400  bg-amber-50    text-amber-700',
  High:   'border-rose-400   bg-rose-50     text-rose-700',
}

const PRIORITY_DOT = {
  Low: 'bg-emerald-500', Medium: 'bg-amber-400', High: 'bg-rose-500',
}

const INITIAL = { title: '', description: '', priority: 'Medium' }
const TITLE_MAX = 80
const DESC_MAX  = 300

/* ── Component ───────────────────────────────────────────────── */
export default function TaskForm({ onClose }) {
  const dispatch   = useDispatch()
  const titleRef   = useRef(null)
  const [form, setForm]     = useState(INITIAL)
  const [errors, setErrors] = useState({})

  /* Auto-focus the title field as soon as the modal opens */
  useEffect(() => { titleRef.current?.focus() }, [])

  /* Close on Escape key */
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Please enter a task title.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    dispatch(addTask(form))
    setForm(INITIAL)   // explicit reset (good practice)
    onClose()
  }

  function handleChange(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors((err) => ({ ...err, [field]: '' }))
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                 bg-slate-900/60 backdrop-blur-md px-4 pb-4 sm:pb-0
                 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden
                      shadow-modal animate-fade-up">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="px-6 pt-6 pb-5 flex items-start gap-4 border-b border-slate-100">
          {/* Gradient icon */}
          <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center
                          bg-gradient-to-br from-indigo-500 to-violet-600
                          shadow-lg shadow-indigo-500/25">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                 strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-slate-900">New Task</h2>
            <p className="text-xs text-slate-400 mt-0.5">Fill in the details below.</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-xl shrink-0
                       text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Form ───────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="field-label">
                Title <span className="text-rose-400 normal-case tracking-normal">*</span>
              </label>
              <span className={`text-[10px] font-medium tabular-nums
                               transition-colors duration-150 ${
                form.title.length > TITLE_MAX - 10
                  ? form.title.length >= TITLE_MAX ? 'text-rose-400' : 'text-amber-400'
                  : 'text-slate-300'
              }`}>
                {form.title.length}/{TITLE_MAX}
              </span>
            </div>

            <input
              ref={titleRef}
              type="text"
              value={form.title}
              onChange={handleChange('title')}
              placeholder="e.g. Design the homepage hero"
              maxLength={TITLE_MAX}
              className={`field-input ${errors.title ? 'field-input-error' : ''}`}
            />

            {errors.title && (
              <p className="field-error">
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                {errors.title}
              </p>
            )}
          </div>

          {/* Description — optional */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="field-label">Description</label>
              <span className="text-[10px] font-medium text-slate-300 tabular-nums">
                {form.description.length}/{DESC_MAX}
              </span>
            </div>

            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Briefly describe what needs to be done… (optional)"
              rows={3}
              maxLength={DESC_MAX}
              className="field-input resize-none scrollbar-thin"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="field-label mb-2">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, priority: p }))}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl
                              border-2 text-xs font-semibold transition-all duration-150 ${
                    form.priority === p
                      ? PRIORITY_ACTIVE[p]
                      : 'border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    form.priority === p ? PRIORITY_DOT[p] : 'bg-slate-300'
                  }`} />
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold
                         text-slate-600 hover:bg-slate-50 active:scale-[0.98]
                         transition-all duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white
                         bg-gradient-to-r from-indigo-600 to-violet-600
                         shadow-lg shadow-indigo-500/25
                         hover:brightness-110 active:scale-[0.98]
                         transition-all duration-150"
            >
              Create Task
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
