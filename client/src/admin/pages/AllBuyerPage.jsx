import React from 'react'
import { useGetAllBuyers } from '../hooks/superAdmin.hooks'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Users
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import PaginationComp from '../components/Pagination'
import { useNavigate } from 'react-router-dom'

const BuyerSkeleton = () => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {[1, 2, 3, 4, 5, 6].map(i => (
      <Card key={i} className='border-border bg-card'>
        <CardHeader className='pb-2'>
          <div className='flex justify-between items-start'>
            <Skeleton className='h-12 w-12 rounded-full bg-secondary' />
            <Skeleton className='h-6 w-20 rounded-md bg-secondary' />
          </div>
          <Skeleton className='h-5 w-3/4 mt-4 bg-secondary' />
          <Skeleton className='h-4 w-1/2 mt-2 bg-secondary' />
        </CardHeader>
        <CardContent className='space-y-4'>
          <Skeleton className='h-4 w-full bg-secondary' />
          <Skeleton className='h-4 w-full bg-secondary' />
          <div className='pt-4 border-t'>
            <Skeleton className='h-10 w-full rounded-md bg-secondary' />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const AllBuyerPage = () => {
  const { data, isLoading } = useGetAllBuyers()
  const navigate = useNavigate()

  const buyers = data?.data?.buyers || []
  const pagination = data?.data?.pagination || {}

  return (
    <div className='p-6 min-h-screen bg-background text-foreground'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-bold tracking-tight text-primary'>
              Buyer Directory
            </h1>
            {!isLoading && (
              <Badge
                variant='secondary'
                className='px-3 py-1 text-sm font-semibold bg-primary/10 text-primary border-primary/20'
              >
                <Users size={14} className='mr-1.5' />
                {pagination.total || buyers.length} Total
              </Badge>
            )}
          </div>
          <p className='text-muted-foreground mt-1'>
            Comprehensive list of all registered buyers in Sasya Marg.
          </p>
        </div>
      </div>

      <Separator className={'my-8'} />

      {isLoading ? (
        <BuyerSkeleton />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {buyers.map(buyer => (
            <Card
              onClick={() => navigate(`${buyer._id}`)}
              key={buyer._id}
              className='overflow-hidden border-border transition-all hover:shadow-md hover:border-primary/30'
            >
              <CardHeader className='pb-3 bg-secondary/30'>
                <div className='flex justify-between items-start'>
                  <div className='p-3 bg-card rounded-xl border border-border text-primary shadow-sm'>
                    <User size={24} />
                  </div>
                  <Badge
                    variant={buyer.isBlocked ? 'destructive' : 'outline'}
                    className={
                      !buyer.isBlocked
                        ? 'border-primary text-primary bg-primary/5'
                        : 'bg-destructive/10'
                    }
                  >
                    {buyer.isBlocked ? (
                      <span className='flex items-center gap-1'>
                        <ShieldAlert size={12} /> Blocked
                      </span>
                    ) : (
                      <span className='flex items-center gap-1'>
                        <ShieldCheck size={12} /> Active
                      </span>
                    )}
                  </Badge>
                </div>
                <div className='mt-4'>
                  <h3 className='text-lg font-bold leading-none'>
                    {buyer.fullname}
                  </h3>
                  <p className='text-sm text-muted-foreground mt-2 flex items-center gap-1'>
                    <Calendar size={13} /> Joined{' '}
                    {new Date(buyer.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </CardHeader>

              <CardContent className='pt-5 space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 text-sm group'>
                    <Mail
                      size={16}
                      className='text-muted-foreground shrink-0 group-hover:text-primary transition-colors'
                    />
                    <span className='truncate'>{buyer.email}</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm group'>
                    <Phone
                      size={16}
                      className='text-muted-foreground shrink-0 group-hover:text-primary transition-colors'
                    />
                    <span>{buyer.phone}</span>
                  </div>
                  <div className='flex items-start gap-3 text-sm group'>
                    <MapPin
                      size={16}
                      className='text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors'
                    />
                    <span className='leading-relaxed'>
                      {buyer.address ? (
                        `${buyer.address.addressLine}, ${buyer.address.city}, ${buyer.address.state} - ${buyer.address.pincode}`
                      ) : (
                        <span className='italic text-muted-foreground'>
                          Address not verified
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {buyer.isBlocked && buyer.blockReason && (
                  <div className='mt-4 p-3 bg-destructive/5 border border-destructive/10 rounded-lg'>
                    <p className='text-[10px] font-bold text-destructive uppercase tracking-wider'>
                      Restriction Note
                    </p>
                    <p className='text-sm text-destructive/90 mt-1 italic'>
                      "{buyer.blockReason}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && buyers.length === 0 && (
        <div className='flex flex-col items-center justify-center py-24 bg-card border border-dashed rounded-xl'>
          <Users size={48} className='text-muted mb-4' />
          <h2 className='text-xl font-semibold'>No Buyers Registered</h2>
          <p className='text-muted-foreground'>
            The buyer list is currently empty.
          </p>
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

export default AllBuyerPage
