import React, { useCallback } from 'react'
import { Edit, Package, Calendar, Scale, IndianRupee } from 'lucide-react'
import { format } from 'date-fns'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { getOptimizedImg } from '@/lib/imageHelper'
import { createPrefetch } from '@/lib/prefetch'

const HarvestedProductCard = React.memo(({ product }) => {
  const navigate = useNavigate()
  const {
    title,
    category,
    price,
    stock,
    images,
    moderation,
    isActive,
    createdAt,
    description
  } = product

  const mainImage = getOptimizedImg(images?.[0]?.url)

  const onClick = useCallback(() => {
    navigate(`harvested-product/${product._id}`)
  }, [navigate, product._id])

  const prefetchSingleProduct = createPrefetch(() =>
    import('../../SingleLProductPage')
  )

  const statusStyles = {
    approved: 'bg-primary text-primary-foreground',
    rejected: 'bg-destructive/80 text-destructive-foreground',
    pending: 'bg-accent text-accent-foreground '
  }

  return (
    <Card
      className={cn(
        'group overflow-hidden border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300',
        isActive
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
          className={cn(
            'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
            !isActive && 'grayscale-[0.8]'
          )}
        />

        <div className='absolute top-3 right-3 flex flex-col gap-2'>
          <Badge
            className={`capitalize shadow-sm border ${
              statusStyles[moderation] || statusStyles.pending
            }`}
          >
            {moderation}
          </Badge>

          <Badge
            variant={isActive ? 'default' : 'secondary'}
            className={
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground border-border shadow-sm'
            }
          >
            {isActive ? 'Active' : 'Hidden'}
          </Badge>
        </div>

        <div className='absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-4'>
          <p className='text-accent text-xs font-medium flex items-center gap-1'>
            <Calendar className='h-3 w-3' />
            Listed {format(new Date(createdAt), 'MMM d, yyyy')}
          </p>
        </div>
      </div>

      <CardContent className='p-5'>
        <div className='mb-4'>
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
                {price?.value}
              </p>
              <p className='text-xs text-muted-foreground'>
                / {price?.unit?.replace('per_', '')}
              </p>
            </div>
          </div>
          <p className='text-sm text-muted-foreground line-clamp-2 min-h-10'>
            {description}
          </p>
        </div>

        <Separator className='my-4 bg-border' />

        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-3 p-2 rounded-lg bg-muted/50 border border-border/50'>
            <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
              <Scale className='h-4 w-4' />
            </div>
            <div>
              <p className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold'>
                Stock
              </p>
              <p className='text-sm font-medium text-foreground'>
                {stock?.value}{' '}
                <span className='text-xs text-muted-foreground capitalize'>
                  {stock?.unit}
                </span>
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 p-2 rounded-lg bg-muted/50 border border-border/50'>
            <div className='h-8 w-8 rounded-full bg-accent/10 dark:bg-accent/40 flex items-center justify-center text-accent-foreground'>
              <Package className='h-4 w-4' />
            </div>
            <div>
              <p className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold'>
                Min Order
              </p>
              <p className='text-sm font-medium text-foreground'>
                10 <span className='text-xs text-muted-foreground'>Kg</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0 flex gap-2'>
        <Button
          className='flex-1 border-primary/20 hover:bg-primary/90 hover:text-primary-foreground cursor-pointer'
          onClick={onClick}
          onMouseEnter={prefetchSingleProduct}
          onTouchStart={prefetchSingleProduct}
        >
          <Edit className='mr-2 h-4 w-4' />
          Manage
        </Button>
      </CardFooter>
    </Card>
  )
})

export default HarvestedProductCard
