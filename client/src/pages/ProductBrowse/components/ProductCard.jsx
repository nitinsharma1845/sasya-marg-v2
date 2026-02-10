import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getOptimizedImg } from '@/lib/imageHelper'
import { Heart, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  return (
    <div className='group rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all'>
      <div className='relative h-52 bg-muted overflow-hidden'>
        <img
          src={getOptimizedImg(product.images?.[0]?.url)}
          alt={product.title}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />

        <Badge className='absolute top-3 left-3 capitalize'>
          {product.category}
        </Badge>

        <Badge
          variant='secondary'
          className='absolute top-3 right-3 capitalize'
        >
          {product.productType}
        </Badge>

        {product?.isWishlisted && (
          <Badge
            variant='secondary'
            className='absolute bottom-3 left-3 capitalize shadow-sm z-20'
          >
            Wishlisted
          </Badge>
        )}
        <div className='absolute w-full h-full overflow-hidden dark:bg-black/30 top-0 left-0 z-10' />

        {/* <div className='absolute bottom-3 right-3 z-30'>
          <Heart className='h-7 w-7 fill-accent text-accent'/>
        </div> */}
        {/* Add logic for wishlist */}
      </div>

      <div className='p-4 space-y-3'>
        <div>
          <h3 className='text-lg font-semibold text-foreground line-clamp-1'>
            {product.title}
          </h3>
          <p className='text-xs text-muted-foreground line-clamp-2'>
            {product.description}
          </p>
        </div>

        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
          <MapPin className='h-4 w-4' />
          <span>
            {product.farmland.location?.district},{' '}
            {product.farmland.location?.state}
          </span>
        </div>

        <div className='flex items-center justify-between text-sm bg-secondary p-3 rounded-sm'>
          <span className='text-muted-foreground'>Stock</span>
          <span className='font-medium text-foreground'>
            {product.stock?.value} {product.stock?.unit}
          </span>
        </div>

        <div className='flex items-center justify-between pt-2'>
          <div>
            <p className='text-xs text-muted-foreground'>Price</p>
            <p className='text-xl font-bold text-primary'>
              ₹{product.price?.value}
              <span className='text-sm font-normal text-muted-foreground'>
                /{product.price?.unit.replace('_', ' ')}
              </span>
            </p>
          </div>

          <Button
            size='sm'
            onClick={() => navigate(`${product._id}`)}
            className={'cursor-pointer'}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
