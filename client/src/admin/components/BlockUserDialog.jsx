import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useBlockFarmer } from '../hooks/admin.hooks'
import { queryClient } from '@/lib/queryClient'

export function BlockUserDialog ({ user }) {
  const [open, setOpen] = useState(false)
  const blockFarmer = useBlockFarmer()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ mode: 'all' })

  const handleBlockUser = data => {
    if (user.role === 'farmer') {
      blockFarmer.mutate(
        {
          reason: data.reason,
          farmerId: user._id
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['farmer', user._id])
            setOpen(false)
          }
        }
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type='button' variant='destructive'>
          Block User
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-150'>
        <DialogHeader>
          <DialogTitle>Confirm Block</DialogTitle>
          <DialogDescription>
            Provide a reason for blocking this user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleBlockUser)}>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='reason'>Reason</Label>
              <Textarea
                id='reason'
                placeholder='Enter reason...'
                {...register('reason', {
                  required: 'Blocked reason is required'
                })}
              />
              {errors.reason && (
                <p className='text-xs text-destructive'>
                  {errors.reason.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type='submit'
              variant='destructive'
              disabled={isSubmitting || blockFarmer.isPending}
            >
              {blockFarmer.isPending ? 'Blocking...' : 'Block'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
