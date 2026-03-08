import React, { useCallback } from 'react'
import {
  Edit,
  Sprout,
  Calendar,
  MapPin,
  IndianRupee,
  Scale
} from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { getOptimizedImg } from '@/lib/imageHelper'
import { createPrefetch } from '@/lib/prefetch'

const PreHarvestCardFarmer = React.memo(({ listing }) => {
  const {
    title,
    category,
    expectedPrice,
    expectedyeild,
    minimumOrderQuantity,
    sowingDate,
    expectedHarvest,
    farmland,
    images,
    moderation,
    status,
    qualityGrade
  } = listing

  const navigate = useNavigate()
  const onClick = useCallback(() => {
    navigate(`pre-harvested-product/${listing._id}`)
  }, [navigate, listing._id])

  const prefetchSingleProduct = createPrefetch(() =>
    import('../../SinglePreHarvestProductPage')
  )

  const mainImage = getOptimizedImg(images?.[0]?.url)

  const daysToHarvest = differenceInDays(new Date(expectedHarvest), new Date())
  const totalDuration = differenceInDays(
    new Date(expectedHarvest),
    new Date(sowingDate)
  )
  const progress = Math.min(
    100,
    Math.max(0, ((totalDuration - daysToHarvest) / totalDuration) * 100)
  )

  const statusStyles = {
    approved: 'bg-primary text-primary-foreground',
    rejected: 'bg-destructive/80 text-destructive-foreground',
    pending: 'bg-accent text-accent-foreground '
  }

  const bookingStatus = {
    open: 'bg-primary text-primary-foreground',
    canceled: 'bg-destructive/80 text-destructive-foreground',
    harvested: 'bg-accent text-accent-foreground ',
    booked: 'bg-chart-2 text-accent-foreground '
  }

  return (
    <Card
      className={cn(
        'group overflow-hidden border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300',
        status !== 'cancelled'
          ? 'bg-card border-border hover:shadow-md hover:border-primary/20'
          : 'bg-muted/30 border-dashed border-muted-foreground/30 opacity-80 hover:opacity-100'
      )}
    >
      <div className='relative h-48 w-full overflow-hidden bg-muted'>
        <img
          src={mainImage}
          alt={title}
          loading='lazy'
          decoding='async'
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        <div className='absolute top-3 right-3 flex flex-col gap-2'>
          <Badge
            className={`capitalize shadow-sm backdrop-blur-md border ${
              statusStyles[moderation] || statusStyles.pending
            }`}
          >
            {moderation}
          </Badge>

          <Badge
            variant={status === 'open' ? 'default' : 'secondary'}
            className={`capitalize shadow-sm backdrop-blur-md border ${
              bookingStatus[status] || statusStyles.pending
            }`}
          >
            {status}
          </Badge>
        </div>

        <div className='absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-4'>
          <div className='flex justify-between items-end'>
            <div className='text-white'>
              <p className='text-[10px] opacity-80 uppercase tracking-wider font-semibold mb-1'>
                Harvesting In
              </p>
              <p className='text-sm font-bold flex items-center gap-1.5'>
                <Calendar className='h-3.5 w-3.5 text-accent' />
                {format(new Date(expectedHarvest), 'MMM d, yyyy')}
              </p>
            </div>
            {qualityGrade && (
              <Badge
                className={cn(
                  'bg-accent text-accent-foreground hover:bg-accent border-none  p-0 flex items-center justify-center font-bold shadow-lg',
                  qualityGrade === 'organic' ? 'p-2' : 'h-6 w-6 rounded-full'
                )}
              >
                {qualityGrade}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardContent className='p-5 flex-1 flex flex-col gap-4'>
        <div>
          <div className='flex justify-between items-start mb-2 gap-2'>
            <div>
              <Badge
                variant='outline'
                className='mb-2 text-xs font-normal border-primary/20 text-primary bg-primary/5 capitalize'
              >
                {category}
              </Badge>
              <h3 className='font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors'>
                {title}
              </h3>
            </div>
            <div className='text-right shrink-0'>
              <p className='text-xl font-bold text-primary flex items-center justify-end'>
                <IndianRupee className='h-4 w-4' />
                {expectedPrice?.value}
              </p>
              <p className='text-xs text-muted-foreground'>
                / {expectedPrice?.unit?.replace('per_', '')}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-1.5 text-sm text-muted-foreground mb-3'>
            <MapPin className='h-3.5 w-3.5' />
            <span className='truncate'>
              {farmland?.location?.locality}, {farmland?.location?.state}
            </span>
          </div>

          <div className='space-y-1.5'>
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Growth Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress
              value={progress}
              className='h-1.5 bg-muted'
              indicatorClassName='bg-primary'
            />
          </div>
        </div>

        <Separator className='bg-border' />

        <div className='grid grid-cols-2 gap-3'>
          <div className='p-2.5 rounded-lg bg-muted/40 border border-border/40 flex flex-col gap-1'>
            <span className='text-[10px] text-muted-foreground uppercase tracking-wide font-semibold flex items-center gap-1'>
              <Sprout className='h-3 w-3' /> Est. Yield
            </span>
            <span className='text-sm font-medium text-foreground'>
              {expectedyeild?.value} {expectedyeild?.unit}
            </span>
          </div>

          <div className='p-2.5 rounded-lg bg-muted/40 border border-border/40 flex flex-col gap-1'>
            <span className='text-[10px] text-muted-foreground uppercase tracking-wide font-semibold flex items-center gap-1'>
              <Scale className='h-3 w-3' /> Min Order
            </span>
            <span className='text-sm font-medium text-foreground'>
              {minimumOrderQuantity?.value} {minimumOrderQuantity?.unit}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0 flex gap-2 mt-auto'>
        <Button
          onMouseEnter={prefetchSingleProduct}
          onTouchStart={prefetchSingleProduct}
          onClick={onClick}
          className='flex-1 border-primary/20 hover:bg-primary/90 hover:text-primary-foreground cursor-pointer'
        >
          <Edit className='mr-2 h-4 w-4' />
          Manage
        </Button>
      </CardFooter>
    </Card>
  )
})

export default PreHarvestCardFarmer
