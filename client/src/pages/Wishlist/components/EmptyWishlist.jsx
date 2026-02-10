import React from 'react'
import { ShoppingBag, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const EmptyWishlist = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center p-6 bg-background'>
      <div className='relative mb-6'>
        <div className='absolute inset-0 bg-secondary rounded-full blur-2xl opacity-50 scale-150' />
        <div className='relative bg-card border-2 border-border p-8 rounded-full shadow-sm'>
          <ShoppingBag size={64} className='text-muted-foreground opacity-40' />
          <div className='absolute -bottom-1 -right-1 bg-accent p-2 rounded-full border-2 border-card'>
            <Search size={20} className='text-accent-foreground' />
          </div>
        </div>
      </div>

      <div className='text-center max-w-md space-y-4'>
        <h1 className='text-3xl font-bold text-foreground tracking-tight'>
          Your wishlist is empty
        </h1>
        <p className='text-muted-foreground'>
          It looks like you haven't saved any crops or harvested items to your
          wishlist yet. Explore the marketplace to find the best deals for your
          farm.
        </p>
      </div>

      <div className='mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-sm'>
        <Button
          className='flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8'
          onClick={() => navigate('/buyer/product/harvested')}
        >
          Explore Marketplace
        </Button>
        <Button
          variant='outline'
          className='flex-1 border-border text-foreground hover:bg-secondary h-12 px-8 gap-2'
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
      </div>

      <Card className='mt-12 p-6 border-dashed border-2 border-border bg-transparent max-w-lg'>
        <div className='flex items-center gap-4'>
          <div className='bg-chart-2/10 p-3 rounded-lg'>
            <span className='text-chart-2 font-bold text-xl'>💡</span>
          </div>
          <div className='text-left'>
            <h4 className='font-semibold text-foreground'>Quick Tip</h4>
            <p className='text-sm text-muted-foreground'>
              Click the heart icon on any product card in the marketplace to
              save items here for later review.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default EmptyWishlist
