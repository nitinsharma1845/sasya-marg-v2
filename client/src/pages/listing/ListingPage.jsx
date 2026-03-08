import React, { lazy, Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sprout, Tractor, LayoutDashboard } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { createPrefetch } from '@/lib/prefetch'

const PreHarvestForm = lazy(() =>
  import('./components/pre-harvested/PreHarvestedForm')
)
const HarvestedForm = lazy(() => import('./components/harvested/HarvestedForm'))
const MyListings = lazy(() => import('./components/MyListings'))

const prefetchOverview = createPrefetch(() => import('./components/MyListings'))

const prefetchHarvested = createPrefetch(() =>
  import('./components/harvested/HarvestedForm')
)

const prefetchPreHarvest = createPrefetch(() =>
  import('./components/pre-harvested/PreHarvestedForm')
)

const ListingPage = () => {
  return (
    <div className='min-h-screen w-full bg-background p-4 md:p-8 animate-in fade-in duration-500'>
      <div className='mx-auto container space-y-8'>
        <div className='flex flex-col space-y-2'>
          <Badge
            variant='outline'
            className='w-fit text-primary border-primary/20 px-3 py-1 text-xs uppercase tracking-widest bg-primary/5'
          >
            Seller Dashboard
          </Badge>
          <h1 className='text-3xl md:text-4xl font-bold text-foreground tracking-tight'>
            Marketplace Management
          </h1>
          <p className='text-muted-foreground text-lg max-w-2xl'>
            Track your inventory, manage stock levels, and list new crops for
            sale—all in one place.
          </p>
        </div>

        <Tabs defaultValue='overview' className='w-full space-y-6'>
          <div className='flex items-center justify-between'>
            <TabsList className='grid w-full md:w-auto grid-cols-3 h-12 bg-muted/40 p-1 rounded-xl gap-2'>
              <TabsTrigger
                value='overview'
                onMouseEnter={prefetchOverview}
                onTouchStart={prefetchOverview}
                className='data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg flex gap-2 items-center px-4 cursor-pointer'
              >
                <LayoutDashboard className='h-4 w-4' />
                <span className='hidden sm:inline'>Overview</span>
              </TabsTrigger>

              <TabsTrigger
                value='harvested'
                onMouseEnter={prefetchHarvested}
                onTouchStart={prefetchHarvested}
                className='data-[state=active]:bg-background data-[state=active]:text-destructive/90 data-[state=active]:shadow-sm rounded-lg flex gap-2 items-center px-4 cursor-pointer'
              >
                <Tractor className='h-4 w-4' />
                <span className='hidden sm:inline'>Sell Harvested</span>
              </TabsTrigger>

              <TabsTrigger
                value='pre-harvest'
                onMouseEnter={prefetchPreHarvest}
                onTouchStart={prefetchPreHarvest}
                className='data-[state=active]:bg-background data-[state=active]:text-primary/90 data-[state=active]:shadow-sm rounded-lg flex gap-2 items-center px-4 cursor-pointer'
              >
                <Sprout className='h-4 w-4' />
                <span className='hidden sm:inline'>Pre-Booking</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className='bg-card border rounded-xl shadow-sm p-1'>
            <Suspense fallback={null}>
              <TabsContent
                value='overview'
                className='m-0 focus-visible:outline-none'
              >
                <MyListings />
              </TabsContent>

              <TabsContent
                value='harvested'
                className='m-0 focus-visible:outline-none p-4 md:p-6'
              >
                <div className='max-w-3xl mx-auto'>
                  <div className='mb-6'>
                    <h2 className='text-xl font-semibold'>
                      List Harvested Stock
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                      For crops already harvested and ready for delivery.
                    </p>
                  </div>
                  <HarvestedForm />
                </div>
              </TabsContent>

              <TabsContent
                value='pre-harvest'
                className='m-0 focus-visible:outline-none p-4 md:p-6'
              >
                <div className='max-w-3xl mx-auto'>
                  <div className='mb-6'>
                    <h2 className='text-xl font-semibold'>
                      Pre-Harvest Booking
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                      Secure buyers before you even harvest.
                    </p>
                  </div>
                  <PreHarvestForm />
                </div>
              </TabsContent>
            </Suspense>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default ListingPage
