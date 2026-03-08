import React, { useState } from 'react'
import {
  MapPin,
  Edit,
  Leaf,
  Package,
  CalendarDays,
  ArrowLeft,
  Store,
  AlertCircle,
  CheckCircle2,
  Clock,
  TriangleAlert
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetProductById,
  useUpdatePrice,
  useUpdateProduct,
  useUpdateStock
} from '@/hooks/listing.hooks'
import AppLoader from '@/components/common/AppLoader'
import UpdateStockDialog from './components/harvested/UpdateStockDialog'
import UpdatePriceDialog from './components/harvested/UpdatePriceDialog'
import UpdateProductDialog from './components/harvested/UpdateProductDialog'

const ProductViewPage = () => {
  const { id } = useParams()
  const getProduct = useGetProductById(id)
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(null)
  const updateStock = useUpdateStock()
  const updatePrice = useUpdatePrice()
  const updateProdct = useUpdateProduct()

  const formatPrice = val =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(val)

  const formatUnit = unit => unit?.replace('per_', '/ ').replace('_', ' ')

  const formatDate = dateString =>
    new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  if (getProduct.isLoading) {
    return <AppLoader />
  }

  const product = getProduct.data?.data
  const currentImage = activeImage || product?.images?.[0]?.url

  const handleStockUpdate = async (productId, payload) => {
    updateStock.mutate({ productId, payload })
  }

  const handlePriceUpdate = async (productId, payload) => {
    updatePrice.mutate({ productId, payload })
  }

  const handleProductUpdate = async (productId, payload) => {
    updateProdct.mutate({ payload, productId })
  }

  return (
    <div className='min-h-screen bg-background pb-20 font-sans text-foreground'>
      <div className='bg-card border-b border-border sticky top-0 z-10 px-4 py-3 md:px-8 flex items-center justify-between shadow-sm'>
        <div className='flex items-center md:gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => navigate(-1)}
            className='rounded-full hover:bg-muted text-muted-foreground'
          >
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <div>
            <h1 className='text-lg font-semibold text-foreground hidden md:block'>
              Product Details
            </h1>
            <span className='text-xs text-muted-foreground md:hidden'>
              Back
            </span>
          </div>
        </div>

        <div className='flex gap-2'>
          <Badge
            variant='outline'
            className='capitalize border-border bg-muted text-foreground'
          >
            {product?.moderation === 'pending' && (
              <Clock className='w-3 h-3 mr-1 text-accent' />
            )}
            {product?.moderation === 'approved' && (
              <CheckCircle2 className='w-3 h-3 mr-1 text-primary' />
            )}
            {product?.moderation}
          </Badge>

          <UpdateProductDialog
            title={product.title}
            description={product.description}
            onUpdate={handleProductUpdate}
            productId={product._id}
            isActive={product.isActive}
          />
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 md:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          <div className='lg:col-span-7 space-y-4'>
            <div className='relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm group'>
              <img
                loading='lazy'
                decoding='async'
                src={currentImage}
                alt={product?.title}
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute top-4 left-4'>
                <Badge className='bg-card/90 text-foreground hover:bg-card backdrop-blur-sm shadow-sm border-0 px-3 py-1 text-xs uppercase tracking-wide font-medium'>
                  {product?.category}
                </Badge>
              </div>
            </div>

            {product?.images?.length > 0 && (
              <div className='flex gap-4 overflow-x-auto pb-2'>
                {product.images.map(img => (
                  <button
                    key={img._id}
                    onClick={() => setActiveImage(img.url)}
                    className={`relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === img.url
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      loading='lazy'
                      decoding='async'
                      src={img.url}
                      alt=''
                      className='h-full w-full object-cover'
                    />
                  </button>
                ))}
              </div>
            )}

            <Card className='border-border shadow-sm mt-6 bg-card'>
              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold text-foreground mb-3 flex items-center gap-2'>
                  <Leaf className='h-5 w-5 text-primary' />
                  Description
                </h3>
                <p className='text-muted-foreground leading-relaxed whitespace-pre-line'>
                  {product?.description || 'No description provided.'}
                </p>

                <Separator className='my-6 bg-border' />

                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                  <div>
                    <span className='text-xs text-muted-foreground uppercase tracking-wider block mb-1'>
                      Product Type
                    </span>
                    <span className='text-sm font-medium capitalize text-foreground bg-secondary px-2 py-1 rounded-lg inline-block'>
                      {product?.productType}
                    </span>
                  </div>
                  <div>
                    <span className='text-xs text-muted-foreground uppercase tracking-wider block mb-1'>
                      Listed On
                    </span>
                    <span className='text-sm font-medium text-foreground flex items-center gap-1'>
                      <CalendarDays className='h-3 w-3' />
                      {product?.createdAt && formatDate(product.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className='text-xs text-muted-foreground uppercase tracking-wider block mb-1'>
                      Quality ID
                    </span>
                    <span
                      className='text-sm font-mono text-foreground truncate'
                      title={product?._id}
                    >
                      #{product?._id?.slice(-6).toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='lg:col-span-5 space-y-6'>
            <Card className='border-border shadow-md overflow-hidden bg-card'>
              <div className='bg-muted/50 p-6 border-b border-border'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h2 className='text-2xl font-bold text-foreground'>
                      {product?.title}
                    </h2>
                    <div className='flex items-center gap-2 mt-2 text-sm text-muted-foreground'>
                      <MapPin className='h-4 w-4 text-primary' />
                      {product?.farmland?.location?.locality},{' '}
                      {product?.farmland?.location?.state}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className='p-6 space-y-6'>
                <div className='flex flex-col md:flex-row md:items-end items-start md:justify-between gap-2 bg-secondary/30 p-4 rounded-lg border border-border'>
                  <div>
                    <p className='text-sm text-muted-foreground font-medium mb-1'>
                      Selling Price
                    </p>
                    <div className='flex items-baseline gap-1'>
                      <span className='md:text-3xl text-2xl font-bold text-primary'>
                        {product?.price?.value &&
                          formatPrice(product.price.value)}
                      </span>
                      <span className='text-muted-foreground font-medium'>
                        {product?.price?.unit && formatUnit(product.price.unit)}
                      </span>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm text-muted-foreground font-medium mb-1'>
                      Available Stock
                    </p>
                    <div className='flex items-center justify-end gap-2'>
                      <Package className='h-5 w-5 text-muted-foreground' />
                      <span className='text-xl font-bold text-foreground'>
                        {product?.stock?.value}
                      </span>
                      <span className='text-sm text-muted-foreground'>
                        {product?.stock?.unit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <UpdatePriceDialog
                    onUpdate={handlePriceUpdate}
                    currentPrice={product.price.value}
                    currentUnit={product.price.unit}
                    productId={product._id}
                  />

                  <UpdateStockDialog
                    onUpdate={handleStockUpdate}
                    productId={product._id}
                    currentStock={product.stock.value}
                    currentUnit={product.stock.unit}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className='border-border shadow-sm bg-card'>
              <CardContent className='p-0'>
                <div className='p-4 border-b border-border flex items-center gap-3'>
                  <div className='h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary-foreground'>
                    <Store className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground'>
                      Source Farmland
                    </h4>
                    <p className='text-xs text-muted-foreground'>
                      Origin of produce
                    </p>
                  </div>
                </div>
                <div className='p-4 space-y-3'>
                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-muted-foreground'>Farm Name</span>
                    <span className='font-medium text-foreground'>
                      {product?.farmland?.name}
                    </span>
                  </div>
                  <Separator className='bg-border' />
                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-muted-foreground'>Land Size</span>
                    <span className='font-medium text-foreground'>
                      {product?.farmland?.size?.value}{' '}
                      {product?.farmland?.size?.unit}
                    </span>
                  </div>
                  <Separator className='bg-border' />
                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-muted-foreground'>District</span>
                    <span className='font-medium text-foreground'>
                      {product?.farmland?.location?.district}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {product?.moderation === 'pending' && (
              <div className='bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3 items-start'>
                <AlertCircle className='h-5 w-5 text-accent shrink-0 mt-0.5' />
                <div>
                  <h4 className='text-sm font-semibold text-foreground'>
                    Pending Approval
                  </h4>
                  <p className='text-xs text-muted-foreground mt-1'>
                    This product is currently under review by the Mandi
                    administration. It will be visible to buyers once approved.
                  </p>
                </div>
              </div>
            )}

            {product?.moderation === 'rejected' && (
              <div className='bg-destructive/20 border border-destructive/40 rounded-lg p-4 flex gap-3 items-start'>
                <TriangleAlert className='h-5 w-5 text-destructive shrink-0 mt-0.5' />
                <div>
                  <h4 className='text-sm font-semibold text-foreground'>
                    Listing rejected !
                  </h4>
                  <p className='text-xs text-primary mt-1'>
                    {product?.rejectionReason ||
                      'You voilate privacy and policy'}
                  </p>

                  {product?.reviewedAt && product?.reviewedBy && (
                    <div>
                      <p className='text-xs text-primary mt-1'>
                        Reviewed At : {formatDate(product?.reviewedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductViewPage
