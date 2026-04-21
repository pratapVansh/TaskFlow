import { useSelector } from 'react-redux'
import { selectFilteredTasks } from '../store/taskSlice'
import TaskCard from './TaskCard'
import EmptyState from './EmptyState'

export default function TaskList({ onEdit, onAdd }) {
  const tasks      = useSelector(selectFilteredTasks)
  const totalTasks = useSelector((s) => s.tasks.tasks.length)

  /* No tasks at all yet */
  if (totalTasks === 0) {
    return <EmptyState variant="empty" onAdd={onAdd} />
  }

  /* Tasks exist but none match current filters */
  if (tasks.length === 0) {
    return <EmptyState variant="filtered" />
  }

  const showing  = tasks.length
  const isSubset = showing < totalTasks

  return (
    <section>
      {/* Result count */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-slate-400 font-medium">
          {isSubset ? (
            <>
              Showing{' '}
              <span className="text-slate-600 font-semibold">{showing}</span>
              {' '}of{' '}
              <span className="text-slate-600 font-semibold">{totalTasks}</span>
              {' '}{totalTasks === 1 ? 'task' : 'tasks'}
            </>
          ) : (
            <>
              <span className="text-slate-600 font-semibold">{totalTasks}</span>
              {' '}{totalTasks === 1 ? 'task' : 'tasks'}
            </>
          )}
        </p>
      </div>

      {/* Single-column task list */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} />
        ))}
      </div>
    </section>
  )
}
