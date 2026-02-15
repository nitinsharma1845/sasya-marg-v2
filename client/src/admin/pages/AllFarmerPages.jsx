import React from 'react'
import { useGetAllFarmers } from '../hooks/superAdmin.hooks'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  Tractor,
  AlertCircle,
  IdCard
} from 'lucide-react'
import PaginationComp from '../components/Pagination'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import Toolbar from '../components/Toolbar'

const FarmerSkeleton = () => (
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

const AllFarmerPages = () => {
  const { data, isLoading } = useGetAllFarmers()
  const { role } = useAuthStore()

  console.log(role)
  const navigate = useNavigate()

  const farmers = data?.data?.farmers || []
  const pagination = data?.data?.pagination || {}

  return (
    <div className='p-6 min-h-screen bg-background text-foreground'>
      <div>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl font-bold tracking-tight text-primary'>
            Farmer Directory
          </h1>
          {!isLoading && (
            <Badge className='px-3 py-1 text-sm font-semibold bg-primary/10 text-primary border-primary/20'>
              <Tractor size={14} className='mr-1.5' />
              {pagination.total || farmers.length} Total
            </Badge>
          )}
        </div>
        <p className='text-muted-foreground mt-1'>
          Manage and monitor registered farmers in the system.
        </p>

        {role === 'admin' && <Toolbar />}
      </div>

      <Separator className='my-8' />

      {isLoading ? (
        <FarmerSkeleton />
      ) : farmers.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 bg-card border border-dashed rounded-xl'>
          <Tractor size={48} className='text-muted mb-4' />
          <h2 className='text-xl font-semibold'>No Farmers Registered</h2>
          <p className='text-muted-foreground'>No farmer records found.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {farmers.map(farmer => (
            <Card
              onClick={() => navigate(`${farmer._id}`)}
              key={farmer._id}
              className='overflow-hidden border-border bg-card transition-all hover:shadow-xl hover:border-primary/40 duration-300'
            >
              <CardHeader className='pb-3 bg-secondary/20'>
                <div className='flex justify-between items-start'>
                  <div className='p-3 bg-card rounded-xl border border-border text-primary shadow-sm'>
                    <User size={22} />
                  </div>

                  <div className='flex flex-col items-end gap-2'>
                    <Badge
                      variant={farmer.isActive ? 'outline' : 'destructive'}
                      className={
                        farmer.isActive
                          ? 'border-primary text-primary bg-primary/5'
                          : 'bg-destructive/80'
                      }
                    >
                      {farmer.isActive ? 'Active' : 'Inactive'}
                    </Badge>

                    {farmer.isVarified && (
                      <Badge className='bg-green-100 text-green-700 border-green-200 flex items-center gap-1'>
                        <CheckCircle2 size={12} /> Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className='mt-4'>
                  <h3 className='text-lg font-bold'>
                    {farmer.fullname || 'Unnamed Farmer'}
                  </h3>
                  <p className='text-xs text-muted-foreground mt-2 flex items-center gap-1'>
                    <Calendar size={12} />
                    {new Date(farmer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardHeader>

              <CardContent className='pt-5 space-y-3'>
                <div className='flex items-center gap-3 text-sm'>
                  <IdCard size={16} className='text-muted-foreground' />
                  <span className='font-medium'>
                    {farmer._id || (
                      <Badge
                        variant='outline'
                        className='text-xs text-muted-foreground'
                      >
                        Not Provided
                      </Badge>
                    )}
                  </span>
                </div>

                <div className='flex items-center gap-3 text-sm'>
                  <Phone size={16} className='text-muted-foreground' />
                  <span className='font-medium'>
                    {farmer.phone || (
                      <Badge
                        variant='outline'
                        className='text-xs text-muted-foreground'
                      >
                        Not Provided
                      </Badge>
                    )}
                  </span>
                </div>

                <div className='flex items-center gap-3 text-sm'>
                  <Mail size={16} className='text-muted-foreground' />
                  {farmer.email ? (
                    <span className='truncate'>{farmer.email}</span>
                  ) : (
                    <Badge
                      variant='outline'
                      className='text-xs text-muted-foreground flex items-center gap-1'
                    >
                      <AlertCircle size={12} />
                      Not Provided
                    </Badge>
                  )}
                </div>

                {!farmer.isActive && farmer.blockReason && (
                  <div className='mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg'>
                    <div className='flex items-center gap-2 text-destructive'>
                      <ShieldAlert size={14} />
                      <p className='text-[10px] font-bold uppercase'>
                        Restricted Access
                      </p>
                    </div>
                    <p className='text-sm text-destructive/70 mt-1 italic'>
                      "{farmer.blockReason}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {pagination?.totalPages > 1 && (
        <div className='mt-12 flex justify-center'>
          <PaginationComp pagination={pagination} />
        </div>
      )}
    </div>
  )
}

export default AllFarmerPages
