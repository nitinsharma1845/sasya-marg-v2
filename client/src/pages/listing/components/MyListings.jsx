import React from 'react'
import { Sprout, Tractor } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MyHarvestedListings from './harvested/MyHarvestedListings'
import MyPreHarvestedListings from './pre-harvested/MyPreHarvestedListings'

const MyListings = () => {
  return (
    <div className='w-full'>
      <Tabs defaultValue='harvested-list' className='w-full'>
        <div className='border-b px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/10 rounded-t-xl'>
          <div className='flex flex-col'>
            <h3 className='font-semibold text-lg'>Your Inventory</h3>
            <p className='text-sm text-muted-foreground'>
              Manage existing listings and check status.
            </p>
          </div>

          <TabsList className='grid w-75 grid-cols-2'>
            <TabsTrigger value='harvested-list' className='gap-2'>
              <Tractor className='h-3.5 w-3.5' />
              Harvested
            </TabsTrigger>
            <TabsTrigger value='pre-harvest-list' className='gap-2'>
              <Sprout className='h-3.5 w-3.5' />
              Pre-Harvest
            </TabsTrigger>
          </TabsList>
        </div>

        <div className='p-4 sm:p-6 min-h-125'>
          <TabsContent value='harvested-list' className='mt-0'>
            <MyHarvestedListings />
          </TabsContent>

          <TabsContent value='pre-harvest-list' className='mt-0'>
            <MyPreHarvestedListings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default MyListings
