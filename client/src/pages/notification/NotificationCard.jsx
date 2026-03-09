import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Check,
  Trash2,
  Bell,
  Info,
  AlertTriangle,
  ExternalLink
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import {
  useDeleteNotification,
  useReadNotification
} from '@/hooks/notification.hooks'
import { useAuthStore } from '@/store/useAuthStore'

const NotificationCard = ({ notification }) => {
  const { user } = useAuthStore()
  const markAsRead = useReadNotification()
  const deleteMutation = useDeleteNotification()

  if (!notification) return null

  const getIcon = type => {
    switch (type) {
      case 'LISTING_APPROVED':
        return <Check className='text-primary w-5 h-5' />
      case 'LISTING_REJECTED':
        return <AlertTriangle className='text-destructive w-5 h-5' />
      case 'ADMIN_MESSAGE':
        return <Bell className='text-accent w-5 h-5' />
      default:
        return <Info className='text-muted-foreground w-5 h-5' />
    }
  }

  return (
    <Card
      className={`p-4 mb-3 transition-all hover:shadow-md border-l-4 ${
        notification.isRead
          ? 'border-l-border bg-card'
          : 'border-l-primary bg-secondary/30'
      }`}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex gap-3'>
          <div className='mt-1 p-2 rounded-full bg-background border border-border shrink-0 flex items-center justify-center w-10 h-10'>
            {getIcon(notification.type)}
          </div>
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <h4
                className={`font-semibold text-sm ${
                  notification.isRead
                    ? 'text-muted-foreground'
                    : 'text-foreground'
                }`}
              >
                {notification.title || 'No Title'}
              </h4>
              {!notification.isRead && (
                <Badge className='bg-primary text-[10px] h-4'>New</Badge>
              )}
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed mb-2'>
              {notification.message}
            </p>
            <div className='flex items-center gap-3 text-[12px] text-muted-foreground/70 font-medium'>
              <span>
                {notification.createdAt
                  ? formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true
                    })
                  : ''}
              </span>
              {notification.role && (
                <span className='capitalize'>• {notification.role}</span>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-row gap-1 shrink-0'>
          {notification?.redirectUrl && (
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-primary'
              onClick={() => window.open(notification.redirectUrl, '_blank')}
            >
              <ExternalLink className='w-4 h-4' />
            </Button>
          )}
          {!notification.isRead && (
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-primary hover:bg-primary/10'
              disabled={markAsRead.isPending}
              onClick={() =>
                markAsRead.mutate({
                  userId: user._id,
                  notificationId: notification._id
                })
              }
            >
              <Check className='w-4 h-4' />
            </Button>
          )}
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 text-destructive hover:bg-destructive/10'
            disabled={deleteMutation.isPending}
            onClick={() =>
              deleteMutation.mutate({
                userId: user._id,
                notificationId: notification._id
              })
            }
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default NotificationCard
