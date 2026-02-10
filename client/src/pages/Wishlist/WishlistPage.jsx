import AppLoader from '@/components/common/AppLoader'
import CardSkeleton from '@/components/common/CardSkeleton'
import { useGetWishlist } from '@/hooks/wishlist.hooks'
import React from 'react'
import EmptyWishlist from './components/EmptyWishlist'
import WishlistProductCard from './components/WishlistProductCard'

const WishlistPage = () => {
  const { data, isLoading } = useGetWishlist()

  const wishlists = data?.data?.listings || []

  return (
    <div className='min-h-screen w-full bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
        {wishlists.length !== 0 && (
          <div className='space-y-1'>
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>
              Track your products
            </h1>
            <p className='text-muted-foreground'>
              Wishlisted product shown here track the price and stock values.
            </p>
          </div>
        )}

        {isLoading ? (
          <CardSkeleton count={9} />
        ) : wishlists.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {wishlists.map(wishlist => {
                return (
                  <WishlistProductCard wishlist={wishlist} key={wishlist._id} />
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
