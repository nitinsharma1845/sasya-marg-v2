import React, { useState } from 'react'
import QueryStats from './components/QueryStats'
import QueryFilterTabs from './components/QueryFilterTab'
import QueryCard from './components/QueryCard'
import CreateQuerySheet from './components/CreateQuerySheet'
import { useFetchQueries } from '@/hooks/query.hooks'
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MessageCirclePlus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { Skeleton } from '@/components/ui/skeleton'

const SupportPage = () => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('all')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingQuery, setEditingQuery] = useState(null)
  const isActive = useAuthStore().user.isActive

  const { data, isLoading, isError, isFetching } = useFetchQueries({
    page: Number(page),
    filter
  })

  const handleCreateOpen = () => {
    setEditingQuery(null)
    setIsSheetOpen(true)
  }

  const handleEditOpen = query => {
    setEditingQuery(query)
    setIsSheetOpen(true)
  }

  const handleSheetClose = () => {
    setIsSheetOpen(false)
    setEditingQuery(null)
  }

  const QuerySkeleton = () => (
    <div className='flex flex-col md:flex-row gap-4 p-4 border border-border rounded-xl bg-card shadow-sm'>
      <div className='flex-1 space-y-3'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-24 bg-secondary' />
          <Skeleton className='h-5 w-16 rounded-full bg-secondary' />
        </div>
        <Skeleton className='h-6 w-3/4 bg-secondary' />
        <Skeleton className='h-4 w-full bg-secondary' />
      </div>
      <div className='flex md:flex-col justify-between items-end md:w-32 gap-2 shrink-0'>
        <Skeleton className='h-4 w-20 bg-secondary' />
        <Skeleton className='h-9 w-full md:w-24 rounded-lg bg-secondary' />
      </div>
    </div>
  )

  if (isError) {
    return (
      <div className='flex h-[50vh] flex-col items-center justify-center gap-2 text-destructive'>
        <AlertCircle className='h-8 w-8' />
        <p className='font-medium'>Failed to load support tickets.</p>
      </div>
    )
  }

  const responseData = data?.data
  const queries = responseData?.queries || []
  const totalPages = responseData?.pagination?.totalPages || 1
  const hasNextPage = responseData?.pagination?.hasNextPage || page < totalPages
  const hasPrevPage = responseData?.pagination?.hasPrevPage || page > 1

  const handleFilterChange = newFilter => {
    setFilter(newFilter)
    setPage(1)
  }

  return (
    <div className='min-h-screen bg-background p-4 md:p-8 space-y-6 animate-in fade-in duration-500'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-black tracking-tight text-foreground'>
            Help & Support
          </h1>
          <p className='text-sm text-muted-foreground font-medium'>
            Track your queries and get expert advice from the SasyaMarg team.
          </p>
        </div>
        <Button
          onClick={handleCreateOpen}
          className='bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg gap-2 cursor-pointer h-11 px-6 rounded-xl font-bold transition-all active:scale-95'
        >
          <MessageCirclePlus className='h-5 w-5' />
          <span className='hidden sm:inline uppercase tracking-wider text-xs'>
            Ask Question
          </span>
          <span className='sm:hidden'>Ask</span>
        </Button>
      </div>

      <div className='space-y-6'>
        <QueryFilterTabs activeTab={filter} onTabChange={handleFilterChange} />

        <div className='relative min-h-100'>
          <div className='flex flex-col gap-4'>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <QuerySkeleton key={i} />)
            ) : queries.length > 0 ? (
              <div
                className={
                  isFetching ? 'opacity-60 transition-opacity' : 'opacity-100'
                }
              >
                {queries.map(query => (
                  <QueryCard
                    key={query._id}
                    query={query}
                    onEdit={handleEditOpen}
                  />
                ))}
              </div>
            ) : (
              <div className='py-20 text-center border-2 border-dashed rounded-2xl border-border bg-muted/20'>
                <div className='bg-background w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-border'>
                  <AlertCircle className='h-6 w-6 text-muted-foreground' />
                </div>
                <h3 className='text-lg font-bold text-foreground'>
                  No tickets found
                </h3>
                <p className='text-sm text-muted-foreground mt-1'>
                  We couldn't find any queries matching your filter.
                </p>
              </div>
            )}
          </div>
        </div>

        {!isLoading && queries.length > 0 && (
          <div className='flex items-center justify-between border-t border-border pt-6 mt-6'>
            <div className='bg-card border border-border px-4 py-2 rounded-xl shadow-sm text-xs font-bold uppercase tracking-widest text-muted-foreground'>
              Page <span className='text-foreground'>{page}</span> of{' '}
              {totalPages}
            </div>
            <div className='flex gap-3'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => setPage(old => Math.max(old - 1, 1))}
                disabled={!hasPrevPage || isFetching}
                className='h-10 w-10 rounded-xl bg-card border-border shadow-sm hover:bg-secondary transition-colors cursor-pointer'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() => setPage(old => (hasNextPage ? old + 1 : old))}
                disabled={!hasNextPage || isFetching}
                className='h-10 w-10 rounded-xl bg-card border-border shadow-sm hover:bg-secondary transition-colors cursor-pointer '
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        )}
      </div>

      <CreateQuerySheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
        editData={editingQuery}
        forBlock={!isActive}
      />
    </div>
  )
}

export default SupportPage
