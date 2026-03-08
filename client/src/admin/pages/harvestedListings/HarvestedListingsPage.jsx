import PaginationComp from '@/admin/components/Pagination'
import { useGetAllHarvestedProducts } from '@/admin/hooks/moderation.hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from 'lucide-react'
import React from 'react'
import ProductCard from './ProductCard'
import Toolbar from './Toolbar'

const HarvestedListingsPage = () => {
  const { data, isLoading } = useGetAllHarvestedProducts()

  const products = data?.data?.listings || []
  const pagination = data?.data?.pagination || {}

  return (
    <div className='min-h-screen bg-background p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <Toolbar />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, i) => <ProductSkeleton key={i} />)
            : products.map(item => (
                <ProductCard key={item._id} product={item} />
              ))}
        </div>

        {!isLoading && products.length === 0 && (
          <div className='flex flex-col items-center justify-center py-32 space-y-4 opacity-50'>
            <div className='p-4 bg-muted rounded-full'>
              <Search className='w-10 h-10 text-muted-foreground' />
            </div>
            <p className='text-xl font-medium'>No results found for Products</p>
          </div>
        )}

        {pagination && <PaginationComp pagination={pagination} />}
      </div>
    </div>
  )
}

export default HarvestedListingsPage

const ProductSkeleton = () => (
  <Card className='overflow-hidden border-muted'>
    <Skeleton className='aspect-video w-full rounded-none bg-secondary' />
    <CardContent className='p-4 space-y-4'>
      <Skeleton className='h-6 w-2/3 bg-secondary' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full bg-secondary' />
        <Skeleton className='h-4 w-1/2 bg-secondary' />
      </div>
      <div className='flex justify-between pt-4'>
        <Skeleton className='h-10 w-20 bg-secondary' />
        <Skeleton className='h-10 w-20 bg-secondary' />
      </div>
    </CardContent>
  </Card>
)
