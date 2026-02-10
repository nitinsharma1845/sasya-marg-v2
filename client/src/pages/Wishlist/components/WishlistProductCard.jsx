import React from 'react'
import { Heart, ShoppingCart, MapPin } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getOptimizedImg } from '@/lib/imageHelper'
import { useNavigate } from 'react-router-dom'

const WishlistProductCard = ({ wishlist }) => {
  const navigate = useNavigate()
  const { item } = wishlist
  const mainImage = getOptimizedImg(item.images?.[0]?.url)

  function handleNavigateProduct () {
    if (item.productType === 'harvested') {
      navigate(`/buyer/product/harvested/${item._id}`)
    }else {
      navigate(`/buyer/product/pre-harvested/${item._id}`)
    }
  }

  return (
    <div className='w-full max-w-sm overflow-hidden border-border bg-card transition-all hover:shadow-md rounded-md shadow-xl'>
      <div className='relative aspect-video w-full overflow-hidden bg-muted'>
        <img
          src={mainImage}
          alt={item?.title}
          className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
        />
        <Badge className='absolute right-3 top-3 bg-accent text-accent-foreground hover:bg-accent/90'>
          {item?.category}
        </Badge>
      </div>

      <CardHeader className='p-4 pb-2'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-bold text-foreground line-clamp-1'>
              {item.title}
            </h3>
            <div className='flex items-center gap-1 text-xs text-muted-foreground mt-1'>
              <MapPin size={12} />
              <span>{item.productType}</span>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-lg font-bold text-primary'>
              ₹{item?.price?.value || item?.expectedPrice?.value}
            </p>
            <p className='text-[10px] text-muted-foreground uppercase tracking-wider'>
              {item?.price?.unit.replace('_', ' ') ||
                item?.expectedPrice?.unit.replace('_', ' ')}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-4 pt-0'>
        <p className='text-sm text-muted-foreground line-clamp-2 min-h-40px'>
          {item.description}
        </p>
        <div className='mt-3 flex items-center gap-2'>
          <Badge
            variant='secondary'
            className='bg-secondary text-secondary-foreground'
          >
            Stock: {item?.stock?.value || item?.expectedyeild?.value}{' '}
            {item.stock?.unit || item?.expectedyeild.unit}
          </Badge>
          {item.isActive && (
            <Badge
              variant='outline'
              className='border-primary text-primary text-[10px]'
            >
              Available
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <Button
          className='flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2'
          onClick={handleNavigateProduct}
        >
          <ShoppingCart size={16} />
          View Details
        </Button>
      </CardFooter>
    </div>
  )
}

export default WishlistProductCard
