import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Send, Loader2, ReplyAll } from 'lucide-react'
import { useReplyToPublicQuery } from '@/admin/hooks/admin.hooks'

const ReplyQueryDialog = ({ queryId, userEmail }) => {
  const [isOpen, setIsOpen] = useState(false)
  const sendReply = useReplyToPublicQuery()

  const form = useForm({
    defaultValues: {
      reply: ''
    }
  })

  const onSubmit = values => {
    sendReply.mutate(
      { queryId, ...values },
      {
        onSuccess: () => {
          form.reset()
          setIsOpen(false)
        }
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-2 border-border hover:bg-secondary text-primary cursor-pointer'
        >
          <ReplyAll size={16} />
          Reply
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-125 bg-card border-border'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-primary flex items-center gap-2'>
            <Send className='h-5 w-5' />
            Send Response
          </DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Responding to:{' '}
            <span className='text-foreground font-medium'>{userEmail}</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='reply'
              rules={{
                required: 'Message is required',
                minLength: { value: 10, message: 'Message too short' }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground font-semibold'>
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Write your professional response here...'
                      className='min-h-45 bg-background border-border focus-visible:ring-primary focus-visible:ring-offset-0'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-destructive text-xs' />
                </FormItem>
              )}
            />

            <DialogFooter className='pt-2'>
              <Button
                type='button'
                variant='ghost'
                onClick={() => setIsOpen(false)}
                className='hover:bg-muted text-muted-foreground'
              >
                Discard
              </Button>
              <Button
                type='submit'
                disabled={sendReply.isPending || form.formState.isSubmitting}
                className='bg-primary text-primary-foreground hover:bg-primary/90 min-w-30'
              >
                {sendReply.isPending || form.formState.isSubmitting ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <>
                    <Send className='mr-2 h-4 w-4' />
                    Send Now
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ReplyQueryDialog
