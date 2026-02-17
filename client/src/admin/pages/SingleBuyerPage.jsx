import React from 'react'
import { useGetBuyerById } from '../hooks/superAdmin.hooks'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Info,
  Clock,
  Fingerprint,
  UserCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { BlockUserDialog } from '../components/BlockUserDialog'
import UnblockUserDialog from '../components/UnblockUserDialog'

const DataPlaceholder = ({ text = 'Not Provided' }) => (
  <span className='text-muted-foreground/40 italic text-xs flex items-center gap-1 font-normal'>
    <Info size={12} /> {text}
  </span>
)

const InfoBox = ({ icon: Icon, label, value, colorClass }) => (
  <div className='flex items-start gap-4 p-5 rounded-2xl bg-card border border-border transition-all hover:border-primary/30 shadow-sm'>
    <div
      className={cn(
        'p-3 rounded-xl border flex items-center justify-center shadow-sm',
        colorClass
      )}
    >
      <Icon size={20} />
    </div>
    <div className='flex flex-col min-w-0'>
      <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
        {label}
      </span>
      <span className='text-sm font-semibold truncate mt-0.5'>
        {value || <DataPlaceholder />}
      </span>
    </div>
  </div>
)

const SingleBuyerPage = () => {
  const { buyerId } = useParams()
  const { data: response, isPending } = useGetBuyerById(buyerId)
  const { role } = useAuthStore()

  if (isPending)
    return (
      <div className='p-8 space-y-6 animate-pulse max-w-5xl mx-auto'>
        <div className='h-32 w-full bg-secondary rounded-4xl' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='h-48 bg-secondary rounded-4xl' />
          <div className='h-48 bg-secondary rounded-4xl' />
        </div>
      </div>
    )

  const buyer = response?.data || {}
  const isBlocked = buyer?.isBlocked || false

  return (
    <div className='p-6 md:p-10 min-h-screen bg-background text-foreground max-w-6xl mx-auto space-y-8'>
      
      <div className='relative overflow-hidden bg-card p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <UserCheck
          size={120}
          className='absolute -right-6 -bottom-6 md:-right-10 md:-bottom-10 text-primary opacity-[0.04] pointer-events-none'
        />

        <div className='flex items-start sm:items-center gap-4 sm:gap-6 z-10 w-full md:w-auto'>
          <div className='h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-2xl md:rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner shrink-0'>
            <User size={28} className='sm:hidden' />
            <User size={34} className='hidden sm:block md:hidden' />
            <User size={42} className='hidden md:block' />
          </div>

          <div className='space-y-2 min-w-0'>
            <div className='flex items-center gap-2 sm:gap-3 flex-wrap'>
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight truncate'>
                {buyer.fullname || <DataPlaceholder text='Unnamed Buyer' />}
              </h1>

              <Badge
                variant={buyer.isBlocked ? 'destructive' : 'secondary'}
                className={cn(
                  'px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold whitespace-nowrap',
                  !buyer.isBlocked &&
                    'bg-primary/10 text-primary hover:bg-primary/20'
                )}
              >
                {buyer.isBlocked ? 'Blocked Access' : 'Authorized Buyer'}
              </Badge>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-medium'>
              <span className='flex items-center gap-1'>
                <Calendar size={12} /> Joined{' '}
                {new Date(buyer.createdAt).toLocaleDateString()}
              </span>

              <span className='flex items-center gap-1 font-mono text-[10px] sm:text-xs bg-muted px-2 py-0.5 rounded-md truncate max-w-45 sm:max-w-none'>
                <Fingerprint size={10} /> {buyer._id}
              </span>
            </div>
          </div>
        </div>

        {role === 'admin' && (
          <div className='w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-border'>
            {!isBlocked ? (
              <BlockUserDialog user={buyer} className='w-full md:w-auto' />
            ) : (
              <UnblockUserDialog user={buyer} className='w-full md:w-auto' />
            )}
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* 2. Primary Contact Details */}
        <div className='lg:col-span-2 space-y-6'>
          <h2 className='text-lg font-bold flex items-center gap-2 px-2 text-primary'>
            <ShieldCheck size={20} /> Identity & Contact
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoBox
              icon={Mail}
              label='Verified Email'
              value={buyer.email}
              colorClass='bg-blue-50 text-blue-600 border-blue-100'
            />
            <InfoBox
              icon={Phone}
              label='Mobile Number'
              value={buyer.phone}
              colorClass='bg-emerald-50 text-emerald-600 border-emerald-100'
            />
            <div className='md:col-span-2'>
              <InfoBox
                icon={MapPin}
                label='Registered Business Address'
                value={
                  buyer.address
                    ? `${buyer.address.addressLine}, ${buyer.address.city}, ${buyer.address.state} - ${buyer.address.pincode}`
                    : 'No address documented'
                }
                colorClass='bg-orange-50 text-orange-600 border-orange-100'
              />
            </div>
          </div>

          {/* Activity Log Summary */}
          <Card className='rounded-4xl border-border bg-card shadow-sm overflow-hidden'>
            <CardHeader className='bg-secondary/20 pb-4'>
              <CardTitle className='text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2'>
                <Clock size={14} /> System Records
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                <div className='space-y-1'>
                  <p className='text-xs text-muted-foreground'>
                    Account Last Updated
                  </p>
                  <p className='text-sm font-semibold'>
                    {new Date(buyer.updatedAt).toLocaleString()}
                  </p>
                </div>
                <Separator className='md:hidden' />
                <div className='space-y-1'>
                  <p className='text-xs text-muted-foreground'>
                    User Permission Role
                  </p>
                  <Badge className='bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 uppercase text-[10px]'>
                    {buyer.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. Side Column: Security & Moderation */}
        <div className='space-y-6'>
          <h2 className='text-lg font-bold flex items-center gap-2 px-2 text-primary'>
            <ShieldAlert size={20} /> Moderation
          </h2>

          <Card
            className={cn(
              'rounded-4xl border-border overflow-hidden transition-all',
              buyer.isBlocked
                ? 'border-destructive/30 bg-destructive/5'
                : 'bg-card'
            )}
          >
            <CardContent className='p-6 space-y-4'>
              <div className='flex flex-col items-center text-center gap-3'>
                <div
                  className={cn(
                    'h-12 w-12 rounded-full flex items-center justify-center shadow-sm',
                    buyer.isBlocked
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-emerald-100 text-emerald-600'
                  )}
                >
                  {buyer.isBlocked ? (
                    <ShieldAlert size={24} />
                  ) : (
                    <ShieldCheck size={24} />
                  )}
                </div>
                <div>
                  <h3 className='font-bold'>
                    {buyer.isBlocked ? 'Restricted Account' : 'Good Standing'}
                  </h3>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {buyer.isBlocked
                      ? 'This user is currently prohibited from transactions.'
                      : 'This account has no active violations.'}
                  </p>
                </div>
              </div>

              {buyer.isBlocked && (
                <div className='mt-4 p-4 rounded-2xl bg-white border border-destructive/20 shadow-sm'>
                  <p className='text-[10px] font-bold text-destructive uppercase mb-1'>
                    Block Reason
                  </p>
                  <p className='text-sm italic text-foreground'>
                    "
                    {buyer.blockReason ||
                      'Reason not provided by administrator'}
                    "
                  </p>
                </div>
              )}

              <Separator className='bg-border/50' />

              <div className='text-center'>
                <p className='text-[10px] text-muted-foreground italic font-medium'>
                  Managed by Sasya Marg Super-Admin Governance
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SingleBuyerPage
