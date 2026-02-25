import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { Reply } from 'lucide-react'
import { useReplyQuery } from '@/admin/hooks/reports.hooks'

const ReplyDialog = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      adminReply: ''
    }
  })
  const [open, setOpen] = useState(false)
  const reply = useReplyQuery()

  const onSubmit = data => {
    const payload = {
      reply: data.adminReply,
      id: id
    }
    reply.mutate(payload, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='cursor-pointer'>
          <Reply className='w-4 h-4' />
          Responde
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-125 bg-card border-border'>
        <DialogHeader>
          <DialogTitle className='text-primary text-xl font-bold'>
            Respond to Query
          </DialogTitle>
          <DialogDescription className='text-muted-foreground text-sm'>
            Provide the resolution details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='adminReply' className='text-foreground font-medium'>
              Your Response
            </Label>
            <Textarea
              id='adminReply'
              placeholder='Write your message here...'
              className='min-h-38 bg-background focus-visible:ring-primary'
              {...register('adminReply', { required: 'Message is required' })}
            />
            {errors.adminReply && (
              <p className='text-destructive text-xs font-medium'>
                {errors.adminReply.message}
              </p>
            )}
          </div>

          <DialogFooter className='pt-2'>
            <Button
              size='sm'
              variant='default'
              className='cursor-pointer w-full'
            >
              <Reply className='w-4 h-4' />
              Submit Reply
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReplyDialog
