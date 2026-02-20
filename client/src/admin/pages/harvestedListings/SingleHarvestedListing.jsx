import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleHarvetsedProduct } from '@/admin/hooks/moderation.hooks'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  MapPin,
  Tag,
  Warehouse,
  Info,
  User,
  Activity,
  Clock,
  Box,
  CircleCheckBig,
  AlertCircle,
  CircleX
} from 'lucide-react'
import { RejectListingDialog } from '@/admin/components/RejectListingDialog'
import ApproveListingDialog from '@/admin/components/ApproveListingDialog'

const ProductSkeleton = () => (
  <div className='p-6 space-y-8 max-w-7xl mx-auto'>
    <div className='flex justify-between items-center'>
      <Skeleton className='h-10 w-64 bg-secondary' />
      <div className='flex gap-2'>
        <Skeleton className='h-10 w-24 bg-secondary' />
        <Skeleton className='h-10 w-24 bg-secondary' />
      </div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <Skeleton className='aspect-square rounded-xl bg-secondary' />
      <div className='space-y-6'>
        <Skeleton className='h-32 w-full bg-secondary' />
        <Skeleton className='h-48 w-full bg-secondary' />
      </div>
    </div>
  </div>
)

const SingleHarvestedListing = () => {
  const { productId } = useParams()
  const { data: response, isLoading } = useGetSingleHarvetsedProduct(productId)
  const [activeImg, setActiveImg] = useState(0)

  const product = response?.data

  if (isLoading) return <ProductSkeleton />
  if (!product)
    return (
      <div className='p-10 text-center text-destructive font-bold'>
        Error 404: Listing Not Found
      </div>
    )

  const moderation = product.moderation

  return (
    <div className='min-h-screen bg-background p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-xl border border-border shadow-sm'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
              <Box className='w-4 h-4' /> {product.productType} Product •{' '}
              {product.category}
            </div>
            <h1 className='text-3xl font-bold text-foreground'>
              {product.title}
            </h1>
            <div className='flex flex-wrap gap-2 mt-2'>
              <Badge
                variant={product.isActive ? 'outline' : 'destructive'}
                className={
                  product.isActive ? 'border-primary text-primary' : ''
                }
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <Badge className='bg-accent text-accent-foreground capitalize'>
                {product.moderation}
              </Badge>
              <Badge variant='secondary'>v{product.__v}</Badge>
            </div>
          </div>

          <div className='flex gap-3 flex-col md:flex-row'>
            {moderation === 'pending' && (
              <>
                <RejectListingDialog product={product} />
                <ApproveListingDialog product={product} />
              </>
            )}

            {moderation === 'approved' && (
              <CircleCheckBig className='h-10 w-10 text-accent' />
            )}

            {moderation === 'rejected' && (
              <div className='flex items-center gap-2 text-destructive font-bold bg-primary/10 px-4 py-2 rounded-lg'>
                <CircleX className='h-6 w-6' /> Rejected
              </div>
            )}
          </div>
        </div>

        {moderation === 'rejected' && (
          <Card className='border-destructive/50 bg-destructive/5 shadow-none'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg flex items-center gap-2 text-destructive'>
                <AlertCircle className='w-5 h-5' /> Rejection Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm font-medium text-foreground'>
                Reason:{' '}
                <span className='font-normal text-muted-foreground'>
                  {product?.rejectionReason || 'No reason provided'}
                </span>
              </p>
              {product?.reviewedAt && (
                <p className='text-[10px] text-muted-foreground mt-2 italic'>
                  Reviewed on: {new Date(product.reviewedAt).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          <div className='lg:col-span-8 space-y-6'>
            <Card className='overflow-hidden border-border'>
              <div className='grid grid-cols-1 md:grid-cols-5 bg-card'>
                <div className='md:col-span-4 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-border min-h-125'>
                  <img
                    src={product.images[activeImg]?.url}
                    alt='Product view'
                    className='max-h-120 w-auto object-contain transition-all'
                  />
                </div>
                <div className='p-4 flex md:flex-col gap-3 overflow-x-auto bg-muted/20'>
                  {product.images.map((img, idx) => (
                    <button
                      key={img._id}
                      onClick={() => setActiveImg(idx)}
                      className={`relative shrink-0 w-20 h-20 rounded-md border-2 transition-all overflow-hidden ${
                        activeImg === idx
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        className='object-cover w-full h-full'
                        alt={`Thumbnail ${idx}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card className='border-border'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Info className='w-5 h-5 text-primary' /> Product Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='bg-secondary/30 p-4 rounded-lg border border-border/50 text-foreground/90 whitespace-pre-line leading-relaxed'>
                  {product.description}
                </div>
              </CardContent>
            </Card>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Card className='border-border'>
                <CardHeader>
                  <CardTitle className='text-lg flex items-center gap-2'>
                    <MapPin className='w-5 h-5 text-accent' /> Farmland Location
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase font-bold'>
                        Name
                      </p>
                      <p className='font-medium'>{product.farmland.name}</p>
                    </div>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase font-bold'>
                        Land Size
                      </p>
                      <p className='font-medium'>
                        {product.farmland.size.value}{' '}
                        {product.farmland.size.unit}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className='space-y-2'>
                    <p className='text-xs text-muted-foreground uppercase font-bold'>
                      Address
                    </p>
                    <p className='text-sm'>
                      {product.farmland.location.locality},{' '}
                      {product.farmland.location.district}
                    </p>
                    <p className='text-sm font-semibold'>
                      {product.farmland.location.state}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-border'>
                <CardHeader>
                  <CardTitle className='text-lg flex items-center gap-2'>
                    <Activity className='w-5 h-5 text-primary' /> System Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <Clock className='w-4 h-4 text-muted-foreground mt-1' />
                    <div className='text-sm'>
                      <p className='text-muted-foreground'>Created At</p>
                      <p className='font-medium'>
                        {new Date(product.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Activity className='w-4 h-4 text-muted-foreground mt-1' />
                    <div className='text-sm'>
                      <p className='text-muted-foreground'>
                        Last Database Update
                      </p>
                      <p className='font-medium'>
                        {new Date(product.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Tag className='w-4 h-4 text-muted-foreground mt-1' />
                    <div className='text-sm'>
                      <p className='text-muted-foreground'>Product ID (DB)</p>
                      <p className='font-mono text-[10px] break-all'>
                        {product._id}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className='lg:col-span-4 space-y-6'>
            <Card className='border-border bg-primary/5'>
              <CardHeader className='pb-2'>
                <CardDescription className='text-primary font-semibold'>
                  Current Market Pricing
                </CardDescription>
                <CardTitle className='text-4xl font-black text-foreground'>
                  ₹{product.price.value}
                  <span className='text-base font-normal text-muted-foreground'>
                    {' '}
                    /{product.price.unit.replace('_', ' ')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='p-4 bg-card rounded-lg border border-primary/20 flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <Warehouse className='w-5 h-5 text-primary' />
                    <span className='font-medium'>Total Stock</span>
                  </div>
                  <span className='text-xl font-bold'>
                    {product.stock.value} {product.stock.unit}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border'>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <User className='w-5 h-5 text-primary' /> Entity Relations
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-1'>
                  <p className='text-xs text-muted-foreground uppercase font-bold'>
                    Farmer Reference ID
                  </p>
                  <p className='font-mono text-xs bg-muted p-2 rounded border border-border'>
                    {product.farmer}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-xs text-muted-foreground uppercase font-bold'>
                    Farmland Reference ID
                  </p>
                  <p className='font-mono text-xs bg-muted p-2 rounded border border-border'>
                    {product.farmland._id}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border overflow-hidden'>
              <CardHeader className='bg-muted/50 py-3'>
                <CardTitle className='text-sm uppercase font-bold flex items-center gap-2'>
                  Image Assets ({product.images.length})
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <div className='divide-y divide-border'>
                  {product.images.map(img => (
                    <div
                      key={img._id}
                      className='p-3 text-[10px] flex justify-between items-center bg-card'
                    >
                      <span className='text-muted-foreground truncate w-32'>
                        ID: {img.publicId}
                      </span>
                      <a
                        href={img.url}
                        target='_blank'
                        rel='noreferrer'
                        className='text-primary font-bold hover:underline'
                      >
                        View Source
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleHarvestedListing
