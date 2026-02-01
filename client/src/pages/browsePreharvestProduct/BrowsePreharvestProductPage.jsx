import React from 'react'
import { useGetPreHarvestProducts } from '@/hooks/product.hooks'
import AppLoader from '@/components/common/AppLoader'
import ProductToolbar from '../ProductBrowse/components/ProductToolbar'
import CardSkeleton from '@/components/common/CardSkeleton'
import EmptyProducts from '../ProductBrowse/components/EmptyProduct'
import ProductPagination from '../ProductBrowse/components/ProductPagination'
import PreHarvestProductCard from './components/PreharvestProductCard'
import ToolBar from './components/ToolBar'

const BrowsePreharvestProductPage = () => {
  const { data, isLoading, isFetching } = useGetPreHarvestProducts()

  const listings = data?.data?.listings ?? []
  const pagination = data?.data?.pagination

  console.log('Data', data)

  return (
    <>
      <div className='min-h-screen bg-background w-full'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
          <div className='space-y-1'>
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>
              Explore Harvested Products
            </h1>
            <p className='text-muted-foreground'>
              Browse and explore the crops harvested yet!
            </p>
          </div>

          <ToolBar />

          {isLoading ? (
            <CardSkeleton count={9} />
          ) : listings.length === 0 ? (
            <EmptyProducts />
          ) : (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {listings.map(item => (
                  <PreHarvestProductCard key={item._id} product={item} />
                ))}
              </div>

              {pagination && <ProductPagination pagination={pagination} />}
            </>
          )}

          {isFetching && !isLoading && (
            <p className='text-xs text-muted-foreground'>Updating results…</p>
          )}
        </div>
      </div>
    </>
  )
}

export default BrowsePreharvestProductPage
