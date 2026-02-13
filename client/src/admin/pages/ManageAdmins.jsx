import React from 'react'
import { useGetAllAdmins } from '../hooks/superAdmin.hooks'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  UserCircle2,
  Mail,
  Phone,
  ShieldCheck,
  UserCog,
  Database,
  Hash
} from 'lucide-react'
import PaginationComp from '../components/Pagination'

const AdminCard = ({ admin }) => (
  <Card className='group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 min-h-125 flex flex-col'>
    <div className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/40 via-primary to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

    <CardHeader className='pb-6 pt-8'>
      <div className='flex flex-col items-center text-center gap-4'>
        <div className='relative'>
          <div className='h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary ring-4 ring-background shadow-md'>
            <UserCircle2 size={54} />
          </div>
          <div className='absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-2 rounded-full shadow-lg'>
            <ShieldCheck size={16} />
          </div>
        </div>

        <div className='space-y-1'>
          <h3 className='text-2xl font-bold tracking-tight text-foreground'>
            {admin.fullname}
          </h3>
          <Badge className='bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 rounded-full'>
            Administrator
          </Badge>
        </div>
      </div>
    </CardHeader>

    <CardContent className='px-8 pb-10 space-y-5 flex-1 flex flex-col justify-center'>
      <div className='flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/40'>
        <div className='p-2 rounded-lg bg-background border border-border text-primary'>
          <Mail size={18} />
        </div>
        <div className='flex flex-col min-w-0'>
          <span className='text-xs text-muted-foreground font-medium'>
            Email
          </span>
          <span className='text-sm font-semibold truncate'>{admin.email}</span>
        </div>
      </div>

      <div className='flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/40'>
        <div className='p-2 rounded-lg bg-background border border-border text-primary'>
          <Phone size={18} />
        </div>
        <div className='flex flex-col'>
          <span className='text-xs text-muted-foreground font-medium'>
            Phone
          </span>
          <span className='text-sm font-semibold'>{admin.phone}</span>
        </div>
      </div>

      <div className='flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/40'>
        <div className='p-2 rounded-lg bg-background border border-border text-primary'>
          <Hash size={18} />
        </div>
        <div className='flex flex-col min-w-0'>
          <span className='text-xs text-muted-foreground font-medium'>
            Admin ID
          </span>
          <span className='text-xs font-mono text-muted-foreground truncate'>
            {admin._id}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
)

const ManageAdmins = () => {
  const { data: response, isLoading } = useGetAllAdmins()

  if (isLoading) return <AdminSkeleton />

  const admins = response?.data?.admins || []
  const pagination = response?.data?.pagination

  return (
    <div className='bg-background min-h-screen pb-24 flex justify-center'>
      <div className='w-full max-w-450 px-6 md:px-12'>
        <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-border pb-10'>
          <div className='space-y-3 max-w-3xl'>
            <div className='flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider'>
              <div className='h-2 w-2 rounded-full bg-primary animate-pulse' />
              System Authority
            </div>

            <h1 className='text-5xl font-bold tracking-tight'>
              Admin <span className='text-primary'>Registry</span>
            </h1>

            <p className='text-muted-foreground text-base leading-relaxed'>
              Overview of personnel with elevated privileges and governance
              access across the SasyaMarg platform.
            </p>
          </div>

          <div className='flex items-center gap-6 bg-card/70 backdrop-blur-sm border border-border/60 rounded-2xl px-8 py-6 shadow-sm'>
            <div className='text-right'>
              <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                Total Admins
              </p>
              <p className='text-4xl font-bold text-primary tabular-nums'>
                {pagination?.total || 0}
              </p>
            </div>

            <div className='h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary'>
              <Database size={26} />
            </div>
          </div>
        </div>

        <div className='grid gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {admins.map(admin => (
            <AdminCard key={admin._id} admin={admin} />
          ))}
        </div>

        {admins.length === 0 && (
          <div className='h-87.5 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl bg-secondary/10 mt-12'>
            <UserCog
              size={60}
              className='text-muted-foreground mb-4 opacity-30'
            />
            <p className='text-muted-foreground font-medium'>
              No administrators found
            </p>
          </div>
        )}

        {pagination && (
          <div className='mt-20 flex justify-center'>
            <PaginationComp pagination={pagination} />
          </div>
        )}
      </div>
    </div>
  )
}

const AdminSkeleton = () => (
  <div className='bg-background min-h-screen flex justify-center'>
    <div className='w-full max-w-450 p-12 space-y-20'>
      <div className='flex justify-between items-end pb-10 border-b border-border'>
        <div className='space-y-4'>
          <Skeleton className='h-14 w-96 bg-secondary' />
          <Skeleton className='h-5 w-72 bg-secondary' />
        </div>
        <Skeleton className='h-24 w-64 bg-secondary rounded-2xl' />
      </div>

      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {[1, 2, 3, 4].map(i => (
          <Card
            key={i}
            className='rounded-2xl border border-border p-8 space-y-6 min-h-95'
          >
            <div className='flex flex-col items-center gap-4'>
              <Skeleton className='h-24 w-24 rounded-full bg-secondary' />
              <Skeleton className='h-6 w-40 bg-secondary' />
              <Skeleton className='h-4 w-24 bg-secondary' />
            </div>

            <div className='space-y-4 pt-4'>
              <Skeleton className='h-14 w-full bg-secondary rounded-xl' />
              <Skeleton className='h-14 w-full bg-secondary rounded-xl' />
              <Skeleton className='h-14 w-full bg-secondary rounded-xl' />
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
)

export default ManageAdmins
