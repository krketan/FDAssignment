import { useState, useEffect, useMemo } from 'react'
import Card from './components/card'
import Filters from './components/Filters'
import Pagination from './components/Pagination'

const userApi = 'https://randomuser.me/api/?results=1000';
const itemsPerPage = 10
const initialFilters = { search: '', category: '', dateFrom: '', dateTo: '', order: 'asc' }

function App() {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState(initialFilters)

  const userApiData = async () => {
    try {
      const response = await fetch(userApi)
      const data = await response.json()
      setAllUsers(data.results)
      console.log(data.results, 'allUsers')
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    userApiData()
  }, [])

  const categories = useMemo(
    () => [...new Set(allUsers.map((user) => user.nat))].sort(),
    [allUsers]
  )

  const filteredUsers = useMemo(() => {
    const term = filters.search.trim().toLowerCase()
    const from = filters.dateFrom ? new Date(`${filters.dateFrom}T00:00:00`) : null
    const to = filters.dateTo ? new Date(`${filters.dateTo}T23:59:59.999`) : null

    const result = allUsers.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
      if (term && !fullName.includes(term)) return false
      if (filters.category && user.nat !== filters.category) return false
      const registered = new Date(user.registered.date)
      if (from && registered < from) return false
      if (to && registered > to) return false
      return true
    })

    const direction = filters.order === 'asc' ? 1 : -1
    return result.sort((a, b) =>
      `${a.name.first} ${a.name.last}`.localeCompare(`${b.name.first} ${b.name.last}`) * direction
    )
  }, [allUsers, filters])

  const handleFilterChange = (next) => {
    setFilters(next)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <main className='container'>
      <h1>Random User Data</h1>
      {error && <p>Error: {error.message}</p>}
      <Filters
        filters={filters}
        categories={categories}
        onChange={handleFilterChange}
        onReset={() => handleFilterChange(initialFilters)}
      />
      <section className='cardContainer flex flex-wrap p-4 gap-4'>
        {paginatedUsers.length > 0 ? (
          <Card user={paginatedUsers} />
        ) : (
          <p className='w-full text-center'>No users found.</p>
        )}
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </main>
  )
}
export default App
