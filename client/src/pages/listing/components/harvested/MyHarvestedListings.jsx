import React, { useState, useEffect } from 'react'
import { useMyListing } from '@/hooks/listing.hooks'
import { useDebounce } from '@/hooks/useDebounce'
import { ChevronLeft, ChevronRight, Search, Tractor, X } from 'lucide-react'
import ProductCard from './HarvestedProductCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const MyHarvestedListings = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [filters, setFilters] = useState({
    page: 1,
    limit: 3,
    moderation: undefined,
    isActive: undefined
  })

  const apiParams = {
    ...filters,
    search: debouncedSearch || undefined
  }

  const {
    data: productData,
    isLoading,
    isPlaceholderData
  } = useMyListing(apiParams)

  useEffect(() => {
    setFilters(prev => ({ ...prev, page: 1 }))
  }, [debouncedSearch])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value,
      page: 1
    }))
  }

  const handlePageChange = newPage => {
    setFilters(prev => ({ ...prev, page: newPage }))
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setFilters({
      page: 1,
      limit: 3,
      moderation: undefined,
      isActive: undefined
    })
  }

  const responseData = productData?.data || {}
  const listingItems = responseData.products || []
  const totalPages = responseData.pagination?.totalPages || 0
  const hasNextPage = filters.page < totalPages
  const hasPrevPage = filters.page > 1

  const ProductSkeleton = () => (
    <div className='rounded-xl border border-border bg-card p-4 space-y-4 shadow-sm'>
      <Skeleton className='h-48 w-full rounded-lg bg-secondary' />
      <div className='space-y-2'>
        <Skeleton className='h-5 w-2/3 bg-secondary' />
        <Skeleton className='h-4 w-full bg-secondary' />
      </div>
      <div className='flex justify-between items-center pt-2'>
        <Skeleton className='h-8 w-24 bg-secondary' />
        <Skeleton className='h-8 w-20 bg-secondary' />
      </div>
    </div>
  )

  return (
    <div className='space-y-6 animate-in slide-in-from-bottom-2 duration-500'>
      <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-background p-1'>
        <div className='relative w-full md:w-72'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          {searchTerm && (
            <X
              className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors cursor-pointer'
              onClick={() => setSearchTerm('')}
            />
          )}
          <Input
            placeholder='Search crop name...'
            className='pl-9 bg-muted/20 focus:bg-background transition-colors'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='flex flex-wrap gap-2 w-full md:w-auto'>
          <Select
            value={filters.moderation || 'all'}
            onValueChange={val => handleFilterChange('moderation', val)}
          >
            <SelectTrigger className='w-37.5 bg-muted/20 border-dashed cursor-pointer'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='approved'>Approved</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='rejected'>Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.isActive || 'all'}
            onValueChange={val => handleFilterChange('isActive', val)}
          >
            <SelectTrigger className='w-37.5 bg-muted/20 border-dashed cursor-pointer'>
              <SelectValue placeholder='Visibility' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Listings</SelectItem>
              <SelectItem value='true'>Active</SelectItem>
              <SelectItem value='false'>Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {isLoading
          ? Array.from({ length: filters.limit }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : listingItems.length > 0
          ? listingItems.map(product => (
              <ProductCard product={product} key={product._id} />
            ))
          : null}
      </div>

      {!isLoading && listingItems.length > 0 && (
        <div className='flex items-center justify-between border-t pt-4 mt-6'>
          <div className='text-sm text-muted-foreground'>
            Page{' '}
            <span className='font-medium text-foreground'>{filters.page}</span>{' '}
            of <span className='font-medium text-foreground'>{totalPages}</span>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={!hasPrevPage || isPlaceholderData}
              className={'cursor-pointer'}
            >
              <ChevronLeft className='h-4 w-4 mr-1' />
              Prev
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={!hasNextPage || isPlaceholderData}
              className={'cursor-pointer'}
            >
              Next
              <ChevronRight className='h-4 w-4 ml-1' />
            </Button>
          </div>
        </div>
      )}

      {!isLoading && listingItems.length === 0 && (
        <div className='flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl bg-muted/5'>
          <div className='h-14 w-14 bg-muted/50 rounded-full flex items-center justify-center mb-4'>
            <Tractor className='h-7 w-7 text-muted-foreground' />
          </div>
          <h3 className='text-lg font-semibold text-foreground'>
            No harvested crops found
          </h3>
          <p className='text-muted-foreground mt-2 text-sm max-w-sm'>
            We couldn't find any listings matching your current filters.
          </p>
          <Button
            variant='link'
            className='mt-2 text-primary font-medium cursor-pointer'
            onClick={clearAllFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default MyHarvestedListings
