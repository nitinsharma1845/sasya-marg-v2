import React from 'react'
import { useGetFarmerById } from '../hooks/superAdmin.hooks'
import { useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  Droplets,
  LandPlot,
  Sprout,
  Info,
  EyeOff,
  Eye,
  Tractor,
  Fingerprint,
  ShieldCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BlockUserDialog } from '../components/BlockUserDialog'
import UnblockUserDialog from '../components/UnblockUserDialog'
import { useAuthStore } from '@/store/useAuthStore'

const DataPlaceholder = ({ text = 'Not Provided' }) => (
  <span className='text-muted-foreground/40 italic text-xs flex items-center gap-1 font-normal'>
    <Info size={12} /> {text}
  </span>
)

const InfoBox = ({ icon: Icon, label, value, colorClass }) => (
  <div className='flex items-center md:items-start gap-3 md:gap-4 p-3 md:p-5 rounded-2xl bg-card border border-border transition-all hover:border-primary/30 shadow-sm'>
    <div
      className={cn(
        'p-2 md:p-3 rounded-xl border flex shrink-0 items-center justify-center shadow-sm',
        colorClass
      )}
    >
      <Icon className='w-4 h-4 md:w-5 md:h-5' />
    </div>
    <div className='flex flex-col min-w-0 overflow-hidden'>
      <span className='text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate'>
        {label}
      </span>
      <span className='text-sm font-semibold truncate mt-0.5'>
        {value || <DataPlaceholder />}
      </span>
    </div>
  </div>
)

const SingleFarmerPage = () => {
  const { farmerId } = useParams()
  const { role } = useAuthStore()
  const { data: response, isPending } = useGetFarmerById(farmerId)

  if (isPending)
    return (
      <div className='p-4 md:p-8 space-y-6 animate-pulse max-w-6xl mx-auto'>
        <div className='h-40 w-full bg-muted rounded-3xl' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='h-64 bg-muted rounded-3xl' />
          <div className='h-64 md:col-span-2 bg-muted rounded-3xl' />
        </div>
      </div>
    )

  const farmer = response?.data || {}
  const farmlands = farmer.farmlands || []

  return (
    <div className='p-4 md:p-10 min-h-screen bg-background text-foreground max-w-7xl mx-auto space-y-6 md:space-y-10'>
      {/* 1. Header Hero Section - Fixed for Mobile */}
      <div className='relative overflow-hidden bg-card p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-border shadow-sm'>
        <Tractor
          size={180}
          className='absolute -right-10 -bottom-10 text-primary opacity-[0.04] pointer-events-none hidden sm:block'
        />

        <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>
            <div className='h-16 w-16 md:h-20 md:w-20 rounded-2xl md:rounded-3xl bg-primary/10 border border-primary/20 flex shrink-0 items-center justify-center text-primary shadow-inner'>
              <User size={32} className='md:w-10 md:h-10' />
            </div>

            <div className='space-y-1.5 md:space-y-2'>
              <div className='flex flex-wrap items-center gap-2 md:gap-3'>
                <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
                  {farmer.fullname || 'Unnamed Farmer'}
                </h1>
                <div className='flex gap-2'>
                  {farmer.isVarified && (
                    <Badge className='bg-emerald-500/10 text-emerald-600 border-emerald-500/20 flex items-center gap-1 font-bold text-[10px] md:text-xs'>
                      <CheckCircle2 size={12} /> Verified
                    </Badge>
                  )}
                  <Badge
                    variant={farmer.isActive ? 'outline' : 'destructive'}
                    className={cn(
                      'px-2 py-0.5 font-bold text-[10px] md:text-xs',
                      farmer.isActive &&
                        'border-primary text-primary bg-primary/5'
                    )}
                  >
                    {farmer.isActive ? 'Active' : 'Suspended'}
                  </Badge>
                </div>
              </div>

              <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-muted-foreground font-medium'>
                <span className='flex items-center gap-1.5'>
                  <Calendar size={14} className='text-primary' /> Joined{' '}
                  {new Date(farmer.createdAt).toLocaleDateString()}
                </span>
                <span className='flex items-center gap-1.5 font-mono text-[10px] bg-muted px-2 py-0.5 rounded-md border border-border'>
                  <Fingerprint size={12} /> {farmer._id?.slice(-8)}...
                </span>
              </div>
            </div>
          </div>

          {role === 'admin' && (
            <div className='w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-border'>
              {farmer?.isActive ? (
                <BlockUserDialog user={farmer} className='w-full md:w-auto' />
              ) : (
                <UnblockUserDialog user={farmer} className='w-full md:w-auto' />
              )}
            </div>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
        {/* Left Column: Personal Info */}
        <div className='space-y-6'>
          <h2 className='text-sm font-bold flex items-center gap-2 px-1 text-primary uppercase tracking-wider'>
            <ShieldCheck size={18} /> Personal Profile
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
            <InfoBox
              icon={Phone}
              label='Contact Number'
              value={farmer.phone}
              colorClass='bg-blue-500/5 text-blue-600 border-blue-500/10'
            />
            <InfoBox
              icon={Mail}
              label='Email Address'
              value={farmer.email}
              colorClass='bg-amber-500/5 text-amber-600 border-amber-500/10'
            />

            <div className='p-4 rounded-2xl bg-card border border-border flex justify-between items-center shadow-sm'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-secondary rounded-lg text-muted-foreground'>
                  {farmer.isContactVisible ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </div>
                <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
                  Visibility
                </span>
              </div>
              <Badge variant='outline' className='text-[10px] px-2'>
                {farmer.isContactVisible ? 'Public' : 'Private'}
              </Badge>
            </div>
          </div>

          {farmer.blockReason && (
            <div className='rounded-2xl border border-destructive/20 bg-destructive/5 p-5 space-y-2'>
              <div className='flex items-center gap-2 font-bold text-[10px] uppercase text-destructive'>
                <ShieldAlert size={14} /> Governance Restriction
              </div>
              <p className='text-sm italic text-destructive/90 font-medium leading-relaxed'>
                "{farmer.blockReason}"
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Farmlands */}
        <div className='lg:col-span-2 space-y-6'>
          <div className='flex items-center justify-between px-1'>
            <h2 className='text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-wider'>
              <LandPlot size={18} /> Registered Farmlands
            </h2>
            <Badge variant='secondary' className='rounded-full px-3'>
              {farmlands.length} Plots
            </Badge>
          </div>

          {farmlands.length === 0 ? (
            <div className='py-16 border-2 border-dashed border-border rounded-4xl flex flex-col items-center justify-center text-muted-foreground bg-secondary/5'>
              <Sprout size={40} className='opacity-20 mb-3' />
              <p className='text-sm font-medium'>No farmlands registered</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6'>
              {farmlands.map(plot => (
                <Card
                  key={plot._id}
                  className='rounded-3xl border-border overflow-hidden group hover:border-primary/40 transition-all shadow-sm'
                >
                  <div className='p-4 bg-muted/30 border-b border-border flex justify-between items-center'>
                    <div className='flex items-center gap-2.5 min-w-0'>
                      <LandPlot size={16} className='text-primary shrink-0' />
                      <span className='font-bold text-sm truncate'>
                        {plot.name || 'Untitled Plot'}
                      </span>
                    </div>
                    <Badge
                      className={cn(
                        'text-[9px] h-5 px-1.5 uppercase',
                        plot.isActive ? 'bg-primary' : 'bg-muted-foreground/30'
                      )}
                    >
                      {plot.isActive ? 'Active' : 'Fallow'}
                    </Badge>
                  </div>
                  <CardContent className='p-5 space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-1'>
                        <p className='text-[9px] font-bold text-muted-foreground uppercase'>
                          Area Size
                        </p>
                        <p className='text-sm font-bold'>
                          {plot.size?.value} {plot.size?.unit}
                        </p>
                      </div>
                      <div className='space-y-1 text-right'>
                        <p className='text-[9px] font-bold text-muted-foreground uppercase'>
                          Budget Est.
                        </p>
                        <p className='text-sm font-bold text-primary'>
                          ₹{plot.budget?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Separator className='opacity-50' />

                    <div className='space-y-2.5'>
                      {[
                        { icon: Sprout, label: 'Soil', val: plot.soilType },
                        {
                          icon: Droplets,
                          label: 'Water',
                          val: plot.water?.source
                        },
                        {
                          icon: MapPin,
                          label: 'Location',
                          val: `${plot.location?.locality}, ${plot.location?.district}`
                        }
                      ].map((item, i) => (
                        <div
                          key={i}
                          className='flex justify-between text-[13px]'
                        >
                          <span className='text-muted-foreground flex items-center gap-2'>
                            <item.icon size={13} /> {item.label}
                          </span>
                          <span className='font-semibold truncate max-w-30 capitalize'>
                            {item.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Badge
                      variant='outline'
                      className='w-full justify-center py-1 border-primary/20 text-primary bg-primary/5 text-[9px] font-bold tracking-tighter'
                    >
                      {plot.farmingType?.toUpperCase()} FARMING
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleFarmerPage
