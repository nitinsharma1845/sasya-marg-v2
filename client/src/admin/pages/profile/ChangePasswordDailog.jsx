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
import { Separator } from '@/components/ui/separator'
import { Lock, ShieldCheck, KeyRound, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useChangePassword } from '@/admin/hooks/admin.hooks'

// Move this OUTSIDE the main component to prevent focus loss
const PasswordField = ({
  id,
  label,
  placeholder,
  name,
  register,
  errors,
  validation
}) => {
  const [show, setShow] = useState(false)

  return (
    <div className='space-y-2'>
      <Label
        htmlFor={id}
        className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'
      >
        {label}
      </Label>
      <div className='relative'>
        <Input
          {...register(name, validation)}
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className='bg-muted/30 border-border focus:ring-primary h-11 pr-10'
        />
        <button
          type='button'
          onClick={() => setShow(!show)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors'
        >
          {show ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
        </button>
      </div>
      {errors[name] && (
        <p className='text-[10px] font-bold mt-1 text-destructive uppercase tracking-tight'>
          {errors[name].message}
        </p>
      )}
    </div>
  )
}

const ChangePasswordDialog = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    reset
  } = useForm({ mode: 'onChange' })
  const change = useChangePassword()
  const [open, setOpen] = useState(false)

  const changePassword = data => {
    const payload = {
      newPassword: data.newPassword,
      oldPassword: data?.oldPassword
    }
    change.mutate(payload, {
      onSuccess: () => {
        setOpen(false)
        reset()
      }
    })
  }

  const newPassword = watch('newPassword')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex flex-col items-center justify-center p-4 rounded-(--radius) bg-secondary hover:bg-border transition-all group border border-transparent hover:border-primary/20'>
          <Lock className='w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform' />
          <span className='text-[10px] font-bold uppercase tracking-tight'>
            Password
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-110 bg-card border-border'>
        <DialogHeader>
          <div className='flex items-center gap-2 mb-2'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <KeyRound className='w-5 h-5 text-primary' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              Update Credentials
            </DialogTitle>
          </div>
          <DialogDescription className='text-muted-foreground text-xs'>
            Authorize changes by entering your current password followed by your
            new credentials.
          </DialogDescription>
        </DialogHeader>

        <form
          className='grid gap-5 py-4'
          onSubmit={handleSubmit(changePassword)}
        >
          <PasswordField
            id='current'
            label='Current Password'
            placeholder='••••••••'
            name='oldPassword'
            register={register}
            errors={errors}
            validation={{ required: 'Current password is required' }}
          />

          <Separator className='opacity-50' />

          <PasswordField
            id='new'
            label='New Password'
            placeholder='••••••••'
            name='newPassword'
            register={register}
            errors={errors}
            validation={{
              required: 'New password is required',
              minLength: { value: 8, message: 'Minimum 8 characters required' }
            }}
          />

          <PasswordField
            id='confirm'
            label='Confirm New Password'
            placeholder='••••••••'
            name='confirmNewPassword'
            register={register}
            errors={errors}
            validation={{
              required: 'Please confirm your password',
              validate: value =>
                value === newPassword || 'Passwords do not match'
            }}
          />

          <DialogFooter className='mt-2'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase tracking-widest text-xs h-11'
            >
              <ShieldCheck className='w-4 h-4 mr-2' />
              {isSubmitting || change.isPending
                ? 'Updating...'
                : 'Validate & Change'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordDialog
