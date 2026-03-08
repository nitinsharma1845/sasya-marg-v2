import React from 'react'
import { useGetPublicQueries } from '@/admin/hooks/admin.hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  Clock,
  Reply,
  ShieldCheck
} from 'lucide-react'
import { format } from 'date-fns'
import PaginationComp from '@/admin/components/Pagination'
import QueryToolbar from './QueryToolbar'
import ReplyQueryDialog from './ReplyQueryDialog'

const PublicQueries = () => {
  const { data, isLoading } = useGetPublicQueries()
  const queries = data?.data?.queries || []
  const pagination = data?.data?.pagination

  return (
    <div className='p-6 min-h-screen bg-background text-foreground'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-primary tracking-tight'>
            Public Inquiries
          </h1>
          <p className='text-muted-foreground mt-1'>
            Manage contact form submissions and guest queries
          </p>
        </div>
        {!isLoading && (
          <div className='flex gap-2'>
            <Badge
              variant='outline'
              className='bg-card border-border text-primary px-3 py-1 font-bold'
            >
              Total: {pagination?.total || 0}
            </Badge>
          </div>
        )}
      </div>

      <QueryToolbar />

      <div className='flex flex-col gap-5'>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className='w-full h-32 border-border bg-card flex items-center px-6'
              >
                <Skeleton className='h-12 w-12 rounded-full bg-muted mr-4' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-4 w-1/4 bg-muted' />
                  <Skeleton className='h-4 w-1/2 bg-muted' />
                </div>
                <Skeleton className='h-8 w-24 bg-muted' />
              </Card>
            ))
          : queries.map(query => (
              <Card
                key={query._id}
                className={`w-full border-border bg-card hover:shadow-sm transition-all duration-200 overflow-hidden ${
                  !query.isRead
                    ? 'border-l-4 border-l-primary'
                    : 'border-l-4 border-l-transparent'
                }`}
              >
                <CardContent className='p-0 flex flex-col'>
                  <div className='flex flex-col lg:flex-row'>
                    <div className='p-5 lg:w-1/4 border-b lg:border-b-0 lg:border-r border-border flex items-center gap-4'>
                      <div className='h-12 w-12 rounded-full bg-secondary flex items-center justify-center shrink-0'>
                        <User className='h-6 w-6 text-primary' />
                      </div>
                      <div className='min-w-0'>
                        <h3 className='font-bold text-card-foreground truncate'>
                          {query.firstname} {query.lastname}
                        </h3>
                        <Badge
                          variant='secondary'
                          className='text-[10px] uppercase bg-muted text-muted-foreground mt-1 tracking-tighter'
                        >
                          {query.role}
                        </Badge>
                      </div>
                    </div>

                    <div className='p-5 flex-1 min-w-0'>
                      <div className='flex items-start gap-3 mb-2'>
                        <MessageSquare className='h-4 w-4 text-primary shrink-0 mt-1' />
                        <p className='text-sm text-foreground/90 italic line-clamp-3'>
                          "{query.message}"
                        </p>
                      </div>
                      <div className='flex flex-wrap gap-4 mt-4'>
                        <div className='flex items-center gap-1.5 text-xs text-muted-foreground font-medium'>
                          <Mail className='h-3.5 w-3.5' />
                          {query.email}
                        </div>
                        <div className='flex items-center gap-1.5 text-xs text-muted-foreground font-medium'>
                          <Phone className='h-3.5 w-3.5' />
                          {query.phone}
                        </div>
                      </div>
                    </div>

                    <div className='p-5 lg:w-1/4 bg-muted/10 flex flex-row lg:flex-col justify-between items-center lg:items-end gap-3'>
                      <div className='flex flex-col lg:items-end'>
                        <div className='flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest'>
                          <Calendar className='h-3 w-3' />
                          {format(new Date(query.createdAt), 'dd MMM yyyy')}
                        </div>
                        <div className='flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground mt-1 uppercase'>
                          <Clock className='h-3 w-3' />
                          {format(new Date(query.createdAt), 'p')}
                        </div>
                      </div>

                      <div className='flex items-center gap-2'>
                        <Badge
                          className={`px-3 py-0.5 font-bold uppercase text-[10px] ${
                            query.status === 'pending'
                              ? 'bg-accent/15 text-accent border-accent/20'
                              : 'bg-primary/15 text-primary border-primary/20'
                          }`}
                        >
                          {query.status}
                        </Badge>
                        {query.status === 'pending' && (
                          <ReplyQueryDialog
                            userEmail={query.email}
                            queryId={query._id}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {query.adminReply && (
                    <div className='px-5 py-4 bg-secondary/30 border-t border-border'>
                      <div className='flex items-start gap-3'>
                        <div className='mt-1 bg-primary/10 p-1.5 rounded-full'>
                          <Reply className='h-3.5 w-3.5 text-primary' />
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center justify-between mb-1'>
                            <span className='text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1'>
                              <ShieldCheck className='h-3 w-3' /> Admin Response
                            </span>
                            <span className='text-[10px] text-muted-foreground'>
                              Replied on:{' '}
                              {format(
                                new Date(query.updatedAt),
                                'dd MMM yyyy, p'
                              )}
                            </span>
                          </div>
                          <p className='text-sm text-foreground/80 leading-relaxed bg-background/50 p-3 rounded-md border border-border/50'>
                            {query.adminReply}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
      </div>

      {!isLoading && queries.length === 0 && (
        <div className='mt-12 text-center py-20 border-2 border-dashed border-border rounded-lg'>
          <p className='text-muted-foreground font-medium'>
            No public queries available at the moment.
          </p>
        </div>
      )}

      {pagination && <PaginationComp pagination={pagination} />}
    </div>
  )
}

export default PublicQueries
