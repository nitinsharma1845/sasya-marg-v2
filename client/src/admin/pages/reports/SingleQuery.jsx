import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleQuery } from '@/admin/hooks/reports.hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReplyDialog from './replyDialog'

const QuerySkeleton = () => (
  <div className='p-6 max-w-5xl mx-auto space-y-6'>
    <div className='flex justify-between items-center'>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-64 bg-muted' />
        <Skeleton className='h-4 w-40 bg-muted' />
      </div>
      <div className='flex gap-2'>
        <Skeleton className='h-8 w-24 rounded-full bg-muted' />
        <Skeleton className='h-8 w-24 rounded-full bg-muted' />
      </div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <Skeleton className='h-75 w-full bg-muted rounded-lg' />
      <Skeleton className='h-100 md:col-span-2 w-full bg-muted rounded-lg' />
    </div>
  </div>
)

const SingleQuery = () => {
  const { id } = useParams()
  const { data: response, isLoading } = useGetSingleQuery(id)

  if (isLoading) {
    return <QuerySkeleton />
  }

  const query = response?.data
  const farmer = query?.farmer

  const getStatusColor = status => {
    const colors = {
      open: 'bg-destructive text-destructive-foreground',
      in_progress: 'bg-accent text-accent-foreground',
      resolved: 'bg-primary text-primary-foreground',
      closed: 'bg-secondary text-secondary-foreground'
    }
    return colors[status?.toLowerCase()] || 'bg-muted text-muted-foreground'
  }

  const getPriorityColor = priority => {
    const colors = {
      urgent: 'border-destructive text-destructive',
      high: 'border-orange-500 text-orange-500',
      medium: 'border-primary text-primary',
      low: 'border-border text-muted-foreground'
    }
    return colors[priority?.toLowerCase()] || 'border-border'
  }

  return (
    <div className='p-6 max-w-5xl mx-auto space-y-8 bg-background min-h-screen'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-foreground tracking-tight'>
            Support Query
          </h1>
          <p className='text-sm text-muted-foreground mt-1 font-mono'>
            REF: {query?._id || 'REF-NOT-FOUND'}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Badge
            className={`px-4 py-1 uppercase text-xs font-bold shadow-sm ${getStatusColor(
              query?.status
            )}`}
          >
            {query?.status || 'Unknown'}
          </Badge>
          <Badge
            variant='outline'
            className={`px-4 py-1 uppercase text-xs font-bold border-2 ${getPriorityColor(
              query?.priority
            )}`}
          >
            {query?.priority || 'Standard'} Priority
          </Badge>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='space-y-6'>
          <Card className='border-border shadow-sm overflow-hidden'>
            <CardHeader className='bg-secondary/50 border-b border-border flex flex-row items-center justify-center gap-2 py-4'>
              <CardTitle className='text-base flex items-center gap-2 text-foreground'>
                <User className='w-4 h-4 text-primary' />
                Farmer Details
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6 space-y-5'>
              <div>
                <label className='text-[10px] uppercase font-bold text-muted-foreground tracking-wider'>
                  Full Name
                </label>
                <p className='text-foreground font-semibold'>
                  {farmer?.fullname || 'Unspecified Name'}
                </p>
              </div>
              <Separator className='bg-border/50' />
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-secondary rounded-full'>
                  <Mail className='w-4 h-4 text-primary' />
                </div>
                <div className='overflow-hidden'>
                  <label className='text-[10px] uppercase font-bold text-muted-foreground block'>
                    Email Address
                  </label>
                  <p className='text-sm text-foreground truncate'>
                    {farmer?.email || 'No email available'}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-secondary rounded-full'>
                  <Phone className='w-4 h-4 text-primary' />
                </div>
                <div>
                  <label className='text-[10px] uppercase font-bold text-muted-foreground block'>
                    Phone Number
                  </label>
                  <p className='text-sm text-foreground'>
                    {farmer?.phone || 'No contact number'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-border shadow-sm bg-primary text-primary-foreground'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-3'>
                <AlertCircle className='w-5 h-5 opacity-80' />
                <div>
                  <p className='text-[10px] uppercase font-bold opacity-70'>
                    Category
                  </p>
                  <p className='text-lg font-bold capitalize'>
                    {query?.inquiry || 'General'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-2 space-y-6'>
          <Card className='border-border shadow-sm'>
            <CardHeader className='pb-4'>
              <div className='flex items-center gap-2 mb-2'>
                <MessageSquare className='w-4 h-4 text-accent' />
                <span className='text-[10px] uppercase font-bold text-muted-foreground tracking-widest'>
                  Initial Inquiry
                </span>
              </div>
              <CardTitle className='text-2xl text-foreground leading-tight'>
                {query?.subject || 'No Subject provided for this query'}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='bg-muted/30 p-5 rounded-xl border border-border/50'>
                <p className='text-foreground leading-relaxed whitespace-pre-wrap'>
                  {query?.message || 'The user did not provide a message body.'}
                </p>
              </div>

              <div className='pt-4'>
                <div className='flex items-center gap-2 mb-4'>
                  <ShieldCheck className='w-5 h-5 text-primary' />
                  <h3 className='font-bold text-lg text-foreground'>
                    Resolution & Response
                  </h3>
                </div>

                {query?.adminReply ? (
                  <div className='relative pl-6 border-l-2 border-accent space-y-3'>
                    <p className='text-foreground bg-secondary/20 p-4 rounded-r-lg italic'>
                      "{query.adminReply}"
                    </p>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground font-medium'>
                      <Clock className='w-3.5 h-3.5' />
                      <span>
                        Replied on{' '}
                        {new Date(query.repliedAt).toLocaleDateString(
                          undefined,
                          { dateStyle: 'long' }
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='bg-background border-2 border-dashed border-border rounded-xl p-8 text-center'>
                    <p className='text-muted-foreground text-sm font-medium mb-5'>
                      No administrative response. This ticket is currently{' '}
                      {query?.status || 'open'}.
                    </p>
                    <ReplyDialog id={id} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SingleQuery
