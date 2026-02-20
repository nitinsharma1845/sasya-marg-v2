import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarDays, MapPin, User, Weight, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const formatDate = dateString =>
    new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

  return (
    <Card
      onClick={() => navigate(`${product._id}`)}
      className='w-full max-w-md overflow-hidden transition-all hover:shadow-lg border-border bg-card text-card-foreground'
    >
      <div className='relative h-48 w-full bg-muted'>
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full items-center justify-center text-muted-foreground'>
            No Image Available
          </div>
        )}
        <Badge className='absolute top-3 right-3 capitalize shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary'>
          {product.productType}
        </Badge>
        <Badge className='absolute top-3 left-3 bg-primary text-primary-foreground hover:bg-primary'>
          Grade {product.qualityGrade}
        </Badge>
      </div>

      <CardHeader className='pb-2'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-xl font-bold'>{product.title}</h3>
            <div className='flex items-center text-sm text-muted-foreground mt-1'>
              <MapPin className='mr-1 h-3 w-3' />
              {product.farmland.name}
            </div>
          </div>
          <div className='text-right'>
            <p className='text-lg font-bold text-primary'>
              ₹{product.expectedPrice?.value}
            </p>
            <p className='text-xs text-muted-foreground'>
              per {product.expectedPrice?.unit.replace('_', ' ')}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4 pb-4'>
        <div className='grid grid-cols-2 gap-4 bg-secondary p-3 rounded-(--radius) border border-border'>
          <div className='space-y-1'>
            <span className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center'>
              <Weight className='mr-1 h-3 w-3' /> Yield
            </span>
            <p className='text-sm font-medium text-secondary-foreground'>
              {product.expectedyeild?.value} {product.expectedyeild?.unit}
            </p>
          </div>
          <div className='space-y-1'>
            <span className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center'>
              <Tag className='mr-1 h-3 w-3' /> Min. Order
            </span>
            <p className='text-sm font-medium text-secondary-foreground'>
              {product.minimumOrderQuantity?.value}{' '}
              {product.minimumOrderQuantity?.unit}
            </p>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span className='flex items-center text-muted-foreground'>
              <CalendarDays className='mr-2 h-4 w-4' /> Harvest
            </span>
            <span className='font-medium'>
              {formatDate(product.expectedHarvest)}
            </span>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground italic'>Status</span>
            <Badge
              variant='outline'
              className='text-[10px] uppercase font-bold border-border text-foreground'
            >
              {product.status}
            </Badge>
          </div>
        </div>
      </CardContent>

      <Separator className='bg-border' />

      <CardFooter className='pt-4 flex justify-between items-center bg-muted/30'>
        <div className='flex items-center space-x-2'>
          <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center'>
            <User className='h-4 w-4 text-primary' />
          </div>
          <div>
            <p className='text-xs font-semibold leading-none'>
              {product.farmer.fullname}
            </p>
            <p className='text-[10px] text-muted-foreground'>
              {product.farmer.phone}
            </p>
          </div>
        </div>
        <Badge className='bg-accent text-accent-foreground hover:bg-accent border-none text-[10px]'>
          {product.moderation}
        </Badge>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
