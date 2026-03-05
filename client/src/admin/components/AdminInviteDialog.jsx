import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { useInviteAdmin } from '../hooks/auth.hooks'
import { useState, useRef } from 'react'
import { toast } from 'sonner'

export default function AdminInviteDialog ({ open, setOpen }) {
  const { mutate, isPending } = useInviteAdmin()
  const [token, setToken] = useState('')
  const inputRef = useRef()

  const handleCopy = () => {
    if (!inputRef.current) return toast.error('Error on copy!')
    inputRef.current.select()
    navigator.clipboard.writeText(inputRef.current.value)
    toast.success('Link copied!')
  }

  const handleInvite = () => {
    mutate(
      {},
      {
        onSuccess: res => {
          if (res?.data.token) {
            setToken(res.data.token)
          }
        }
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-lg'>
        {isPending ? (
          <InviteAdminSkeleton />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Generate Invitation Link</DialogTitle>
              <DialogDescription>
                Use the system-generated link below to invite a new
                <span className='font-bold'> Administrator </span>. Please share
                this link only with the intended recipient to maintain platform
                security.
              </DialogDescription>
            </DialogHeader>

            {token && (
              <div className='flex items-center gap-2'>
                <Input
                  ref={inputRef}
                  id='inviteLink'
                  name='invite_link'
                  readOnly
                  value={`https://sasya-marg-v2.vercel.app/admin/signup?token=${token}`}
                />

                <Button onClick={handleCopy}>Copy</Button>
              </div>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button onClick={handleInvite}>
                {token ? 'Generate Again' : 'Genearate Link'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function InviteAdminSkeleton () {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Skeleton className='h-6 w-32 bg-muted' />

        <div className='space-y-1'>
          <Skeleton className='h-4 w-full bg-muted/60' />
          <Skeleton className='h-4 w-3/4 bg-muted/60' />
        </div>
      </div>

      <Skeleton className='h-10 w-full rounded-md bg-muted/40' />

      <div className='flex justify-end gap-2 pt-2'>
        <Skeleton className='h-9 w-20 rounded-md bg-muted/60' />
        <Skeleton className='h-9 w-16 rounded-md bg-primary/30' />
      </div>
    </div>
  )
}
