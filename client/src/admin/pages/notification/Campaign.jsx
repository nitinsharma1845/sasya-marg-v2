import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Mail, Send, Users, CheckCircle2, Clock, Plus } from 'lucide-react'
import { useGetCampaign } from '@/admin/hooks/emailCampaign.hooks'
import { format } from 'date-fns'
import PaginationComp from '@/admin/components/Pagination'
import CreateCampaignDialog from './createCampaignDialog'

const Campaign = () => {
  const [open, setOpen] = useState(false)
  const { data: response, isLoading } = useGetCampaign()
  const campaigns = response?.data?.campaign || []
  const pagination = response?.data?.pagination || {}

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-5 gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Email Campaigns</h2>
          <p className='text-muted-foreground text-sm'>
            Track and send bulk marketing emails.
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className='gap-2 shadow-md px-6 font-semibold bg-primary w-full sm:w-auto'
        >
          <Plus size={18} /> Start a Campaign
        </Button>

        <CreateCampaignDialog open={open} onOpenChange={setOpen} />
      </div>

      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-muted-foreground'>
            Campaign History
          </span>
          <Badge variant='secondary' className='rounded-full'>
            {isLoading ? '...' : campaigns.length}
          </Badge>
        </div>

        <div className='grid gap-4'>
          {isLoading ? (
            [1, 2, 3].map(i => (
              <div
                key={i}
                className='p-6 rounded-xl bg-secondary animate-pulse space-y-4'
              >
                <Skeleton className='h-6 w-1/4 bg-muted-foreground/20' />
                <Skeleton className='h-4 w-full bg-muted-foreground/20' />
              </div>
            ))
          ) : campaigns.length > 0 ? (
            campaigns.map(camp => (
              <Card
                key={camp._id}
                className='group hover:shadow-md transition-all duration-300'
              >
                <CardContent className='p-6'>
                  <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
                    <div className='space-y-3 flex-1'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`p-2 rounded-lg ${
                            camp.status === 'completed'
                              ? 'bg-green-500/10'
                              : 'bg-blue-500/10'
                          }`}
                        >
                          {camp.status === 'completed' ? (
                            <CheckCircle2 size={18} className='text-primary' />
                          ) : (
                            <Clock
                              size={18}
                              className='text-chart-2 animate-spin-slow'
                            />
                          )}
                        </div>

                        <div>
                          <h3 className='font-bold text-lg leading-tight'>
                            {camp.title}
                          </h3>
                          <p className='text-sm text-muted-foreground font-medium'>
                            {camp.subject}
                          </p>
                        </div>
                      </div>

                      <div className='flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground'>
                        <span className='flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded'>
                          <Users size={14} />
                          {camp.totalRecipients || 0} Recipients
                        </span>

                        <span className='flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded'>
                          <CheckCircle2 size={14} className='text-primary' />
                          {camp.sentCount || 0} Sent
                        </span>

                        <span className='flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded'>
                          <Mail size={14} className='text-destructive' />
                          {camp.failedCount || 0} Failed
                        </span>

                        {camp.status === 'sending' && (
                          <span className='flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded font-medium'>
                            <Send size={14} />
                            {camp.progress || 0}% Progress
                          </span>
                        )}

                        <span className='flex items-center gap-1'>
                          {format(new Date(camp.createdAt), 'MMM dd, h:mm a')}
                        </span>

                        <span className='flex items-center gap-1'>
                          Target:
                          <span className='text-foreground font-bold uppercase ml-1'>
                            {'Newsletter Subscriber'}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Badge
                        variant={
                          camp.status === 'completed'
                            ? 'default'
                            : camp.status === 'completed'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {camp.status === 'completed'
                          ? 'Delivered'
                          : `Sending ${camp.progress || 0}%`}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className='text-center py-20 border-2 border-dotted rounded-2xl flex flex-col items-center'>
              <Mail className='text-muted-foreground/30 mb-4' size={48} />
              <p className='text-muted-foreground font-medium'>
                No campaigns found.
              </p>
            </div>
          )}
        </div>

        {pagination && <PaginationComp pagination={pagination} />}
      </div>
    </div>
  )
}

export default Campaign
