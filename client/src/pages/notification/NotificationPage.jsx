import React, { useState, Suspense, lazy } from 'react'
import {
  useGetNotification,
  useReadAllNotifications
} from '@/hooks/notification.hooks'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle2, BellRing, Loader2, Filter } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

const NotificationCard = lazy(() => import('./NotificationCard'))

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('unread')
  const { user } = useAuthStore()
  const markAllAsRead = useReadAllNotifications()

  const {
    data: apiResponse,
    isLoading,
    isError,
    refetch
  } = useGetNotification(user?._id, activeTab === 'read')

  const notifications = apiResponse?.data || apiResponse || []

  if (isError)
    return (
      <div className='flex flex-col items-center justify-center h-[60vh] text-destructive'>
        <p className='font-bold text-lg'>Failed to load notifications.</p>
        <Button variant='link' onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    )

  return (
    <div className='min-h-screen bg-background p-4 md:p-8'>
      <div className='max-w-4xl mx-auto'>
        <header className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-secondary rounded-2xl shadow-sm'>
              <BellRing className='text-primary w-7 h-7' />
            </div>
            <div>
              <h1 className='text-3xl font-extrabold text-foreground tracking-tight'>
                Notifications
              </h1>
              <p className='text-muted-foreground text-sm font-medium'>
                Stay updated with your latest activities
              </p>
            </div>
          </div>

          <div className='flex gap-3 w-full sm:w-auto'>
            <Button
              onClick={() => markAllAsRead.mutate(user?._id)}
              disabled={markAllAsRead.isPending || !notifications.length}
              variant='outline'
              size='sm'
              className='flex-1 sm:flex-none h-10 gap-2 text-primary border-border bg-card hover:bg-secondary'
            >
              {markAllAsRead.isPending ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <CheckCircle2 className='w-4 h-4' />
              )}
              Mark all read
            </Button>
          </div>
        </header>

        <Tabs
          defaultValue='unread'
          className='w-full'
          onValueChange={setActiveTab}
        >
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4'>
            <TabsList className='bg-secondary/50 p-1 border border-border inline-flex h-11'>
              <TabsTrigger value='unread' className='px-8 rounded-md'>
                Unread
              </TabsTrigger>
              <TabsTrigger value='read' className='px-8 rounded-md'>
                Read History
              </TabsTrigger>
            </TabsList>

            <div className='flex items-center gap-2 text-muted-foreground text-sm px-3 py-2 bg-muted/30 rounded-lg border border-border/50'>
              <Filter className='w-4 h-4' />
              <span className='font-semibold'>{notifications.length}</span>
              Results
            </div>
          </div>

          <TabsContent
            value={activeTab}
            className='mt-0 space-y-4 focus-visible:outline-none'
          >
            {isLoading ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className='flex gap-4 p-4 bg-card border border-border rounded-xl'
                  >
                    <Skeleton className='h-12 w-12 rounded-full bg-secondary' />
                    <div className='space-y-2 flex-1'>
                      <Skeleton className='h-4 w-1/4 bg-secondary' />
                      <Skeleton className='h-4 w-full bg-secondary' />
                    </div>
                  </div>
                ))
            ) : notifications.length > 0 ? (
              <Suspense
                fallback={
                  <div className='flex justify-center p-8'>
                    <Loader2 className='animate-spin text-primary' />
                  </div>
                }
              >
                {notifications.map(n => (
                  <NotificationCard key={n._id} notification={n} />
                ))}
              </Suspense>
            ) : (
              <div className='text-center py-24 bg-secondary/20 rounded-3xl border-2 border-dashed border-border'>
                <div className='bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-border'>
                  <BellRing className='w-8 h-8 text-muted-foreground/40' />
                </div>
                <h3 className='text-foreground font-bold text-lg'>
                  No {activeTab} notifications
                </h3>
                <p className='text-muted-foreground text-sm max-w-xs mx-auto'>
                  We'll notify you when something important happens.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default NotificationPage
