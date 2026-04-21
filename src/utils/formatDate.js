/**
 * Format an ISO date string into a readable short date.
 * e.g. "2024-04-21T10:30:00.000Z" → "Apr 21, 2024"
 */
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
