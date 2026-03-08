import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getOptimizedImg } from '@/lib/imageHelper'
import { createPrefetch } from '@/lib/prefetch'
import { MapPin } from 'lucide-react'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const PreHarvestProductCard = React.memo(({ product }) => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(product._id)
  }, [navigate, product._id])

  const prefetchSinglePage = createPrefetch(() => import('./SingleProductPage'))

  const displayPrice = product.price ||
    product.expectedPrice || { value: 0, unit: '' }
  const displayStock = product.stock ||
    product.expectedyeild || { value: 0, unit: '' }
  const isPreHarvest = product.productType === 'pre-harvest'

  const formatUnit = unit =>
    unit ? unit.replace('per_', '/ ').replace('_', ' ') : ''

  return (
    <div className='group rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all'>
      <div className='relative h-52 bg-muted overflow-hidden'>
        <img
          src={getOptimizedImg(product.images?.[0]?.url)}
          alt={product.title}
          loading='lazy'
          decoding='async'
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />

        <Badge className='absolute top-3 left-3 capitalize shadow-sm z-20'>
          {product.category}
        </Badge>

        <Badge
          variant='secondary'
          className='absolute top-3 right-3 capitalize shadow-sm z-20'
        >
          {product.productType?.replace('-', ' ')}
        </Badge>

        {product?.isWishlisted && (
          <Badge
            variant='secondary'
            className='absolute bottom-3 left-3 capitalize shadow-sm z-20'
          >
            Wishlisted
          </Badge>
        )}

        <div className='absolute w-full h-full pointer-events-none bg-linear-to-t from-black/10 to-transparent top-0 left-0 z-10' />
      </div>

      <div className='p-4 space-y-3'>
        <div>
          <h3 className='text-lg font-semibold text-foreground line-clamp-1'>
            {product.title}
          </h3>
          <p className='text-xs text-muted-foreground line-clamp-2 mt-1'>
            {product.description}
          </p>
        </div>

        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
          <MapPin className='h-3.5 w-3.5' />
          <span className='truncate'>
            {product.farmland?.location?.district},{' '}
            {product.farmland?.location?.state}
          </span>
        </div>

        <div className='flex items-center justify-between text-sm bg-secondary/50 p-3 rounded-md border border-secondary'>
          <span className='text-muted-foreground text-xs uppercase tracking-wide'>
            {isPreHarvest ? 'Est. Yield' : 'Stock'}
          </span>
          <span className='font-medium text-foreground'>
            {displayStock?.value}{' '}
            <span className='text-xs font-normal text-muted-foreground'>
              {displayStock?.unit}
            </span>
          </span>
        </div>

        <div className='flex items-center justify-between pt-2'>
          <div>
            <p className='text-xs text-muted-foreground'>Price</p>
            <p className='text-xl font-bold text-primary'>
              ₹{displayPrice?.value}
              <span className='text-sm font-normal text-muted-foreground ml-0.5'>
                {formatUnit(displayPrice?.unit)}
              </span>
            </p>
          </div>

          <Button
            size='sm'
            onClick={handleClick}
            onMouseEnter={prefetchSinglePage}
            onTouchStart={prefetchSinglePage}
            className='cursor-pointer shadow-sm hover:shadow-md transition-all'
          >
            {isPreHarvest ? 'View Details' : 'Buy Now'}
          </Button>
        </div>
      </div>
    </div>
  )
})

export default PreHarvestProductCard
