import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

const CardSkeleton = ({ count }) => {
  return (
    <div className='flex flex-col gap-6 mx-auto'>
      {Array.from({ length: count }).map((_, id) => (
        <Card className={'p-7'} key={id}>
          <div className='flex justify-between items-center '>
            <div className='flex flex-col gap-2'>
              <Skeleton className={'w-50 h-5 bg-secondary'} />
              <Skeleton className={'w-20 h-3 bg-secondary'} />
            </div>
            <Skeleton className={'w-20 h-5 rounded-full bg-secondary'} />
          </div>
          <div className='m-5'>
            <Skeleton className={'w-full h-20 bg-secondary'} />
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-2'>
              <Skeleton className={'w-20 h-3  bg-secondary'} />
              <Skeleton className={'w-30 h-5 bg-secondary'} />
            </div>
            <div className='flex flex-col gap-2'>
              <Skeleton className={'w-20 h-3 bg-secondary'} />
              <Skeleton className={'w-30 h-5 bg-secondary'} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default CardSkeleton
