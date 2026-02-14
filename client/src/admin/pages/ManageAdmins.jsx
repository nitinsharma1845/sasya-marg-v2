import React, { useState } from 'react'
import { useGetAllAdmins } from '../hooks/superAdmin.hooks'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  AlertCircle,
  UserPlus,
  Database
} from 'lucide-react'

import PaginationComp from '../components/Pagination'
import { Button } from '@/components/ui/button'
import AdminInviteDialog from '../components/AdminInviteDialog'

const AdminSkeleton = () => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {[1, 2, 3, 4, 5, 6].map(i => (
      <Card key={i} className='border-border bg-card shadow-sm'>
        <CardHeader className='pb-2'>
          <Skeleton className='h-12 w-12 rounded-full bg-secondary' />
          <Skeleton className='h-5 w-3/4 mt-4 bg-secondary' />
        </CardHeader>
        <CardContent className='space-y-4'>
          <Skeleton className='h-4 w-full bg-secondary' />
          <Skeleton className='h-4 w-2/3 bg-secondary' />
        </CardContent>
      </Card>
    ))}
  </div>
)

const ManageAdmins = () => {
  const { data, isLoading } = useGetAllAdmins()
  const [open, setOpen] = useState(false)

  const admins = Array.isArray(data?.data?.admins) ? data.data.admins : []

  const pagination = data?.data?.pagination || {}

  return (
    <div className='p-6 min-h-screen bg-background text-foreground'>
      <div className='flex flex-col items-start gap-5 justify-center'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-bold tracking-tight text-primary'>
              Admin Directory
            </h1>

            {!isLoading && (
              <Badge className='px-3 py-1 text-sm font-semibold bg-primary/10 text-primary border-primary/20'>
                <Database size={14} className='mr-1.5' />
                {pagination.total || admins.length} Total
              </Badge>
            )}
          </div>

          <p className='text-muted-foreground mt-1'>
            Manage and monitor system administrators.
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          variant='outline'
          className='lg:hidden flex gap-2 border-accent/20 text-accent hover:bg-accent/10 h-9'
        >
          <UserPlus size={16} />
          <span>Invite Admin</span>
        </Button>
        <AdminInviteDialog open={open} setOpen={setOpen} />
      </div>

      <Separator className='my-8' />

      {isLoading ? (
        <AdminSkeleton />
      ) : admins.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 bg-card border border-dashed rounded-xl'>
          <ShieldAlert size={48} className='text-muted mb-4' />
          <h2 className='text-xl font-semibold'>No Admins Found</h2>
          <p className='text-muted-foreground'>
            No administrator accounts available.
          </p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {admins.map(admin => {
              return (
                <Card
                  key={admin._id}
                  className='overflow-hidden border-border bg-card transition-all hover:shadow-xl hover:border-primary/40 duration-300'
                >
                  <CardHeader className='pb-3 bg-secondary/20'>
                    <div className='flex justify-between items-start'>
                      <div className='p-3 bg-card rounded-xl border border-border text-primary shadow-sm'>
                        <User size={22} />
                      </div>

                      <Badge className='bg-primary/10 text-primary border-primary/20'>
                        {admin.role
                          ? admin.role.charAt(0).toUpperCase() +
                            admin.role.slice(1)
                          : 'Administrator'}
                      </Badge>
                    </div>

                    <div className='mt-4 space-y-1'>
                      <h3 className='text-lg font-bold'>
                        {admin.fullname?.trim() || 'Unnamed Admin'}
                      </h3>

                      <p className='text-xs text-muted-foreground flex items-center gap-1'>
                        <Calendar size={12} />
                        {admin.createdAt
                          ? new Date(admin.createdAt).toLocaleDateString()
                          : 'Date Not Available'}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className='pt-5 space-y-4'>
                    <div className='flex items-center gap-3 text-sm'>
                      <Mail size={16} className='text-muted-foreground' />
                      {admin.email?.trim() ? (
                        <span className='truncate'>{admin.email}</span>
                      ) : (
                        <span className='text-xs text-muted-foreground flex items-center gap-1'>
                          <AlertCircle size={12} />
                          Not Provided
                        </span>
                      )}
                    </div>

                    <div className='flex items-center gap-3 text-sm'>
                      <Phone size={16} className='text-muted-foreground' />
                      {admin.phone?.trim() ? (
                        <span className='font-medium'>{admin.phone}</span>
                      ) : (
                        <span className='text-xs text-muted-foreground flex items-center gap-1'>
                          <AlertCircle size={12} />
                          Not Provided
                        </span>
                      )}
                    </div>

                    <div className='flex items-center gap-3 text-sm'>
                      <Clock size={16} className='text-muted-foreground' />
                      {admin.lastLogin ? (
                        <span>
                          {new Date(admin.lastLogin).toLocaleString()}
                        </span>
                      ) : (
                        <span className='text-xs text-muted-foreground'>
                          Never Logged In
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {pagination?.totalPages > 1 && (
            <div className='mt-12 flex justify-center'>
              <PaginationComp pagination={pagination} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ManageAdmins
