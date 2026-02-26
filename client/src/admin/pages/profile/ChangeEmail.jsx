import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AtSign, Mail, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useChangEmail } from '@/admin/hooks/admin.hooks'

const EmailField = ({ register, errors }) => {
  return (
    <div className='space-y-2'>
      <Label
        htmlFor='newEmail'
        className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'
      >
        New Email Address
      </Label>
      <div className='relative'>
        <Input
          {...register('newEmail', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          id='newEmail'
          type='email'
          placeholder='admin@sasyamarg.com'
          className='bg-muted/30 border-border focus:ring-primary h-11 pl-10'
        />
        <AtSign className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
      </div>
      {errors.newEmail && (
        <p className='text-[10px] font-bold mt-1 text-destructive uppercase tracking-tight'>
          {errors.newEmail.message}
        </p>
      )}
    </div>
  )
}

const ChangeEmail = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm({ mode: 'onChange' })
  const changeEmail = useChangEmail()
  const [open, setOpen] = useState(false)

  const handleUpdateEmail = data => {
    const payload = {
      newEmail: data?.newEmail
    }

    changeEmail.mutate(payload, {
      onSuccess: () => {
        reset()
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex flex-col items-center justify-center p-4 rounded-lg bg-secondary hover:bg-border transition-all group border border-transparent hover:border-primary/20'>
          <AtSign className='w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform' />
          <span className='text-[10px] font-bold uppercase tracking-tight text-center'>
            Modify Email
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-100 bg-card border-border'>
        <DialogHeader>
          <div className='flex items-center gap-2 mb-2'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Mail className='w-5 h-5 text-primary' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              Update Email
            </DialogTitle>
          </div>
          <DialogDescription className='text-muted-foreground text-xs font-medium'>
            Enter your new administrative email address below.
          </DialogDescription>
        </DialogHeader>

        <form
          className='grid gap-6 py-4'
          onSubmit={handleSubmit(handleUpdateEmail)}
        >
          <EmailField register={register} errors={errors} />

          <div className='p-3 rounded-lg bg-destructive/5 border border-destructive/10 flex gap-3'>
            <ShieldAlert className='w-5 h-5 text-destructive shrink-0' />
            <p className='text-[10px] leading-tight text-destructive/80 font-medium'>
              <span className='font-bold uppercase block mb-0.5 text-destructive'>
                Warning
              </span>
              Changing your email will affect your login credentials and
              administrative notifications.
            </p>
          </div>

          <DialogFooter>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase tracking-widest text-xs h-11 shadow-md'
            >
              <CheckCircle2 className='w-4 h-4 mr-2' />
              {isSubmitting ? 'Processing...' : 'Verify & Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeEmail
