import { useGetInvites, useRevokeInvite } from '../hooks/admin.hooks'
import AppLoader from '@/components/common/AppLoader'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CalendarIcon,
  UserIcon,
  LinkIcon,
  ClockIcon,
  CopyIcon,
  Trash2,
  MailQuestion,
  PlusCircle
} from 'lucide-react'
import PaginationComp from '../components/Pagination'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import AdminInviteDialog from '../components/AdminInviteDialog'
import { useState } from 'react'

const Invites = () => {
  const { data, isLoading, isFetching } = useGetInvites()
  const [open, setOpen] = useState(false)
  const revokeInvite = useRevokeInvite()
  const invites = data?.data?.invites
  const pagination = data?.data?.pagination

  const handleCopy = token => {
    navigator.clipboard.writeText(
      'https://sasya-marg-v2.vercel.app/admin/signup?token=' + token
    )
    toast.success('Invite link copied!')
  }

  const handleRevoke = inviteId => {
    revokeInvite.mutate(inviteId)
  }

  return (
    <div className='p-6 space-y-6 bg-background min-h-screen'>
      <div className='flex justify-between items-center border-b border-border pb-4'>
        <div>
          <h1 className='text-2xl font-bold text-foreground'>
            Invite Management
          </h1>
          <p className='text-sm text-muted-foreground'>
            Monitor and revoke active invitation tokens
          </p>
        </div>
        <Badge
          variant='outline'
          className='px-4 py-1 border-primary text-primary bg-primary/5'
        >
          {pagination?.total || 0} Total Invites
        </Badge>
      </div>

      {isLoading || isFetching ? (
        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
          {[...Array(8)].map((_, i) => (
            <InviteCardSkeleton key={i} />
          ))}
        </div>
      ) : invites.length === 0 ? (
        <div
          className={cn(
            'flex flex-col items-center justify-center py-20 px-6 rounded-4xl border-2 border-dashed border-border bg-secondary/10 text-center animate-in fade-in zoom-in-95 duration-500'
          )}
        >
          <div className='relative mb-6'>
            <div className='h-24 w-24 rounded-full bg-card flex items-center justify-center shadow-sm border border-border'>
              <MailQuestion size={42} className='text-muted-foreground/40' />
            </div>
            <div className='absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg ring-4 ring-background'>
              <PlusCircle size={18} />
            </div>
          </div>
          <div className='max-w-xs space-y-2'>
            <h3 className='text-xl font-bold tracking-tight text-foreground'>
              No Invitation created
            </h3>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              It looks like there aren't any active invitations at the moment.
              You can start by inviting new members to the platform.
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant='secondary'
            size='sm'
            className='my-5 cursor-pointer'
          >
            Create Invite
          </Button>

          <AdminInviteDialog open={open} setOpen={setOpen} />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
          {invites?.map(invite => (
            <Card
              key={invite.token}
              className='flex flex-col h-full border-border bg-card overflow-hidden'
            >
              <CardHeader className='space-y-1 p-4'>
                <div className='flex justify-between items-center mb-2'>
                  <Badge
                    className={
                      invite.used
                        ? 'bg-muted text-muted-foreground hover:bg-muted'
                        : 'bg-accent text-accent-foreground hover:bg-accent/90'
                    }
                  >
                    {invite.used ? 'Used' : 'Active'}
                  </Badge>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-primary bg-secondary px-2 py-0.5 rounded'>
                    {invite.role}
                  </span>
                </div>
                <CardTitle className='text-sm flex items-center gap-2 text-foreground'>
                  <LinkIcon className='w-3.5 h-3.5 shrink-0 text-primary' />
                  <span className='font-mono text-[11px] bg-muted/50 px-2 py-1 rounded w-full break-all line-clamp-2'>
                    {invite.token}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className='grow p-4 pt-0 space-y-3'>
                <div className='grid grid-cols-1 gap-2 text-xs'>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <UserIcon className='w-3.5 h-3.5' />
                    <span className='truncate'>By: {invite.invitedBy}</span>
                  </div>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <CalendarIcon className='w-3.5 h-3.5' />
                    <span>
                      Created: {new Date(invite.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <ClockIcon className='w-3.5 h-3.5' />
                    <span
                      className={
                        new Date(invite.expiresAt) < new Date()
                          ? 'text-destructive'
                          : ''
                      }
                    >
                      Expires: {new Date(invite.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className='p-4 pt-0 mt-auto flex gap-2'>
                <Button
                  variant='outline'
                  className='flex-1 h-9 text-xs gap-2 border-border hover:bg-secondary'
                  onClick={() => handleCopy(invite.token)}
                >
                  <CopyIcon className='w-3.5 h-3.5' />
                  Copy
                </Button>
                {!invite.used && (
                  <Button
                    onClick={() => handleRevoke(invite._id)}
                    variant='destructive'
                    className='flex-1 h-9 text-xs gap-2'
                  >
                    <Trash2 className='w-3.5 h-3.5' />
                    Revoke
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !isFetching && <PaginationComp pagination={pagination} />}
    </div>
  )
}

export default Invites

const InviteCardSkeleton = () => {
  return (
    <Card className='flex flex-col h-full border-border bg-card overflow-hidden'>
      <CardHeader className='space-y-1 p-4'>
        <div className='flex justify-between items-center mb-2'>
          <Skeleton className='h-5 w-16 rounded-full bg-secondary' />
          <Skeleton className='h-4 w-12 rounded bg-secondary' />
        </div>

        <div className='flex items-center gap-2'>
          <Skeleton className='w-3.5 h-3.5 shrink-0 bg-secondary' />
          <Skeleton className='h-7 w-full rounded bg-secondary' />
        </div>
      </CardHeader>

      <CardContent className='grow p-4 pt-0 space-y-3'>
        <div className='grid grid-cols-1 gap-3 text-xs'>
          <div className='flex items-center gap-2'>
            <Skeleton className='w-3.5 h-3.5 rounded-full bg-secondary' />
            <Skeleton className='h-3 w-3/4 bg-secondary' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='w-3.5 h-3.5 rounded-full bg-secondary' />
            <Skeleton className='h-3 w-1/2 bg-secondary' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='w-3.5 h-3.5 rounded-full bg-secondary' />
            <Skeleton className='h-3 w-2/3 bg-secondary' />
          </div>
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0 mt-auto flex gap-2 bg-secondary'>
        <Skeleton className='h-9 flex-1 rounded-md bg-secondary' />
        <Skeleton className='h-9 flex-1 rounded-md bg-secondary' />
      </CardFooter>
    </Card>
  )
}
