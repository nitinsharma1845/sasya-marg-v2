import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
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
  CalendarDays,
  Sprout,
  CircleX,
  AlertCircle
} from 'lucide-react'
import { RejectListingDialog } from '@/admin/components/RejectListingDialog'
import ApproveListingDialog from '@/admin/components/ApproveListingDialog'
import { useGetSinglePreHarvetsedProduct } from '@/admin/hooks/moderation.hooks'

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

const SinglePreHarvestListingPage = () => {
  const { productId } = useParams()
  const { data: response, isLoading } =
    useGetSinglePreHarvetsedProduct(productId)
  const [activeImg, setActiveImg] = useState(0)

  const product = response?.data

  if (isLoading) return <ProductSkeleton />
  if (!product)
    return (
      <div className='p-10 text-center text-destructive font-bold'>
        Error 404: Pre-Harvest Listing Not Found
      </div>
    )

  const moderation = product.moderation

  return (
    <div className='min-h-screen bg-background p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-xl border border-border shadow-sm'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
              <Sprout className='w-4 h-4 text-primary' /> {product.productType}{' '}
              Listing • {product.category}
            </div>
            <h1 className='text-3xl font-bold text-foreground'>
              {product.title}
            </h1>
            <div className='flex flex-wrap gap-2 mt-2'>
              <Badge
                variant='outline'
                className='border-primary text-primary capitalize'
              >
                {product.status}
              </Badge>
              <Badge className='bg-accent text-accent-foreground capitalize'>
                {product.moderation}
              </Badge>
              <Badge variant='secondary' className='border-border'>
                Grade {product.qualityGrade}
              </Badge>
            </div>
          </div>

          <div className='flex gap-3 flex-col md:flex-row items-center'>
            {moderation === 'pending' && (
              <>
                <RejectListingDialog product={product} />
                <ApproveListingDialog product={product} />
              </>
            )}

            {moderation === 'approved' && (
              <div className='flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-lg'>
                <CircleCheckBig className='h-6 w-6' /> Approved
              </div>
            )}

            {moderation === 'rejected' && (
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2 text-destructive font-bold bg-destructive/10 px-4 py-2 rounded-lg'>
                  <CircleX className='h-6 w-6' /> Rejected
                </div>
              </div>
            )}
          </div>
        </div>

        {moderation === 'rejected' && product.rejectionReason && (
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
                  {product.rejectionReason}
                </span>
              </p>
              {product.reviewedAt && (
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
                <div className='md:col-span-4 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-border min-h-125 bg-white'>
                  {product.images?.length > 0 ? (
                    <img
                      loading='lazy'
                      decoding='async'
                      src={product.images[activeImg]?.url}
                      alt='Crop view'
                      className='max-h-120 w-auto object-contain transition-all'
                    />
                  ) : (
                    <div className='text-muted-foreground flex flex-col items-center gap-2'>
                      <Box className='w-12 h-12 opacity-20' />
                      No Images Uploaded
                    </div>
                  )}
                </div>
                <div className='p-4 flex md:flex-col gap-3 overflow-x-auto bg-muted/20'>
                  {product.images?.map((img, idx) => (
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
                        loading='lazy'
                        decoding='async'
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
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <Info className='w-5 h-5 text-primary' /> Listing Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='bg-secondary/30 p-4 rounded-lg border border-border/50 text-foreground/90 whitespace-pre-line leading-relaxed'>
                  {product.description ||
                    'No description provided for this listing.'}
                </div>
              </CardContent>
            </Card>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Card className='border-border'>
                <CardHeader>
                  <CardTitle className='text-lg flex items-center gap-2'>
                    <MapPin className='w-5 h-5 text-accent' /> Farmland Details
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase font-bold'>
                        Land Name
                      </p>
                      <p className='font-medium'>{product.farmland.name}</p>
                    </div>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase font-bold'>
                        Area Size
                      </p>
                      <p className='font-medium'>
                        {product.farmland.size.value}{' '}
                        {product.farmland.size.unit}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase font-bold'>
                        Soil Type
                      </p>
                      <p className='font-medium capitalize'>
                        {product.farmland.soilType || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-muted-foreground uppercase font-bold'>
                        Farming Type
                      </p>
                      <p className='font-medium capitalize'>
                        {product.farmland.farmingType || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className='space-y-1'>
                    <p className='text-xs text-muted-foreground uppercase font-bold'>
                      Location
                    </p>
                    <p className='text-sm font-semibold'>
                      {product.farmland.location.locality},{' '}
                      {product.farmland.location.district}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {product.farmland.location.state}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-border bg-sidebar'>
                <CardHeader>
                  <CardTitle className='text-lg flex items-center gap-2'>
                    <CalendarDays className='w-5 h-5 text-primary' /> Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-5'>
                  <div className='flex items-center justify-between p-3 bg-card rounded-md border border-border'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-primary/10 rounded-full'>
                        <Sprout className='w-4 h-4 text-primary' />
                      </div>
                      <span className='text-sm text-muted-foreground'>
                        Sowing Date
                      </span>
                    </div>
                    <span className='font-bold text-sm'>
                      {new Date(product.sowingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-card rounded-md border border-border'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-accent/10 rounded-full'>
                        <Clock className='w-4 h-4 text-accent' />
                      </div>
                      <span className='text-sm text-muted-foreground'>
                        Exp. Harvest
                      </span>
                    </div>
                    <span className='font-bold text-sm'>
                      {new Date(product.expectedHarvest).toLocaleDateString()}
                    </span>
                  </div>
                  <div className='pt-2'>
                    <p className='text-[10px] text-muted-foreground uppercase font-bold mb-2'>
                      System Tracking
                    </p>
                    <div className='flex flex-col gap-2 text-xs'>
                      <div className='flex justify-between'>
                        <span>Created:</span>{' '}
                        <b>
                          {new Date(product.createdAt).toLocaleDateString()}
                        </b>
                      </div>
                      <div className='flex justify-between'>
                        <span>Last Update:</span>{' '}
                        <b>
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </b>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className='lg:col-span-4 space-y-6'>
            <Card className='border-border bg-primary/5'>
              <CardHeader className='pb-2'>
                <CardDescription className='text-primary font-semibold uppercase text-[10px] tracking-widest'>
                  Pre-Harvest Expected Price
                </CardDescription>
                <CardTitle className='text-4xl font-black text-foreground'>
                  ₹{product.expectedPrice.value}
                  <span className='text-base font-normal text-muted-foreground capitalize'>
                    {' '}
                    /{product.expectedPrice.unit.replace('_', ' ')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='p-4 bg-card rounded-lg border border-primary/20 flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <Warehouse className='w-5 h-5 text-primary' />
                    <span className='font-medium'>Exp. Yield</span>
                  </div>
                  <span className='text-xl font-bold'>
                    {product.expectedyeild.value} {product.expectedyeild.unit}
                  </span>
                </div>
                <div className='p-3 bg-muted/50 rounded-lg flex justify-between items-center text-sm'>
                  <span className='text-muted-foreground'>Min. Order Qty</span>
                  <span className='font-semibold'>
                    {product.minimumOrderQuantity.value}{' '}
                    {product.minimumOrderQuantity.unit}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border'>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <User className='w-5 h-5 text-primary' /> Farmer Reference
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-muted-foreground'>
                      Full Name
                    </span>
                    <span className='font-bold text-foreground'>
                      {product.farmer.fullname}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-muted-foreground'>Phone</span>
                    <span className='font-mono text-sm'>
                      {product.farmer.phone}
                    </span>
                  </div>
                </div>
                <Separator />
                <div className='space-y-1'>
                  <p className='text-xs text-muted-foreground uppercase font-bold'>
                    Database UID
                  </p>
                  <p className='font-mono text-[10px] bg-muted p-2 rounded border border-border break-all'>
                    {product.farmer._id}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border overflow-hidden'>
              <CardHeader className='bg-muted/50 py-3'>
                <CardTitle className='text-xs uppercase font-bold flex items-center gap-2'>
                  <Tag className='w-4 h-4' /> Metadata Info
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0 divide-y divide-border'>
                <div className='p-3 text-[10px] flex justify-between items-center'>
                  <span className='text-muted-foreground'>Listing ID</span>
                  <span className='font-mono'>{product._id}</span>
                </div>
                <div className='p-3 text-[10px] flex justify-between items-center'>
                  <span className='text-muted-foreground'>
                    Moderation Status
                  </span>
                  <Badge variant='outline' className='text-[9px] uppercase'>
                    {product.moderation}
                  </Badge>
                </div>
                {product.images?.map((img, idx) => (
                  <div
                    key={img._id}
                    className='p-3 text-[10px] flex justify-between items-center'
                  >
                    <span className='text-muted-foreground truncate w-32 italic'>
                      Asset_{idx + 1}: {img.publicId}
                    </span>
                    <a
                      href={img.url}
                      target='_blank'
                      rel='noreferrer'
                      className='text-primary font-bold hover:underline'
                    >
                      Source
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePreHarvestListingPage
