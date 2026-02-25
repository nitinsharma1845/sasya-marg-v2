import React from 'react'
import { useGetAdminProfile } from '../../hooks/admin.hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Clock,
  Calendar,
  Key,
  Activity,
  UserCog,
  Lock,
  Smartphone,
  AtSign
} from 'lucide-react'
import ChangePasswordDialog from './ChangePasswordDailog'
import ChangeName from './ChangeName'

const ProfileSkeleton = () => (
  <div className='p-8 max-w-4xl mx-auto space-y-8'>
    <Skeleton className='h-12 w-64 bg-secondary' />
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <Skeleton className='h-64 w-full bg-secondary rounded-(--radius)' />
      <Skeleton className='h-64 md:col-span-2 w-full bg-secondary rounded-(--radius)' />
    </div>
  </div>
)

const AdminProfile = () => {
  const { data: response, isLoading } = useGetAdminProfile()

  if (isLoading) return <ProfileSkeleton />

  const admin = response?.data

  return (
    <div className='min-h-screen bg-background text-foreground p-6 lg:p-10'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <header className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div className='space-y-1'>
            <h1 className='text-3xl font-extrabold tracking-tight'>
              Administrator Profile
            </h1>
            <p className='text-muted-foreground text-sm font-medium'>
              Manage your identity and security protocols
            </p>
          </div>
          <Badge className='bg-primary text-primary-foreground px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold shadow-sm'>
            {admin?.role} Access
          </Badge>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='space-y-6'>
            <Card className='border-border shadow-sm bg-card overflow-hidden'>
              <CardContent className='pt-8 pb-8 flex flex-col items-center text-center'>
                <div className='w-24 h-24 rounded-full bg-secondary flex items-center justify-center border-4 border-background shadow-inner mb-4'>
                  <User className='w-12 h-12 text-primary' />
                </div>
                <h2 className='font-bold text-xl'>{admin?.fullname}</h2>
                <p className='text-xs font-mono text-muted-foreground mb-4 uppercase tracking-tighter'>
                  UID: {admin?._id}
                </p>

                <div className='flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20'>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      admin?.isActive
                        ? 'bg-primary animate-pulse'
                        : 'bg-destructive'
                    }`}
                  />
                  <span className='text-[10px] font-bold text-primary uppercase tracking-tighter'>
                    {admin?.isActive ? 'Status: Active' : 'Status: Inactive'}
                  </span>
                </div>
              </CardContent>
              <Separator />
              <CardContent className='py-4 bg-muted/20'>
                <div className='flex items-center justify-between text-xs'>
                  <span className='text-muted-foreground font-medium'>
                    Onboarded
                  </span>
                  <span className='font-bold'>
                    {new Date(admin?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className='p-4 rounded-(--radius) bg-primary text-primary-foreground shadow-lg flex items-center gap-3'>
              <div className='p-2 bg-white/10 rounded-lg'>
                <ShieldCheck className='w-5 h-5 text-accent' />
              </div>
              <div className='flex flex-col'>
                <span className='text-[9px] uppercase font-black leading-none opacity-80'>
                  Security Level
                </span>
                <span className='text-sm font-bold'>Full Authority</span>
              </div>
            </div>
          </div>

          <div className='md:col-span-2 space-y-6'>
            {/* Details Section */}
            <Card className='border-border shadow-sm bg-card'>
              <CardHeader className='pb-4 border-b border-border bg-muted/10'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Activity className='w-4 h-4 text-primary' />
                  System Identification
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6 space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div className='space-y-1'>
                    <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
                      Primary Email
                    </label>
                    <div className='flex items-center gap-2'>
                      <Mail className='w-4 h-4 text-primary' />
                      <span className='font-medium text-sm'>
                        {admin?.email}
                      </span>
                    </div>
                  </div>
                  <div className='space-y-1'>
                    <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
                      Contact Line
                    </label>
                    <div className='flex items-center gap-2'>
                      <Phone className='w-4 h-4 text-primary' />
                      <span className='font-medium text-sm'>
                        {admin?.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className='opacity-50' />

                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4 text-primary' />
                    <h3 className='font-bold text-[11px] uppercase tracking-widest text-muted-foreground'>
                      Activity Logs
                    </h3>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='p-3 rounded-(--radius) bg-muted/30 border border-border'>
                      <p className='text-[9px] font-black text-muted-foreground uppercase mb-1'>
                        Last Authenticated
                      </p>
                      <div className='flex items-center gap-2 font-bold text-[11px]'>
                        <Calendar className='w-3 h-3 text-primary' />
                        {new Date(admin?.lastLogin).toLocaleString()}
                      </div>
                    </div>
                    <div className='p-3 rounded-(--radius) bg-muted/30 border border-border'>
                      <p className='text-[9px] font-black text-muted-foreground uppercase mb-1'>
                        Record Modified
                      </p>
                      <div className='flex items-center gap-2 font-bold text-[11px]'>
                        <Key className='w-3 h-3 text-primary' />
                        {new Date(admin?.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Management Actions Grid */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 px-1'>
                <UserCog className='w-4 h-4 text-primary' />
                <h3 className='text-[11px] font-bold uppercase tracking-widest'>
                  Management Actions
                </h3>
              </div>

              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                <ChangePasswordDialog />

                <ChangeName />

                <button className='flex flex-col items-center justify-center p-4 rounded-(--radius) bg-secondary hover:bg-border transition-all group border border-transparent hover:border-primary/20'>
                  <Smartphone className='w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform' />
                  <span className='text-[10px] font-bold uppercase tracking-tight'>
                    New Phone
                  </span>
                </button>

                <button className='flex flex-col items-center justify-center p-4 rounded-(--radius) bg-secondary hover:bg-border transition-all group border border-transparent hover:border-primary/20'>
                  <AtSign className='w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform' />
                  <span className='text-[10px] font-bold uppercase tracking-tight'>
                    Modify Email
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
