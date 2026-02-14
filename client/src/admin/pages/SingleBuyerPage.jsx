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

  if (isPending)
    return (
      <div className='p-8 space-y-6 animate-pulse max-w-5xl mx-auto'>
        <div className='h-32 w-full bg-secondary rounded-[2rem]' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='h-48 bg-secondary rounded-[2rem]' />
          <div className='h-48 bg-secondary rounded-[2rem]' />
        </div>
      </div>
    )

  const buyer = response?.data || {}

  return (
    <div className='p-6 md:p-10 min-h-screen bg-background text-foreground max-w-6xl mx-auto space-y-8'>
      {/* 1. Header Hero Section */}
      <div className='relative overflow-hidden bg-card p-8 rounded-[2.5rem] border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6'>
        {/* Abstract Background Icon */}
        <UserCheck
          size={180}
          className='absolute -right-10 -bottom-10 text-primary opacity-[0.03] pointer-events-none'
        />

        <div className='flex items-center gap-6 z-10'>
          <div className='h-20 w-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shadow-inner'>
            <User size={42} />
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-3 flex-wrap'>
              <h1 className='text-3xl font-bold tracking-tight'>
                {buyer.fullname || <DataPlaceholder text='Unnamed Buyer' />}
              </h1>
              <Badge
                variant={buyer.isBlocked ? 'destructive' : 'secondary'}
                className={cn(
                  'px-3 py-1 font-bold',
                  !buyer.isBlocked &&
                    'bg-blue-100 text-blue-700 hover:bg-blue-200'
                )}
              >
                {buyer.isBlocked ? 'Blocked Access' : 'Authorized Buyer'}
              </Badge>
            </div>
            <div className='flex items-center gap-4 text-sm text-muted-foreground font-medium'>
              <span className='flex items-center gap-1'>
                <Calendar size={14} /> Joined{' '}
                {new Date(buyer.createdAt).toLocaleDateString()}
              </span>
              <span className='flex items-center gap-1 font-mono text-xs bg-muted px-2 py-0.5 rounded-md'>
                <Fingerprint size={12} /> {buyer._id}
              </span>
            </div>
          </div>
        </div>
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
          <Card className='rounded-[2rem] border-border bg-card shadow-sm overflow-hidden'>
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
              'rounded-[2rem] border-border overflow-hidden transition-all',
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
