import { useGetBuyerProfile } from '@/hooks/buyer.hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ShieldAlert, Mail } from 'lucide-react'
import React from 'react'

const BuyerBlockedPage = () => {
  const { data, isLoading } = useGetBuyerProfile()

  const buyer = data?.data

  const blockedDate = buyer?.blockedAt
    ? new Date(buyer.blockedAt).toLocaleString()
    : null

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-muted/40 p-6'>
        <Card className='w-full max-w-xl shadow-lg'>
          <CardHeader className='flex flex-col items-center gap-3'>
            <Skeleton className='h-14 w-14 rounded-full' />
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-5 w-28' />
          </CardHeader>

          <CardContent className='space-y-6'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6 mx-auto' />

            <div className='rounded-lg border bg-muted/50 p-4 space-y-2'>
              <Skeleton className='h-3 w-32' />
              <Skeleton className='h-4 w-full' />
            </div>

            <Skeleton className='h-4 w-40' />

            <div className='rounded-lg border bg-muted/50 p-4 space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted/40 p-6'>
      <Card className='w-full max-w-xl shadow-lg border-destructive/30'>
        <CardHeader className='flex flex-col items-center gap-3 text-center'>
          <ShieldAlert className='h-14 w-14 text-destructive' />
          <CardTitle className='text-2xl font-semibold'>
            Buyer Account Blocked
          </CardTitle>
          <Badge variant='destructive'>Access Restricted</Badge>
        </CardHeader>

        <CardContent className='space-y-6 text-center'>
          <p className='text-muted-foreground'>
            Hello <span className='font-medium'>{buyer?.fullname}</span>, your
            buyer account has been restricted by the platform administrator.
            Marketplace features are currently unavailable for your account.
          </p>

          {buyer?.blockReason && (
            <div className='rounded-lg border bg-muted/50 p-4 text-left'>
              <p className='text-sm font-medium text-muted-foreground'>
                Reason for Block
              </p>
              <p className='mt-1 text-sm'>{buyer.blockReason}</p>
            </div>
          )}

          {blockedDate && (
            <div className='text-sm text-muted-foreground'>
              Blocked on:{' '}
              <span className='font-medium text-foreground'>{blockedDate}</span>
            </div>
          )}

          <div className='rounded-lg border bg-muted/50 p-4 flex flex-col items-center gap-2'>
            <Mail className='h-5 w-5 text-muted-foreground' />
            <p className='text-sm text-muted-foreground text-center'>
              If you believe this action was taken by mistake or want to appeal
              the decision, please contact support.
            </p>
            <a
              href='mailto:sasyamarg@gmail.com'
              className='text-sm font-medium text-primary hover:underline'
            >
              sasyamarg@gmail.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BuyerBlockedPage
