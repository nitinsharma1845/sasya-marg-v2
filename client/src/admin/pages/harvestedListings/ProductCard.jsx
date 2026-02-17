import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, User, AlertCircle, ImageOff } from 'lucide-react'
import { getOptimizedImg } from '@/lib/imageHelper'

const ProductCard = ({ product }) => {
  const {
    title = 'Untitled Listing',
    price = { value: 'N/A', unit: '' },
    stock = { value: 0, unit: 'units' },
    images = [],
    farmer = { fullname: 'Unknown Farmer' },
    farmland = { location: { locality: 'Unknown', district: 'Location' } },
    category = 'General',
    qualityGrade,
    createdAt,
    moderation = 'pending'
  } = product || {}

  const mainImage = images?.[0]?.url

  return (
    <Card className='group overflow-hidden border-muted bg-card hover:shadow-2xl transition-all duration-300'>
      <div className='relative aspect-4/3 overflow-hidden bg-muted flex items-center justify-center'>
        {mainImage ? (
          <img
            src={getOptimizedImg(mainImage)}
            alt={title}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
          />
        ) : (
          <div className='flex flex-col items-center gap-2 text-muted-foreground'>
            <ImageOff className='w-8 h-8' />
            <span className='text-[10px] uppercase font-semibold'>
              No Image Available
            </span>
          </div>
        )}

        <Badge className='absolute top-3 right-3 bg-background/90 text-foreground backdrop-blur-md border-none uppercase text-[10px] font-bold tracking-widest'>
          {qualityGrade || category || 'Standard'}
        </Badge>

        <Badge
          variant={
            moderation === 'approved'
              ? 'default'
              : moderation === 'rejected'
              ? 'destructive'
              : 'secondary'
          }
          className={
            'absolute bottom-3 right-3 uppercase font-bold tracking-widest'
          }
        >
          {moderation}
        </Badge>
      </div>

      <CardContent className='p-5 space-y-4'>
        <div>
          <h3 className='text-xl font-bold tracking-tight text-foreground/90 truncate'>
            {title}
          </h3>
          <div className='flex items-center gap-1 mt-1 text-muted-foreground'>
            <MapPin className='w-3.5 h-3.5 text-primary' />
            <span className='text-xs font-medium truncate'>
              {farmland?.location?.locality || 'Local Area'},{' '}
              {farmland?.location?.district || 'Unknown District'}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 py-3 border-y border-dashed border-muted'>
          <div className='space-y-1'>
            <p className='text-[10px] font-black uppercase tracking-tighter text-muted-foreground/80'>
              Price
            </p>
            <p className='text-2xl font-black text-primary flex items-baseline gap-0.5'>
              {typeof price.value === 'number' ? `₹${price.value}` : 'N/A'}
              <span className='text-xs font-medium text-muted-foreground'>
                {price.unit ? `/${price.unit.replace('per_', '')}` : ''}
              </span>
            </p>
          </div>
          <div className='space-y-1 text-right'>
            <p className='text-[10px] font-black uppercase tracking-tighter text-muted-foreground/80'>
              Stock
            </p>
            <p className='text-lg font-bold text-foreground/80'>
              {stock.value ?? 0}{' '}
              <span className='text-sm font-normal'>{stock.unit || 'qty'}</span>
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className='px-5 py-4 bg-muted/20 flex items-center justify-between'>
        <div className='flex items-center gap-2 max-w-[70%]'>
          <div className='h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0'>
            <User className='w-4 h-4 text-primary' />
          </div>
          <div className='truncate'>
            <p className='text-[11px] font-bold text-foreground/70 leading-none truncate'>
              {farmer?.fullname || 'Private Seller'}
            </p>
            <p className='text-[9px] text-muted-foreground mt-0.5 uppercase tracking-tighter'>
              {farmer?.fullname ? 'Verified Farmer' : 'Guest Listing'}
            </p>
          </div>
        </div>

        <div className='text-right shrink-0'>
          <p className='text-[10px] text-muted-foreground'>
            {createdAt
              ? new Date(createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short'
                })
              : 'Recently'}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
