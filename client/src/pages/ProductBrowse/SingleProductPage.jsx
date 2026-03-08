import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  Leaf,
  Scale,
  Ruler,
  Phone,
  ChevronRight,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  Mail,
  CalendarDays,
  Info,
  AlertTriangle,
  Lock,
  DotIcon,
  Heart,
  Loader2
} from 'lucide-react'
import { useGetSingleProduct } from '@/hooks/product.hooks'
import AppLoader from '@/components/common/AppLoader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { useAddToWishlist, useDeleteFromWishlist } from '@/hooks/wishlist.hooks'

const SingleProductPage = () => {
  const { productId } = useParams()
  const addToWishlist = useAddToWishlist()
  const removeFromWishlist = useDeleteFromWishlist()
  const { data, isLoading } = useGetSingleProduct(productId)
  const [isContactRevealed, setIsContactRevealed] = useState(false)
  const [activeImage, setActiveImage] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = data?.data

  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImage(product.images[0].url)
    }

    if (product?.isWishlisted) {
      setIsWishlisted(product?.isWishlisted)
    }
  }, [product])

  if (isLoading) return <AppLoader />

  const toggleWishlist = () => {
    setIsWishlisted(prev => !prev)
    const listingId = product?._id

    if (isWishlisted) {
      removeFromWishlist.mutate(listingId, {
        onError: () => {
          setIsWishlisted(prev => !prev)
        },
        onSuccess: res => {
          if (res?.data?.isWishlisted) {
            setIsWishlisted(res?.data?.isWishlisted)
          }
        }
      })
    } else {
      addToWishlist.mutate(
        { itemId: listingId, itemType: 'harvested' },
        {
          onError: () => {
            setIsWishlisted(prev => !prev)
          },
          onSuccess: res => {
            if (res?.data?.isWishlisted) {
              setIsWishlisted(res?.data?.isWishlisted)
            }
          }
        }
      )
    }
  }

  if (!product) {
    return (
      <div className='min-h-[50vh] flex flex-col items-center justify-center gap-4 text-muted-foreground'>
        <h2 className='text-lg font-medium text-foreground'>
          Product Not Found
        </h2>
        <Button
          variant='outline'
          size='sm'
          onClick={() => window.history.back()}
          className={'cursor-pointer'}
        >
          Go Back
        </Button>
      </div>
    )
  }

  const hasEmail = !!product.farmer?.email
  const hasPhone = !!product.farmer?.phone && product.farmer?.isContactVisible

  return (
    <div className='min-h-screen bg-background text-foreground font-sans pb-12'>
      <div className='border-b border-border bg-card/50 sticky top-0 z-20 backdrop-blur-sm'>
        <div className='container max-w-6xl mx-auto px-4 h-12 flex items-center text-xs text-muted-foreground'>
          <span className='capitalize hover:text-primary transition-colors cursor-pointer'>
            Harvested Products
          </span>

          <DotIcon className='h-4 w-4 opacity-50 cursor-pointer' />
          <Link
            to='/buyer/product/harvested'
            className='hover:text-primary transition-colors'
          >
            Market
          </Link>
          <ChevronRight className='h-3 w-3 mx-2 opacity-50' />
          <span className='text-foreground font-medium truncate'>
            {product.title}
          </span>
        </div>
      </div>

      <div className='container max-w-6xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          <div className='lg:col-span-7 space-y-4'>
            <div className='aspect-16/10 w-full overflow-hidden rounded-lg border border-border bg-secondary/10 relative group shadow-sm'>
              <img
                loading='lazy'
                decoding='async'
                src={activeImage}
                alt={product.title}
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute top-4 left-4 flex flex-col gap-2'>
                {product.moderation === 'approved' && (
                  <Badge className='bg-primary/95 hover:bg-primary text-primary-foreground backdrop-blur-md border-none gap-1.5 py-1 px-3 shadow-sm w-fit'>
                    <ShieldCheck className='h-3.5 w-3.5' />
                    Admin Verified
                  </Badge>
                )}
                <Badge
                  variant='secondary'
                  className='bg-background/80 backdrop-blur text-foreground border-border w-fit'
                >
                  {product.productType}
                </Badge>
              </div>
            </div>

            {product.images?.length > 1 && (
              <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide'>
                {product.images.map(img => (
                  <button
                    key={img._id}
                    onClick={() => setActiveImage(img.url)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition-all ${
                      activeImage === img.url
                        ? 'border-primary ring-2 ring-primary/20 opacity-100'
                        : 'border-border hover:border-primary/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      loading='lazy'
                      decoding='async'
                      src={img.url}
                      alt='Thumbnail'
                      className='h-full w-full object-cover'
                    />
                  </button>
                ))}
              </div>
            )}

            <div className='pt-4'>
              <h3 className='text-sm font-semibold mb-2 text-foreground'>
                About the Produce
              </h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {product.description}
              </p>

              <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50'>
                  <MapPin className='h-4 w-4 text-primary mt-0.5' />
                  <div>
                    <p className='text-xs font-semibold text-foreground mb-0.5'>
                      Harvest Location
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {product.farmland?.location?.locality},{' '}
                      {product.farmland?.location?.district}
                      <br />
                      {product.farmland?.location?.state}
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50'>
                  <CalendarDays className='h-4 w-4 text-primary mt-0.5' />
                  <div>
                    <p className='text-xs font-semibold text-foreground mb-0.5'>
                      Listing Date
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Listed on{' '}
                      {new Date(product.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-5 space-y-6'>
            <Card className='p-5 border-border shadow-sm bg-card'>
              <div className='flex justify-between items-start mb-4'>
                <div className='flex-1'>
                  <h1 className='text-2xl font-bold text-foreground'>
                    {product.title}
                  </h1>
                  <div className='flex items-center gap-2 mt-1'>
                    <Badge
                      variant='outline'
                      className='text-xs font-normal text-muted-foreground border-border capitalize'
                    >
                      {product.category}
                    </Badge>
                    {product.isActive && (
                      <span className='flex items-center text-[10px] text-primary font-medium'>
                        <span className='h-1.5 w-1.5 rounded-full bg-primary mr-1.5 animate-pulse'></span>
                        Available Now
                      </span>
                    )}
                  </div>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={toggleWishlist}
                        className={cn(
                          'h-10 w-10 shrink-0 border-border transition-all duration-300 rounded-full cursor-pointer',
                          isWishlisted
                            ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-300'
                            : 'text-muted-foreground hover:text-red-500 hover:bg-red-50 hover:border-red-200'
                        )}
                      >
                        {addToWishlist.isPending ||
                        removeFromWishlist.isPending ? (
                          <Loader2 className='h-5 w-5 animate-spin' />
                        ) : (
                          <Heart
                            className={cn(
                              'h-5 w-5 transition-all duration-300',
                              isWishlisted && 'fill-current scale-110'
                            )}
                          />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isWishlisted
                          ? 'Remove from Wishlist'
                          : 'Add to Wishlist'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className='flex items-end gap-2 pb-6 border-b border-border'>
                <span className='text-3xl font-bold text-primary'>
                  ₹{product.price.value.toLocaleString()}
                </span>
                <span className='text-sm text-muted-foreground font-medium mb-1.5'>
                  / {product.price.unit.replace('_', ' ')}
                </span>
              </div>

              <div className='grid grid-cols-2 gap-3 py-6'>
                <div className='space-y-1'>
                  <p className='text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1.5'>
                    <Scale className='h-3 w-3' /> Quantity
                  </p>
                  <p className='text-sm font-medium'>
                    {product.stock.value} {product.stock.unit}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1.5'>
                    <Ruler className='h-3 w-3' /> Farm Size
                  </p>
                  <p className='text-sm font-medium'>
                    {product.farmland?.size?.value}{' '}
                    {product.farmland?.size?.unit}
                  </p>
                </div>
              </div>

              <div className='bg-muted/30 rounded-lg p-4 border border-border'>
                <div className='flex items-center gap-3'>
                  <Avatar className='border'>
                    <AvatarFallback className='bg-primary/10 text-primary'>
                      {product.farmer?.fullname?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className='flex items-center gap-1'>
                      <p className='font-semibold'>
                        {product.farmer?.fullname}
                      </p>
                      {product.farmer?.isActive && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <BadgeCheck className='h-4 w-4 text-primary' />
                            </TooltipTrigger>
                            <TooltipContent>Verified seller</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      Seller ID: {product.farmer?._id?.slice(-6)}
                    </p>
                  </div>
                </div>

                <div className='space-y-3'>
                  {hasEmail && (
                    <div className='flex items-center gap-2.5 p-3'>
                      <Mail className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm text-foreground'>
                        {product.farmer.email}
                      </span>
                    </div>
                  )}

                  {hasPhone ? (
                    isContactRevealed ? (
                      <div className='space-y-3 animation-in fade-in slide-in-from-top-2'>
                        <Button
                          variant='outline'
                          className='w-full border-primary/20 text-primary hover:text-primary font-bold h-10 select-all cursor-pointer'
                        >
                          {product.farmer.phone || 'Phone number not found'}
                        </Button>
                        <p className='text-[10px] text-center text-muted-foreground'>
                          Contact revealed. Please be respectful.
                        </p>
                      </div>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 shadow-sm cursor-pointer'>
                            <Phone className='h-4 w-4 mr-2' /> Get Contact
                            Details
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='max-w-md'>
                          <AlertDialogHeader>
                            <AlertDialogTitle className='flex items-center gap-2'>
                              <AlertTriangle className='h-5 w-5 text-accent' />
                              Privacy & Safety Warning
                            </AlertDialogTitle>
                            <AlertDialogDescription className='text-sm'>
                              This contact number is provided strictly for
                              business transactions related to this product.
                              <br />
                              <br />
                              <strong>Do not use this number for:</strong>
                              <ul className='list-disc ml-4 mt-2 mb-2'>
                                <li>Unsolicited marketing or spam</li>
                                <li>Harassment or abusive behavior</li>
                                <li>Distribution to third parties</li>
                              </ul>
                              Misuse of farmer contact details is a violation of
                              our policy and may result in account suspension.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => setIsContactRevealed(true)}
                              className='bg-primary hover:bg-primary/90 cursor-pointer'
                            >
                              I Understand, Show Number
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )
                  ) : !hasEmail ? (
                    <Alert className='bg-accent/10'>
                      <Lock className='h-4 w-4' />
                      <AlertTitle>Contact Unavailable</AlertTitle>
                      <AlertDescription className='text-xs'>
                        Due to farmer privacy settings, neither phone nor email
                        is shared. Please visit the farm location physically.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className='bg-destructive/10 border-destructive/50'>
                      <Info className='h-4 w-4 text-destructive' />
                      <AlertTitle className='text-destructive'>
                        Phone Not Available
                      </AlertTitle>
                      <AlertDescription className='text-xs text-muted-foreground'>
                        Phone number is unavailable. Please contact via email or
                        visit the farm location physically.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </Card>

            <div className='flex items-center justify-center gap-4 text-xs text-muted-foreground'>
              <div className='flex items-center gap-1.5'>
                <ShieldCheck className='h-3.5 w-3.5 text-primary/70' />
                <span>Secure Deal</span>
              </div>
              <div className='h-1 w-1 rounded-full bg-border'></div>
              <div className='flex items-center gap-1.5'>
                <CheckCircle2 className='h-3.5 w-3.5 text-primary/70' />
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage
