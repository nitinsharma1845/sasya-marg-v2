import React from 'react'
import { useGetAdminById } from '../hooks/superAdmin.hooks'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  UserCircle2,
  Mail,
  Phone,
  ShieldCheck,
  Activity,
  Calendar,
  Fingerprint,
  Lock,
  Clock,
  Info,
  Database
} from 'lucide-react'
import { cn } from '@/lib/utils'

const DataPlaceholder = () => (
  <span className='text-muted-foreground/40 italic text-xs flex items-center gap-1 font-normal'>
    <Info size={12} /> Not Set
  </span>
)

const InfoBox = ({ icon: Icon, label, value, colorClass }) => (
  <div className='flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-card border border-border transition-all hover:border-primary/30 shadow-sm min-w-0'>
    <div
      className={cn(
        'h-11 w-11 md:h-12 md:w-12 shrink-0 rounded-xl border flex items-center justify-center shadow-sm',
        colorClass
      )}
    >
      <Icon size={18} className='md:size-5' />
    </div>
    <div className='flex flex-col min-w-0 flex-1'>
      <span className='text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1'>
        {label}
      </span>
      <span className='text-sm font-semibold truncate text-foreground'>
        {value || <DataPlaceholder />}
      </span>
    </div>
  </div>
)

const SingleAdminPage = () => {
  const { adminId } = useParams()
  const { data: response, isPending } = useGetAdminById(adminId)

  if (isPending)
    return (
      <div className='p-4 md:p-8 space-y-6 animate-pulse max-w-6xl mx-auto'>
        <div className='h-24 md:h-32 w-full bg-secondary rounded-2xl md:rounded-4xl' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='h-48 bg-secondary rounded-2xl' />
          <div className='h-48 bg-secondary rounded-2xl' />
        </div>
      </div>
    )

  const admin = response?.data || {}

  return (
    <div className='p-4 md:p-10 min-h-screen bg-background text-foreground max-w-6xl mx-auto space-y-6 md:space-y-8'>
      <div className='relative overflow-hidden bg-card p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-border shadow-sm flex flex-col md:flex-row items-center md:items-start gap-5'>
        <Lock
          size={150}
          className='absolute -right-6 -bottom-6 text-accent opacity-[0.03] pointer-events-none hidden sm:block'
        />

        <div className='flex items-center gap-4 md:gap-6 z-10 w-full min-w-0'>
          <div className='h-14 w-14 md:h-20 md:w-20 shrink-0 rounded-2xl md:rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-foreground shadow-inner'>
            <UserCircle2 className='w-8 h-8 md:w-10 md:h-10' />
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex flex-col gap-1.5'>
              <h1 className='text-xl md:text-3xl font-bold tracking-tight truncate pr-2'>
                {admin.fullname || 'Admin Account'}
              </h1>
              <div className='flex gap-2 flex-wrap'>
                <Badge className='bg-accent/10 text-accent-foreground border-accent/20 text-[9px] px-2 py-0 h-5 font-bold uppercase'>
                  {admin.role}
                </Badge>
                <Badge
                  variant={admin.isActive ? 'outline' : 'destructive'}
                  className={cn(
                    'text-[9px] px-2 py-0 h-5 font-bold uppercase',
                    admin.isActive && 'border-primary text-primary bg-primary/5'
                  )}
                >
                  {admin.isActive ? 'Live' : 'Inactive'}
                </Badge>
              </div>
              <div className='flex items-center gap-2 mt-1'>
                <span className='flex items-center gap-1 font-mono text-[10px] bg-muted px-2 py-0.5 rounded-md text-primary max-w-35 truncate'>
                  <Fingerprint size={10} className='shrink-0' /> {admin._id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
        <div className='lg:col-span-2 space-y-6'>
          <h2 className='text-sm font-bold flex items-center gap-2 px-1 text-primary uppercase tracking-widest'>
            <Database size={16} className='shrink-0' /> System Access Info
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <InfoBox
              icon={Mail}
              label='Admin Email'
              value={admin.email}
              colorClass='bg-primary/5 text-primary border-primary/10'
            />
            <InfoBox
              icon={Phone}
              label='Security Phone'
              value={admin.phone}
              colorClass='bg-primary/5 text-primary border-primary/10'
            />
            <InfoBox
              icon={Calendar}
              label='Joined Date'
              value={
                admin.createdAt
                  ? new Date(admin.createdAt).toLocaleDateString()
                  : null
              }
              colorClass='bg-secondary text-muted-foreground border-border'
            />
            <InfoBox
              icon={Activity}
              label='Last Sync'
              value={
                admin.updatedAt
                  ? new Date(admin.updatedAt).toLocaleTimeString()
                  : null
              }
              colorClass='bg-secondary text-muted-foreground border-border'
            />
          </div>

          <Card className='rounded-3xl md:rounded-4xl border-border bg-card shadow-sm overflow-hidden mt-6'>
            <CardHeader className='bg-secondary/20 py-4 px-6'>
              <CardTitle className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2'>
                <Clock size={14} className='shrink-0' /> Recent Session
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className='flex items-center gap-4 min-w-0'>
                  <div className='h-10 w-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200'>
                    <Activity size={20} />
                  </div>
                  <div className='min-w-0'>
                    <p className='text-[10px] text-muted-foreground font-bold uppercase'>
                      Latest Login
                    </p>
                    <p className='text-sm font-bold truncate'>
                      {admin.lastLogin
                        ? new Date(admin.lastLogin).toLocaleString()
                        : 'First Session Pending'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10 shrink-0 uppercase'>
                  <ShieldCheck size={12} /> Verified Session
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <h2 className='text-sm font-bold flex items-center gap-2 px-1 text-primary uppercase tracking-widest'>
            <Lock size={16} className='shrink-0' /> Authority status
          </h2>

          <Card className='rounded-3xl md:rounded-[2.5rem] border-border bg-card overflow-hidden shadow-sm'>
            <CardContent className='p-6 md:p-8 space-y-6'>
              <div className='flex flex-col items-center text-center gap-4'>
                <div
                  className={cn(
                    'h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center shadow-lg transform rotate-2',
                    admin.isActive
                      ? 'bg-primary text-white'
                      : 'bg-destructive text-white'
                  )}
                >
                  <ShieldCheck size={28} />
                </div>
                <div className='space-y-2'>
                  <h3 className='text-lg font-bold'>
                    {admin.isActive ? 'Active Authority' : 'Account Locked'}
                  </h3>
                  <p className='text-xs text-muted-foreground leading-relaxed'>
                    {admin.isActive
                      ? 'Administrator is currently authorized for governance and system modifications.'
                      : 'Access is restricted. This user cannot perform administrative tasks.'}
                  </p>
                </div>
              </div>

              <Separator className='bg-border/50' />

              <div className='space-y-3'>
                <div className='flex justify-between items-center text-xs'>
                  <span className='text-muted-foreground font-bold uppercase tracking-tighter'>
                    System Tier
                  </span>
                  <Badge
                    variant='outline'
                    className='h-5 capitalize border-primary/20 text-primary bg-primary/5'
                  >
                    {admin.role}
                  </Badge>
                </div>
                <div className='flex justify-between items-center text-xs'>
                  <span className='text-muted-foreground font-bold uppercase tracking-tighter'>
                    Global Edit
                  </span>
                  <span className='font-bold text-emerald-600'>Enabled</span>
                </div>
              </div>

              <div className='pt-4'>
                <div className='p-3 rounded-xl bg-muted/50 border border-dashed border-border text-center'>
                  <p className='text-[9px] text-muted-foreground font-bold uppercase tracking-widest'>
                    Account Audit Passed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SingleAdminPage
