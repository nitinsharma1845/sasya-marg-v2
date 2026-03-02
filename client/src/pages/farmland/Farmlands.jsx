import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sprout,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Maximize2
} from 'lucide-react'
import { useFetchFarmlands } from '@/hooks/farmer.hooks'
import { useDebounce } from '@/hooks/useDebounce'
import FarmlandCard from './components/FarmlandCard'
import AddFarmlandCard from './components/AddFarmlandCard'
import FarmlandFilter from './components/Farmlandfillters'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

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

  if (
    !isLoading &&
    farmlands.length === 0 &&
    !debouncedSearch &&
    status === 'active' &&
    pagination.total === 0
  ) {
    return (
      <div className='relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4'>
        <Card className='relative w-full max-w-lg overflow-hidden rounded-3xl border bg-card text-card-foreground shadow-xl'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--secondary),transparent)] opacity-50' />
          <CardHeader className='relative flex flex-col items-center gap-4 px-6 pt-10 text-center'>
            <div className='relative flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary ring-1 ring-border shadow-inner'>
              <Sprout className='h-10 w-10 text-primary' strokeWidth={1.5} />
            </div>
            <CardTitle className='text-2xl font-black tracking-tight text-foreground mt-4'>
              Start Your Farming Journey
            </CardTitle>
            <CardDescription className='max-w-xs text-base leading-relaxed text-muted-foreground'>
              Add your first farmland to unlock AI-driven crop guidance.
            </CardDescription>
          </CardHeader>
          <CardContent className='relative flex justify-center px-6 pb-10'>
            <Button
              onClick={() => navigate('/farmer/farmland/add')}
              size='lg'
              className='rounded-xl bg-primary text-primary-foreground font-bold px-8 active:scale-95 transition-transform'
            >
              Add Farmland
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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
          {isLoading ? (
            Array.from({ length: 9 }).map((_, i) => (
              <FarmlandSkeleton key={i} />
            ))
          ) : farmlands.length > 0 ? (
            <>
              {farmlands.map(farm => (
                <FarmlandCard farmland={farm} key={farm._id} />
              ))}
              {status === 'active' && farmlands.length < 9 && (
                <AddFarmlandCard />
              )}
            </>
          ) : (
            <div className='col-span-full py-24 text-center flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-4xl border-2 border-dashed border-border w-full'>
              <div className='h-16 w-16 bg-background rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-border'>
                <Sprout className='h-8 w-8 text-muted-foreground/50' />
              </div>
              <p className='text-xl font-bold text-foreground'>
                No farmlands found
              </p>
              <p className='text-sm max-w-62.5 mt-2 opacity-70'>
                {debouncedSearch
                  ? `We couldn't find any results for "${debouncedSearch}"`
                  : 'Adjust your status filters to find archived or inactive plots.'}
              </p>
              <Button
                variant='link'
                className='mt-4 text-primary font-bold'
                onClick={() => {
                  setSearchTerm('')
                  setStatus('active')
                }}
              >
                Clear all filters
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
            className='h-10 w-10 rounded-xl bg-card border-border shadow-sm hover:bg-secondary transition-colors'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          <div className='bg-card border border-border px-4 py-2 rounded-xl shadow-sm text-xs font-bold uppercase tracking-widest text-muted-foreground'>
            Page <span className='text-foreground'>{page}</span> of{' '}
            {pagination.totalPages}
          </div>

          <Button
            variant='outline'
            size='icon'
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages || isFetching}
            className='h-10 w-10 rounded-xl bg-card border-border shadow-sm hover:bg-secondary transition-colors'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Farmlands
