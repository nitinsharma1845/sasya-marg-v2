import React from 'react'
import { format, differenceInDays } from 'date-fns'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

import AppLoader from '@/components/common/AppLoader'
import { useGetBuyerProfile } from '@/hooks/buyer.hooks'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import UpdateProfileDialog from './components/UpdateProfileDialog'
import { getOptimizedImg } from '@/lib/imageHelper'
import UpdateAddressDialog from './components/UpdateAddressDialog'

const BuyerProfilePage = () => {
  const { data, isLoading } = useGetBuyerProfile()

  if (isLoading) {
    return <AppLoader />
  }

  const user = data?.data

  const initials =
    user?.fullname
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'U'

  const formattedDate = user?.createdAt
    ? format(new Date(user.createdAt), 'MMMM dd, yyyy')
    : 'N/A'

  const daysActive = user?.createdAt
    ? differenceInDays(new Date(), new Date(user.createdAt))
    : 0

  const formatAddress = address => {
    const addressFields = [
      address?.addressLine,
      address?.city,
      address?.state,
      address?.pincode
    ]

    return addressFields.filter(Boolean).join(', ')
  }

  const fields = [user?.fullname, user?.email, user?.phone, user?.address]
  const filledFields = fields.filter(Boolean).length
  const completionPercentage = (filledFields / 4) * 100

  return (
    <div className='min-h-screen w-full bg-background pb-12'>
      <div
        className='relative h-48 md:h-64 w-full bg-secondary overflow-hidden rounded-bl-3xl rounded-br-3xl'
        style={{
          backgroundImage: `url(${getOptimizedImg(
            'https://res.cloudinary.com/dq0ltmja4/image/upload/v1769791261/pexels-oleksandr-tiupa-53788-192136_fxvb98.jpg'
          )})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      ></div>

      <div className='container mx-auto px-4 sm:px-6 relative -mt-20 z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          <div className='lg:col-span-5 xl:col-span-4 space-y-6'>
            <Card className='border-border shadow-lg overflow-hidden'>
              <div className='pt-8 pb-6 px-6 flex flex-col items-start text-left'>
                <div className='relative mb-4'>
                  <Avatar className='h-32 w-32 border-4 border-background shadow-xl ring-2 ring-border/50'>
                    <AvatarImage src='' alt={user?.fullname} />
                    <AvatarFallback className='bg-linear-to-br from-primary/20 to-secondary text-primary text-4xl font-bold tracking-wider'>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='absolute bottom-1 right-1'>
                    <Badge
                      className={`h-8 w-8 rounded-full p-0 flex items-center justify-center border-2 border-background ${
                        !user?.isBlocked ? 'bg-green-500' : 'bg-destructive'
                      }`}
                    >
                      {!user?.isBlocked ? (
                        <CheckCircle2 className='h-4 w-4 text-white' />
                      ) : (
                        <AlertCircle className='h-4 w-4 text-white' />
                      )}
                    </Badge>
                  </div>
                </div>

                <h2 className='text-2xl font-bold text-foreground'>
                  {user?.fullname}
                </h2>
                <div className='flex items-center gap-2 mt-1 mb-4'>
                  <Badge
                    variant='secondary'
                    className='bg-primary/10 text-primary hover:bg-primary/20 transition-colors uppercase text-[10px] tracking-widest font-semibold'
                  >
                    {user?.role}
                  </Badge>
                </div>

                <div className='w-full grid grid-cols-2 gap-4 py-4 border-t border-border/50'>
                  <div className='flex flex-col items-start justify-center'>
                    <span className='text-2xl font-bold text-primary'>
                      {daysActive}
                    </span>
                    <span className='text-xs text-muted-foreground uppercase tracking-wide'>
                      Days Active
                    </span>
                  </div>
                  <div className='flex flex-col items-start justify-center border-l border-border/50 pl-4'>
                    <span className='text-2xl font-bold text-foreground'>
                      0
                    </span>
                    <span className='text-xs text-muted-foreground uppercase tracking-wide'>
                      Wishlist
                    </span>
                  </div>
                </div>

                <div className='w-full mt-2 flex justify-start'>
                  <UpdateProfileDialog user={user} />
                </div>
              </div>
            </Card>

            <Card className='border-border shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
                  Profile Health
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between text-sm font-medium'>
                  <span className='text-foreground'>
                    {completionPercentage}% Complete
                  </span>
                </div>
                <Progress
                  value={completionPercentage}
                  className='h-2 bg-secondary'
                />
                <p className='text-xs text-muted-foreground'>
                  {completionPercentage < 100
                    ? 'Complete your profile to unlock all features.'
                    : 'Your profile is up to date!'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className='lg:col-span-7 xl:col-span-8 space-y-6 pt-4 lg:pt-20 mt-3'>
            <Card className='border-border shadow-sm'>
              <CardHeader className='pb-4'>
                <div className='flex items-center gap-2'>
                  <div className='p-2 rounded-lg bg-primary/10'>
                    <User className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <CardTitle className='text-lg'>
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Manage your contact details and communication preferences.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Separator className='bg-border/50' />
              <CardContent className='grid gap-6 sm:grid-cols-2 pt-6'>
                <div className='group space-y-2 p-3 rounded-lg hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50'>
                  <label className='text-xs font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wide'>
                    <Mail className='h-3 w-3' />
                    Email Address
                  </label>
                  <div className='text-sm font-medium text-foreground break-all'>
                    {user?.email}
                  </div>
                </div>
                <div className='group space-y-2 p-3 rounded-lg hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50'>
                  <label className='text-xs font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wide'>
                    <Phone className='h-3 w-3' />
                    Phone Number
                  </label>
                  <div className='text-sm font-medium text-foreground'>
                    +91 {user?.phone}
                  </div>
                </div>
                <div className='group space-y-2 p-3 rounded-lg hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50'>
                  <label className='text-xs font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wide'>
                    <Calendar className='h-3 w-3' />
                    Joined On
                  </label>
                  <div className='text-sm font-medium text-foreground'>
                    {formattedDate}
                  </div>
                </div>
                <div className='group space-y-2 p-3 rounded-lg hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50'>
                  <label className='text-xs font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wide'>
                    <ShieldCheck className='h-3 w-3' />
                    Account Status
                  </label>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='outline'
                      className='border-primary/20 bg-primary/5 text-primary'
                    >
                      Verified Buyer
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border shadow-sm'>
              <CardHeader className='pb-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='p-2 rounded-lg bg-accent/10'>
                      <MapPin className='h-5 w-5 text-accent-foreground' />
                    </div>
                    <div>
                      <CardTitle className='text-lg'>Address Book</CardTitle>
                      <CardDescription>
                        Shipping destination for your orders.
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <Separator className='bg-border/50' />
              <CardContent className='pt-1'>
                {user?.address ? (
                  <div className='flex items-start gap-4 p-4 rounded-xl border border-border bg-secondary/10 hover:bg-secondary/20 transition-colors'>
                    <div className='mt-1 bg-background p-2 rounded-full border border-border shadow-sm'>
                      <MapPin className='h-4 w-4 text-primary' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center justify-between gap-2 mb-1'>
                        <p className='font-medium text-foreground'>
                          Primary Address
                        </p>
                        <UpdateAddressDialog address={user.address} />
                      </div>

                      <div>
                        <p className='text-sm font-medium leading-relaxed'>
                          {user?.address?.label}
                        </p>
                        <p className='text-xs text-muted-foreground leading-relaxed max-w-md'>
                          {formatAddress(user?.address)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center py-10 bg-secondary/5 border-2 border-dashed border-border rounded-xl group hover:bg-secondary/10 transition-colors cursor-pointer'>
                    <div className='h-12 w-12 rounded-full bg-secondary/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'>
                      <MapPin className='h-6 w-6 text-muted-foreground' />
                    </div>
                    <p className='text-foreground font-medium'>
                      No address configured
                    </p>
                    <p className='text-sm text-muted-foreground mt-1 mb-4 text-center'>
                      Add a shipping address to speed up checkout
                    </p>
                    <UpdateAddressDialog address={user?.address} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerProfilePage
