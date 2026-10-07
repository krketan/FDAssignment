const getPageItems = (currentPage, totalPages, siblings = 1) => {
  const maxButtons = siblings * 2 + 5
  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const left = Math.max(currentPage - siblings, 2)
  const right = Math.min(currentPage + siblings, totalPages - 1)
  const showLeftDots = left > 2
  const showRightDots = right < totalPages - 1
  const items = [1]

  if (showLeftDots) items.push('left-ellipsis')
  else for (let i = 2; i < left; i++) items.push(i)

  for (let i = left; i <= right; i++) items.push(i)

  if (showRightDots) items.push('right-ellipsis')
  else for (let i = right + 1; i < totalPages; i++) items.push(i)

  items.push(totalPages)
  return items
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const items = getPageItems(currentPage, totalPages)

  return (
    <nav aria-label='Pagination' className='flex flex-col items-center gap-3 pb-6'>
      <p>Page {currentPage} of {totalPages}</p>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        <button
          type='button'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='border rounded px-3 py-1 disabled:opacity-50'
        >
          Prev
        </button>

        {items.map((item) =>
          typeof item === 'string' ? (
            <span key={item} className='px-2' aria-hidden='true'>…</span>
          ) : (
            <button
              type='button'
              key={item}
              onClick={() => onPageChange(item)}
              aria-current={currentPage === item ? 'page' : undefined}
              className={`border rounded px-3 py-1 ${
                currentPage === item ? 'bg-black text-white' : ''
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          type='button'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='border rounded px-3 py-1 disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </nav>
  )
}

export default Pagination
