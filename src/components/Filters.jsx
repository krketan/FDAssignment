const Filters = ({ filters, categories, onChange, onReset }) => {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value })

  return (
    <div className='flex flex-wrap items-end justify-center gap-4 p-4'>
      <label className='flex flex-col text-sm gap-1'>
        Search
        <input
          type='text'
          placeholder='Search by name'
          value={filters.search}
          onChange={update('search')}
          className='border rounded px-2 py-1'
        />
      </label>

      <label className='flex flex-col text-sm gap-1'>
        Category (nationality)
        <select
          value={filters.category}
          onChange={update('category')}
          className='border rounded px-2 py-1'
        >
          <option value=''>All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <label className='flex flex-col text-sm gap-1'>
        Registered from
        <input
          type='date'
          value={filters.dateFrom}
          max={filters.dateTo || undefined}
          onChange={update('dateFrom')}
          className='border rounded px-2 py-1'
        />
      </label>

      <label className='flex flex-col text-sm gap-1'>
        Registered to
        <input
          type='date'
          value={filters.dateTo}
          min={filters.dateFrom || undefined}
          onChange={update('dateTo')}
          className='border rounded px-2 py-1'
        />
      </label>

      <label className='flex flex-col text-sm gap-1'>
        Sort by name
        <select
          value={filters.order}
          onChange={update('order')}
          className='border rounded px-2 py-1'
        >
          <option value='asc'>Ascending (A–Z)</option>
          <option value='desc'>Descending (Z–A)</option>
        </select>
      </label>

      <button
        type='button'
        onClick={onReset}
        className='border rounded px-3 py-1'
      >
        Reset
      </button>
    </div>
  )
}

export default Filters
