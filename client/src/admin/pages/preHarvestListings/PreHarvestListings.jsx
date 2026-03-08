import { useGetAllPreHarvestedProducts } from '@/admin/hooks/moderation.hooks'
import ProductCard from './ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import PaginationComp from '../../components/Pagination'
import Toolbar from '../harvestedListings/Toolbar'
import { Search } from 'lucide-react'

const ProductCardSkeleton = () => (
  <div className='w-full max-w-md border border-border rounded-lg overflow-hidden bg-card'>
    <Skeleton className='h-48 w-full bg-secondary' />
    <div className='p-4 space-y-4'>
      <div className='flex justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-32 bg-secondary' />
          <Skeleton className='h-4 w-24 bg-secondary' />
        </div>
        <Skeleton className='h-8 w-16 bg-secondary' />
      </div>
      <Skeleton className='h-16 w-full bg-secondary' />
      <div className='grid grid-cols-2 gap-4'>
        <Skeleton className='h-12 w-full bg-secondary' />
        <Skeleton className='h-12 w-full bg-secondary' />
      </div>
    </div>
  </div>
)

const PreHarvestListings = () => {
  const { data, isLoading } = useGetAllPreHarvestedProducts()

  const listings = data?.data?.listings || []
  const pagination = data?.data?.pagination

  return (
    <div className='min-h-screen bg-background p-6 flex flex-col'>
      {/* <header className='mb-8'>
        <h1 className='text-3xl font-bold text-foreground'>
          Pre-Harvest Listings
        </h1>
        <p className='text-muted-foreground'>
          Manage and moderate upcoming crop harvests
        </p>
      </header> */}

      <Toolbar />

      <div className='grow mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : listings.length > 0 ? (
            listings.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className='col-span-full flex flex-col items-center justify-center py-20 text-center'>
              <h3 className='text-xl font-semibold text-foreground flex flex-col justify-center items-center gap-3'>
                <Search className='w-10 h-10 text-muted-foreground' />
                No listings found
              </h3>
              <p className='text-muted-foreground'>
                There are currently no pre-harvest products to display.
              </p>
            </div>
          )}
        </div>
      </div>

      {!isLoading && pagination && pagination.totalPages > 1 && (
        <div className='mt-12 py-6 border-t border-border flex justify-center'>
          <PaginationComp pagination={pagination} />
        </div>
      )}
    </div>
  )
}

export default PreHarvestListings
