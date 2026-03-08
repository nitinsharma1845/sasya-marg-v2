import React from 'react'
import { useGetNewsletterSubscribers } from '@/admin/hooks/admin.hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Mail,
  Calendar,
  Info,
  UserCheck,
  UserMinus,
  ArrowRight
} from 'lucide-react'
import { format } from 'date-fns'
import PaginationComp from '@/admin/components/Pagination'
import Toolbar from './Toolbar'

const Subscribers = () => {
  const { data, isLoading } = useGetNewsletterSubscribers()
  const subscribers = data?.data?.subscribers || []
  const pagination = data?.data?.pagination || {}

  return (
    <div className='p-8 min-h-screen bg-background text-foreground'>
      <div className='flex justify-between items-end mb-10'>
        <div>
          <h1 className='text-4xl font-extrabold text-primary tracking-tight'>
            Subscribers
          </h1>
          <p className='text-muted-foreground mt-1'>
            Viewing all Newsletter members for Sasya Marg
          </p>
        </div>
        {!isLoading && (
          <Badge
            variant='outline'
            className='px-4 py-1 border-border text-primary font-bold'
          >
            Total: {data?.data?.pagination?.total || 0}
          </Badge>
        )}
      </div>
      <Toolbar />

      <div className='flex flex-col gap-4 mt-5'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className='w-full h-20 border-border bg-card flex items-center px-6'
              >
                <Skeleton className='h-10 w-10 rounded-full bg-muted mr-4' />
                <Skeleton className='h-5 w-1/4 bg-muted mr-auto' />
                <Skeleton className='h-5 w-1/6 bg-muted mr-4' />
                <Skeleton className='h-8 w-24 bg-muted' />
              </Card>
            ))
          : subscribers.map(sub => (
              <Card
                key={sub._id}
                className='w-full group hover:border-primary/50 transition-all duration-200 border-border bg-card overflow-hidden'
              >
                <CardContent className='p-0 flex flex-col md:flex-row items-center justify-between'>
                  <div className='flex items-center p-4 md:p-6 flex-1 min-w-0 w-full'>
                    <div className='h-12 w-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
                      <Mail className='h-6 w-6' />
                    </div>
                    <div className='ml-4 truncate'>
                      <h3 className='text-lg font-semibold text-card-foreground truncate'>
                        {sub.email}
                      </h3>
                      <div className='flex items-center gap-3 text-xs text-muted-foreground mt-0.5'>
                        <span className='flex items-center gap-1 uppercase tracking-tighter font-bold text-[10px]'>
                          <Info className='h-3 w-3' /> {sub.source || 'Direct'}
                        </span>
                        <span className='h-1 w-1 rounded-full bg-border' />
                        <span className='flex items-center gap-1'>
                          ID: {sub._id.slice(-6)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='hidden lg:flex items-center gap-8 px-6 text-sm'>
                    <div className='flex flex-col'>
                      <span className='text-[10px] uppercase font-bold text-muted-foreground/60'>
                        Subscribed On
                      </span>
                      <span className='font-medium'>
                        {sub.subscribedAt
                          ? format(new Date(sub.subscribedAt), 'dd MMM yyyy')
                          : 'N/A'}
                      </span>
                    </div>

                    {!sub.isActive && sub.unsubscribedAt && (
                      <div className='flex flex-col border-l border-border pl-8'>
                        <span className='text-[10px] uppercase font-bold text-destructive/70'>
                          Unsubscribed
                        </span>
                        <span className='font-medium text-destructive/80'>
                          {format(new Date(sub.unsubscribedAt), 'dd MMM yyyy')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className='flex items-center justify-between md:justify-end gap-4 p-4 md:p-6 bg-muted/30 md:bg-transparent w-full md:w-auto'>
                    <Badge
                      className={`px-3 py-1 rounded-full font-semibold border-none ${
                        sub.isActive
                          ? 'bg-primary/10 text-primary'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {sub.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {!isLoading && subscribers.length === 0 && (
        <div className='mt-10 flex flex-col items-center justify-center py-20 bg-muted/20 rounded-lg border-2 border-dashed border-border'>
          <UserMinus className='h-12 w-12 text-muted-foreground mb-4 opacity-20' />
          <p className='text-muted-foreground font-medium'>
            No Subscriber found!
          </p>
        </div>
      )}
      {pagination && <PaginationComp pagination={pagination} />}
    </div>
  )
}

export default Subscribers
