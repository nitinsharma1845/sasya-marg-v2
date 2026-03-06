import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  User,
  ShieldCheck,
  Clock,
  MoreVertical,
  Edit2,
  XCircle,
  Info
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCloseQuery } from '@/hooks/query.hooks'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

const statusConfig = {
  open: {
    color: 'bg-[var(--accent)] text-[var(--accent-foreground)]',
    label: 'Open'
  },
  in_progress: { color: 'bg-chart-2 text-blue-900', label: 'In Progress' },
  resolved: { color: 'bg-primary text-primary-foreground', label: 'Resolved' },
  closed: { color: 'bg-muted text-muted-foreground', label: 'Closed' }
}

const QueryCard = ({ query, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const closeMutation = useCloseQuery()
  const config = statusConfig[query.status] || statusConfig.open
  const dateStr = new Date(query.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short'
  })

  const canEdit = query.status === 'open' && !query.adminReply
  const canClose = query.status !== 'closed' && query.status !== 'resolved'

  const confirmClose = () => {
    closeMutation.mutate(
      { queryId: query._id },
      {
        onSuccess: () => toast.success('Ticket closed successfully'),
        onError: err =>
          toast.error(err.response?.data?.message || 'Failed to close ticket')
      }
    )
  }

  return (
    <>
      <Card className='overflow-hidden border-border bg-card shadow-sm transition-all hover:border-primary/30 my-2'>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className='flex cursor-pointer items-center justify-between bg-secondary/20 p-4 transition-colors hover:bg-secondary/40'
        >
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <h4 className='font-bold text-foreground'>{query.subject}</h4>
              {query.priority === 'urgent' && (
                <span className='flex h-2 w-2 rounded-full bg-destructive animate-pulse' />
              )}
            </div>
            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
              <Badge
                variant='outline'
                className='border-border bg-background capitalize'
              >
                {query.inquiry}
              </Badge>

              {(canEdit || canClose) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={e => e.stopPropagation()}
                    >
                      <MoreVertical className='h-4 w-4 text-muted-foreground' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    {canEdit && (
                      <DropdownMenuItem
                        onClick={e => {
                          e.stopPropagation()
                          onEdit(query)
                        }}
                      >
                        <Edit2 className='mr-2 h-4 w-4' /> Edit Details
                      </DropdownMenuItem>
                    )}
                    {canClose && (
                      <DropdownMenuItem
                        onClick={e => {
                          e.stopPropagation()
                          setShowCloseDialog(true)
                        }}
                        className='text-destructive focus:text-destructive'
                      >
                        <XCircle className='mr-2 h-4 w-4' /> Close Ticket
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <span>• {dateStr}</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Badge className={`border-0 ${config.color}`}>{config.label}</Badge>
            {isExpanded ? (
              <ChevronUp className='h-5 w-5 text-muted-foreground' />
            ) : (
              <ChevronDown className='h-5 w-5 text-muted-foreground' />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className='animate-in slide-in-from-top-2 duration-200'>
            <CardContent className='p-4 space-y-4'>
              <div className='flex gap-3'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary'>
                  <User className='h-4 w-4' />
                </div>
                <div className='space-y-1 rounded-lg rounded-tl-none bg-secondary/30 p-3 text-sm text-foreground'>
                  <p>{query.message}</p>
                </div>
              </div>

              {query.adminReply && query.status === 'resolved' ? (
                <div className='flex flex-row-reverse gap-3'>
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <ShieldCheck className='h-4 w-4' />
                  </div>
                  <div className='space-y-2 text-right'>
                    <div className='inline-block rounded-lg rounded-tr-none bg-primary/5 border border-primary/10 p-3 text-left text-sm text-foreground'>
                      <p className='font-medium text-primary text-xs mb-1'>
                        Admin Response
                      </p>
                      <p>{query.adminReply}</p>
                    </div>
                    <p className='text-[10px] text-muted-foreground'>
                      Replied {new Date(query.repliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : query.status === 'open' ? (
                <div className='ml-11 flex items-center gap-2 rounded-md border border-dashed border-accent bg-accent/5 p-3 text-xs text-accent'>
                  <Clock className='h-4 w-4' />
                  <span>
                    Our experts are reviewing your query. Expect a reply within
                    24 hours.
                  </span>
                </div>
              ) : (
                <div className='ml-11 flex items-center gap-2 rounded-md border border-dashed border-destructive bg-destructive/5 p-3 text-xs text-destructive'>
                  <Info className='h-4 w-4' />
                  <span>Query is closed by you, before amin moderation.</span>
                </div>
              )}
            </CardContent>
          </div>
        )}
      </Card>

      <AlertDialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently close your
              support ticket and you will not receive further replies.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmClose}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Yes, Close Query
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default QueryCard
