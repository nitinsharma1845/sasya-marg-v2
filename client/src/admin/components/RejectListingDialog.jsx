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
import { XCircle } from 'lucide-react'
import { useModerateHarvestedListing } from '../hooks/moderation.hooks'

export function RejectListingDialog({ product }) {
  const [open, setOpen] = useState(false)
  const moderateProduct = useModerateHarvestedListing()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ mode: 'all' })

  const handleModeration = data => {
    const payload = {
      listingId: product._id,
      action: 'rejected',
      reason: data.reason
    }

    moderateProduct.mutate(payload, {
      onSuccess: () => {
        reset()
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type='button' variant='destructive'>
          <XCircle className='mr-2 h-4 w-4' /> Reject Listing
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-150'>
        <DialogHeader>
          <DialogTitle>Confirm Rejection</DialogTitle>
          <DialogDescription>
            Provide a reason for rejecting this listing. This will be visible to
            the farmer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleModeration)}>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='reason'>Rejection Reason</Label>
              <Textarea
                id='reason'
                placeholder='Enter rejection reason...'
                {...register('reason', {
                  required: 'Rejection reason is required'
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
              disabled={isSubmitting}
            >
              Reject
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
