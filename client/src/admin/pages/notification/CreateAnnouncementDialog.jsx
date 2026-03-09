import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { CalendarDays, Megaphone } from 'lucide-react'
import { useSendNotification } from '@/hooks/notification.hooks'

export default function CreateAnnouncementDialog ({ open, onOpenChange }) {
  const createAnnouncement = useSendNotification()
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      role: '',
      type: 'ADMIN_MESSAGE',
      title: '',
      message: '',
      redirectUrl: '',
      expiresAt: ''
    }
  })

  const role = watch('role')

  const onSubmit = data => {
    createAnnouncement.mutate(data, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-130'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Megaphone size={18} />
            Send Announcement
          </DialogTitle>
          <DialogDescription>
            Broadcast a message to farmers or buyers through dashboard
            notifications.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-2'>
          <Select value={role} onValueChange={value => setValue('role', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select Target Audience' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='farmer'>Farmers</SelectItem>
              <SelectItem value='buyer'>Buyers</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder='Announcement Title'
            {...register('title', { required: true })}
          />

          <Textarea
            placeholder='Write the announcement message...'
            className='min-h-30'
            {...register('message', { required: true })}
          />

          <Input
            placeholder='Redirect URL (optional)'
            {...register('redirectUrl')}
          />

          <div className='space-y-1'>
            <label className='text-sm text-muted-foreground flex items-center gap-1'>
              <CalendarDays size={14} />
              Expiry Date
            </label>
            <Input type='date' {...register('expiresAt')} />
          </div>

          <DialogFooter className='pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type='submit'>Send Announcement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
