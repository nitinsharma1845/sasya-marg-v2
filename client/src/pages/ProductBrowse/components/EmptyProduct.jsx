import React from 'react'
import { Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useSearchParams } from 'react-router-dom'

const EmptyProducts = () => {
  const [, setParams] = useSearchParams()

  const clearFilters = () => {
    setParams(
      {
        page: 1,
        limit: 9
      },
      { replace: true }
    )
  }

  return (
    <div className='flex flex-col items-center justify-center py-24 text-center space-y-6'>
      <div className='bg-muted p-6 rounded-full'>
        <Store className='w-12 h-12 text-muted-foreground' />
      </div>
      <div className='max-w-md space-y-2'>
        <h3 className='text-2xl font-bold text-foreground'>
          No product found to sell
        </h3>
        <p className='text-muted-foreground'>
          Browse the marketplace and save your favorite crops here to track
          their prices and availability.
        </p>
      </div>
      <Button
        variant='link'
        className='mt-4 cursor-pointer'
        size='sm'
        onClick={clearFilters}
      >
        Clear filter
      </Button>
    </div>
  )
}

export default EmptyProducts
