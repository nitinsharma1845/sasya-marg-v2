import { useGetAllSchemes } from '@/admin/hooks/scheme.hooks'
import React from 'react'
import SchemeCard from './SchemeCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import PaginationComp from '@/admin/components/Pagination'
import Toolbar from './ToolBar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { createPrefetch } from '@/lib/prefetch'

const SchemeSkeleton = () => (
  <Card className='h-full border-border bg-card'>
    <div className='p-6 space-y-4'>
      <div className='flex justify-between'>
        <Skeleton className='h-6 w-3/4 bg-secondary' />
        <Skeleton className='h-6 w-16 bg-secondary' />
      </div>
      <Skeleton className='h-4 w-full bg-secondary' />
      <Skeleton className='h-4 w-2/3 bg-secondary' />
      <Skeleton className='h-20 w-full rounded-md bg-secondary' />
      <div className='space-y-2'>
        <Skeleton className='h-10 w-full bg-secondary' />
        <Skeleton className='h-10 w-full bg-secondary' />
      </div>
    </div>
  </Card>
)

const GovSchemes = () => {
  const { data, isLoading } = useGetAllSchemes()
  const navigate = useNavigate()
  const prefetchAddScheme = createPrefetch(() => import('./AddScheme'))

  const schemes = data?.data?.schemes || []
  const pagination = data?.data?.pagination || {}

  return (
    <div className='min-h-screen bg-background p-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <Toolbar />

        <Button
          onClick={() => navigate('/admin/dashboard/schemes/add')}
          onMouseEnter={prefetchAddScheme}
          onTouchStart={prefetchAddScheme}
          className='bg-primary text-primary-foreground hover:bg-primary/90'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Scheme
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <SchemeSkeleton />
            </div>
          ))
        ) : schemes.length > 0 ? (
          schemes.map(scheme => <SchemeCard key={scheme._id} scheme={scheme} />)
        ) : (
          <div className='col-span-full py-20 text-center'>
            <h3 className='text-xl font-semibold text-foreground'>
              No schemes found
            </h3>
            <p className='text-muted-foreground mt-2'>
              Try adding a new scheme to get started.
            </p>

            <Button
              onClick={() => navigate('/admin/schemes/add')}
              className='mt-6 bg-primary text-primary-foreground hover:bg-primary/90'
            >
              <Plus className='mr-2 h-4 w-4' />
              Add First Scheme
            </Button>
          </div>
        )}
      </div>

      {pagination && <PaginationComp pagination={pagination} />}
    </div>
  )
}

export default GovSchemes
