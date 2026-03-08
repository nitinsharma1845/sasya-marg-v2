import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  Scale,
  Ruler,
  Phone,
  ChevronRight,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  Mail,
  AlertTriangle,
  Lock,
  DotIcon,
  Heart,
  Sprout,
  Timer,
  ShoppingBag,
  Layers,
  Droplets,
  TrendingUp,
  Sun,
  CloudRain,
  Loader2
} from 'lucide-react'
import { useGetSinglePreHarvestProduct } from '@/hooks/product.hooks'
import AppLoader from '@/components/common/AppLoader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
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
import { format } from 'date-fns'
import { useAddToWishlist, useDeleteFromWishlist } from '@/hooks/wishlist.hooks'

const PreHarvestProductPage = () => {
  const addToWishlist = useAddToWishlist()
  const removeFromWishlist = useDeleteFromWishlist()
  const { productId } = useParams()
  const { data, isLoading } = useGetSinglePreHarvestProduct(productId)
  const [isContactRevealed, setIsContactRevealed] = useState(false)
  const [activeImage, setActiveImage] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [growthProgress, setGrowthProgress] = useState(0)
  const [daysRemaining, setDaysRemaining] = useState(0)

  const product = data?.data

  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImage(product.images[0].url)
    }
  }, [product])

  useEffect(() => {
    if (product?.sowingDate && product?.expectedHarvest) {
      const start = new Date(product.sowingDate).getTime()
      const end = new Date(product.expectedHarvest).getTime()
      const now = new Date().getTime()

      const totalDuration = end - start
      const elapsed = now - start
      const percentage = Math.min(
        Math.max((elapsed / totalDuration) * 100, 0),
        100
      )

      setGrowthProgress(percentage)

      const remaining = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
      setDaysRemaining(remaining)
    }
    if (product?.isWishlisted) {
      setIsWishlisted(product.isWishlisted)
    }
  }, [product])

  if (isLoading) return <AppLoader />

  const toggleWishlist = () => {
    setIsWishlisted(prev => !prev)
    if (isWishlisted) {
      const listingId = product?._id
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
        { itemId: product?._id, itemType: 'pre_harvested' },
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

  return (
    <div className='min-h-screen bg-background text-foreground font-sans pb-12'>
      <div className='border-b border-border bg-card/50 sticky top-0 z-20 backdrop-blur-sm'>
        <div className='container max-w-6xl mx-auto px-4 h-12 flex items-center text-xs text-muted-foreground'>
          <span className='capitalize hover:text-primary transition-colors cursor-pointer'>
            Pre-Harvest Bookings
          </span>

          <DotIcon className='h-4 w-4 opacity-50' />
          <Link
            to='/buyer/product/pre-harvested'
            className='hover:text-primary transition-colors cursor-pointer'
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
          <div className='lg:col-span-7 space-y-6'>
            <div className='space-y-4'>
              <div className='aspect-video w-full overflow-hidden rounded-xl border border-border bg-secondary/10 relative group shadow-sm'>
                <img
                  src={activeImage}
                  alt={product.title}
                  loading='lazy'
                  decoding='async'
                  className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute top-4 left-4 flex flex-col gap-2'>
                  {product.moderation === 'approved' ? (
                    <Badge className='bg-primary/95 hover:bg-primary text-primary-foreground backdrop-blur-md border-none gap-1.5 py-1 px-3 shadow-sm w-fit'>
                      <ShieldCheck className='h-3.5 w-3.5' />
                      Admin Verified
                    </Badge>
                  ) : (
                    <Badge
                      variant='outline'
                      className='bg-amber-500/10 backdrop-blur-md text-amber-700 border-amber-200 gap-1.5 py-1 px-3 shadow-sm w-fit'
                    >
                      <Timer className='h-3.5 w-3.5' />
                      Pending Verification
                    </Badge>
                  )}
                  <Badge
                    variant='secondary'
                    className='bg-background/80 backdrop-blur text-foreground border-border w-fit capitalize'
                  >
                    {product.productType}
                  </Badge>
                </div>
              </div>

              {product.images?.length > 1 && (
                <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x'>
                  {product.images.map(img => (
                    <button
                      key={img._id}
                      onClick={() => setActiveImage(img.url)}
                      className={cn(
                        'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all snap-start',
                        activeImage === img.url
                          ? 'border-primary ring-2 ring-primary/20 opacity-100 scale-100'
                          : 'border-transparent hover:border-border opacity-70 hover:opacity-100 scale-95 hover:scale-100'
                      )}
                    >
                      <img
                        src={img.url}
                        alt='Thumbnail'
                        className='h-full w-full object-cover'
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className='bg-card rounded-xl border border-border p-5 space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-semibold flex items-center gap-2'>
                  <Sprout className='h-4 w-4 text-primary' />
                  Crop Growth Tracker
                </h3>
                <span className='text-xs font-medium text-muted-foreground'>
                  {growthProgress >= 100
                    ? 'Ready for Harvest'
                    : `${Math.round(growthProgress)}% Matured`}
                </span>
              </div>

              <Progress value={growthProgress} className='h-2 bg-secondary' />

              <div className='flex justify-between text-xs text-muted-foreground pt-1'>
                <div className='flex flex-col gap-0.5'>
                  <span className='font-medium text-foreground'>
                    Sowing Date
                  </span>
                  <div className='flex items-center gap-1.5'>
                    <Sun className='h-3 w-3 text-amber-500' />
                    {new Date(product.sowingDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div className='flex flex-col gap-0.5 items-end'>
                  <span className='font-medium text-foreground'>
                    Expected Harvest
                  </span>
                  <div className='flex items-center gap-1.5'>
                    <CloudRain className='h-3 w-3 text-blue-400' />
                    {new Date(product.expectedHarvest).toLocaleDateString(
                      'en-IN',
                      { day: 'numeric', month: 'short', year: 'numeric' }
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-foreground'>
                Description & Soil
              </h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {product.description}
              </p>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                <div className='flex items-start gap-3 p-4 rounded-xl border border-border bg-linear-to-br from-secondary/30 to-background'>
                  <div className='p-2 rounded-full bg-background border border-border'>
                    <Layers className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-foreground mb-0.5'>
                      Soil Composition
                    </p>
                    <p className='text-sm text-muted-foreground capitalize'>
                      {product.farmland?.soilType || 'Standard'} Soil
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 p-4 rounded-xl border border-border bg-linear-to-br from-secondary/30 to-background'>
                  <div className='p-2 rounded-full bg-background border border-border'>
                    <TrendingUp className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-foreground mb-0.5'>
                      Farming Method
                    </p>
                    <p className='text-sm text-muted-foreground capitalize'>
                      {product.farmland?.farmingType}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-5 space-y-6'>
            <Card className='p-6 border-border shadow-lg bg-card/50 backdrop-blur-sm sticky top-24'>
              <div className='flex justify-between items-start mb-6'>
                <div className='flex-1'>
                  <h1 className='text-2xl font-bold text-foreground'>
                    {product.title}
                  </h1>
                  <div className='flex items-center gap-2 mt-2'>
                    <Badge
                      variant='outline'
                      className='text-xs font-medium text-muted-foreground border-border capitalize'
                    >
                      Grade {product.qualityGrade}
                    </Badge>
                    {daysRemaining > 0 ? (
                      <span className='flex items-center text-[10px] text-blue-600 font-medium bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100'>
                        <Timer className='h-3 w-3 mr-1' />
                        Harvest in {daysRemaining} days
                      </span>
                    ) : (
                      <span className='flex items-center text-[10px] text-green-600 font-medium bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100'>
                        <CheckCircle2 className='h-3 w-3 mr-1' />
                        Ready for Harvest
                      </span>
                    )}
                  </div>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={
                          addToWishlist.isPending ||
                          removeFromWishlist.isPending
                        }
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
                          <Loader2
                            className={cn(
                              'h-5 w-5 transition-all duration-300 animate-spin'
                            )}
                          />
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

              <div className='flex items-end gap-2 pb-6 border-b border-border mb-6'>
                <div className='flex flex-col w-full'>
                  <span className='text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider'>
                    Expected Price
                  </span>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-extrabold text-primary tracking-tight'>
                      ₹{product.expectedPrice?.value.toLocaleString()}
                    </span>
                    <span className='text-sm text-muted-foreground font-medium'>
                      / {product.expectedPrice?.unit.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3 mb-6'>
                <div className='space-y-1 p-3 bg-secondary/20 rounded-lg border border-transparent hover:border-border transition-all'>
                  <p className='text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5'>
                    <Scale className='h-3.5 w-3.5' /> Est. Yield
                  </p>
                  <p className='text-sm font-semibold'>
                    {product.expectedyeild?.value} {product.expectedyeild?.unit}
                  </p>
                </div>
                <div className='space-y-1 p-3 bg-secondary/20 rounded-lg border border-transparent hover:border-border transition-all'>
                  <p className='text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5'>
                    <ShoppingBag className='h-3.5 w-3.5' /> Min Order
                  </p>
                  <p className='text-sm font-semibold'>
                    {product.minimumOrderQuantity?.value}{' '}
                    {product.minimumOrderQuantity?.unit}
                  </p>
                </div>
                <div className='space-y-1 p-3 bg-secondary/20 rounded-lg border border-transparent hover:border-border transition-all'>
                  <p className='text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5'>
                    <Ruler className='h-3.5 w-3.5' /> Area
                  </p>
                  <p className='text-sm font-semibold'>
                    {product.farmland?.size?.value}{' '}
                    {product.farmland?.size?.unit}
                  </p>
                </div>
                <div className='space-y-1 p-3 bg-secondary/20 rounded-lg border border-transparent hover:border-border transition-all'>
                  <p className='text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5'>
                    <Droplets className='h-3.5 w-3.5' /> Irrigation
                  </p>
                  <p className='text-sm font-semibold capitalize'>
                    {product.farmland?.farmingType}
                  </p>
                </div>
              </div>

              <div className='bg-muted/30 rounded-xl p-5 border border-border space-y-5'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-12 w-12 border-2 border-background shadow-sm'>
                      <AvatarFallback className='bg-primary/10 text-primary font-bold'>
                        {product.farmer.fullname.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='flex items-center gap-1.5'>
                        <p className='text-sm font-bold text-foreground'>
                          {product.farmer.fullname}
                        </p>
                        <TooltipProvider>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger>
                              <BadgeCheck className='h-4 w-4 text-primary fill-primary/10' />
                            </TooltipTrigger>
                            <TooltipContent className='bg-foreground text-background text-xs'>
                              Identity Verified
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        Member since {format(product.farmer?.createdAt, 'yyyy')}
                      </p>
                    </div>
                  </div>
                </div>

                {product.farmer.isContactVisible ? (
                  isContactRevealed ? (
                    <div className='space-y-3 animation-in fade-in slide-in-from-top-2 duration-300'>
                      <Button
                        variant='outline'
                        className='w-full border-primary/20 text-primary font-bold h-11 text-md select-all bg-primary/5 hover:bg-primary/10 cursor-pointer'
                      >
                        <Phone className='h-4 w-4 mr-2' />
                        {product.farmer.phone !== 'false'
                          ? product.farmer.phone
                          : 'Number Not Shared'}
                      </Button>

                      {product.farmer.email && (
                        <Button
                          variant='ghost'
                          className='w-full h-9 text-xs text-muted-foreground hover:text-primary cursor-pointer'
                          onClick={() =>
                            (window.location.href = `mailto:${product.farmer.email}`)
                          }
                        >
                          <Mail className='h-3.5 w-3.5 mr-2' />
                          {product.farmer.email}
                        </Button>
                      )}

                      <p className='text-[10px] text-center text-muted-foreground'>
                        Details revealed. Please transact responsibly.
                      </p>
                    </div>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold shadow-md transition-transform active:scale-[0.98] cursor-pointer'>
                          <Phone className='h-4 w-4 mr-2' /> Reveal Contact
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
                ) : (
                  <div className='space-y-3'>
                    <Alert
                      variant='destructive'
                      className='bg-destructive/5 border-destructive/20 py-3'
                    >
                      <Lock className='h-4 w-4 text-destructive' />
                      <AlertTitle className='text-xs font-semibold text-destructive ml-2'>
                        Phone Hidden
                      </AlertTitle>
                      <AlertDescription className='text-[11px] text-muted-foreground ml-2 mt-1'>
                        The farmer has chosen to keep their phone number
                        private. Please use email or visit directly.
                      </AlertDescription>
                    </Alert>

                    <Button
                      disabled
                      className='w-full bg-muted text-muted-foreground h-10 opacity-70 cursor-pointer'
                    >
                      <Phone className='h-4 w-4 mr-2' /> Phone Unavailable
                    </Button>

                    {product.farmer.email && (
                      <Button
                        variant='outline'
                        className='w-full border-primary/20 text-primary hover:bg-primary/5 h-10 cursor-pointer'
                        onClick={() =>
                          (window.location.href = `mailto:${product.farmer.email}`)
                        }
                      >
                        <Mail className='h-4 w-4 mr-2' />
                        {product.farmer.email}
                      </Button>
                    )}

                    <Button
                      variant='secondary'
                      className='w-full h-10 text-xs border border-border/50 cursor-pointer'
                    >
                      <MapPin className='h-3.5 w-3.5 mr-2' />{' '}
                      {product.farmland?.location?.locality},{' '}
                      {product.farmland?.location?.district}
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            <div className='flex items-center justify-center gap-4 text-xs text-muted-foreground mt-4'>
              <div className='flex items-center gap-1.5'>
                <ShieldCheck className='h-3.5 w-3.5 text-primary/70' />
                <span>Secure Booking</span>
              </div>
              <div className='h-1 w-1 rounded-full bg-border'></div>
              <div className='flex items-center gap-1.5'>
                <CheckCircle2 className='h-3.5 w-3.5 text-primary/70' />
                <span>Verified Land</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreHarvestProductPage
