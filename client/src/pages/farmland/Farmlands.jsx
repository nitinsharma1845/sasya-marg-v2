import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sprout, ChevronLeft, ChevronRight } from 'lucide-react'
import { useFetchFarmlands } from '@/hooks/farmer.hooks'
import { useDebounce } from '@/hooks/useDebounce'
import FarmlandCard from './components/FarmlandCard'
import AddFarmlandCard from './components/AddFarmlandCard'
import FarmlandFilter from './components/Farmlandfillters'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

const Farmlands = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('active')

  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status])

  const { data, isLoading, isFetching } = useFetchFarmlands({
    page,
    limit: 9,
    search: debouncedSearch,
    status
  })

  const farmlands = data?.data?.farmland || []
  const pagination = data?.data?.pagination || {
    totalPages: 1,
    page: 1,
    total: 0
  }

  const hasFilters = debouncedSearch || status !== 'active'
  const noFarmlandInDB = pagination.total === 0
  const showEmptyFiltered = farmlands.length === 0 && hasFilters
  const showAddFirstFarmland =
    farmlands.length === 0 && !hasFilters && noFarmlandInDB

  const handleFilterChange = newStatus => {
    setStatus(newStatus)
  }

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const FarmlandSkeleton = () => (
    <Card className='w-full h-70 rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm'>
      <div className='flex justify-between items-start'>
        <div className='space-y-2 flex-1'>
          <Skeleton className='h-6 w-3/4 bg-secondary' />
          <Skeleton className='h-4 w-1/2 bg-secondary' />
        </div>
        <Skeleton className='h-10 w-10 rounded-xl bg-secondary' />
      </div>
      <div className='flex gap-4 pt-2'>
        <Skeleton className='h-12 flex-1 rounded-xl bg-secondary' />
        <Skeleton className='h-12 flex-1 rounded-xl bg-secondary' />
      </div>
      <div className='flex justify-between items-center pt-2'>
        <Skeleton className='h-8 w-24 rounded-lg bg-secondary' />
        <Skeleton className='h-4 w-16 bg-secondary' />
      </div>
    </Card>
  )

  return (
    <div className='min-h-screen bg-background space-y-6 p-6 animate-in fade-in duration-500'>
      <div className='sticky top-14 z-20 bg-background/80 backdrop-blur-md pt-2 pb-4 border-b border-border/50 -mx-6 px-6'>
        <FarmlandFilter
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={handleFilterChange}
          currentFilter={status}
        />
      </div>

      <div className='relative min-h-100'>
        <div className='grid place-items-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          {isLoading &&
            Array.from({ length: 9 }).map((_, i) => (
              <FarmlandSkeleton key={i} />
            ))}

          {!isLoading && farmlands.length > 0 && (
            <>
              {farmlands.map(farm => (
                <FarmlandCard farmland={farm} key={farm._id} />
              ))}

              {status === 'active' && farmlands.length < 9 && (
                <AddFarmlandCard />
              )}
            </>
          )}

          {!isLoading && showAddFirstFarmland && (
            <div className='col-span-full flex flex-col items-center justify-center py-24 text-center'>
              <div className='h-16 w-16 bg-secondary rounded-2xl flex items-center justify-center mb-4'>
                <Sprout className='h-8 w-8 text-primary' />
              </div>

              <p className='text-xl font-bold'>Start Your Farming Journey</p>

              <p className='text-sm text-muted-foreground mt-2 max-w-sm'>
                Add your first farmland to unlock crop prediction and farm
                management features.
              </p>

              <Button
                className='mt-6'
                onClick={() => navigate('/farmer/farmland/add')}
              >
                Add Farmland
              </Button>
            </div>
          )}

          {!isLoading && showEmptyFiltered && (
            <div className='col-span-full py-24 text-center flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-4xl border-2 border-dashed border-border w-full'>
              <div className='h-16 w-16 bg-background rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-border'>
                <Sprout className='h-8 w-8 text-muted-foreground/50' />
              </div>

              <p className='text-xl font-bold text-foreground'>
                No farmlands found
              </p>

              <p className='text-sm max-w-64 mt-2 opacity-70'>
                {debouncedSearch
                  ? `No results found for "${debouncedSearch}"`
                  : 'Try changing your filters.'}
              </p>

              <Button
                variant='link'
                className='mt-4 font-bold'
                onClick={() => {
                  setSearchTerm('')
                  setStatus('active')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {!isLoading && pagination.totalPages > 1 && (
        <div className='flex items-center justify-center gap-4 py-10 mt-6 border-t border-border/50'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isFetching}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          <div className='px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest'>
            Page {page} of {pagination.totalPages}
          </div>

          <Button
            variant='outline'
            size='icon'
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages || isFetching}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Farmlands
