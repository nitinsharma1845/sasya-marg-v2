import React, { useState, useEffect } from 'react'
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
import { AtSign, Mail, ShieldAlert, Loader2, RotateCcw } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useChangEmail } from '@/admin/hooks/admin.hooks'
import { useSendOtp } from '@/hooks/auth.hooks'

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

const OtpField = ({ register, errors, enabled }) => {
  return (
    <div className='space-y-2'>
      <Label
        htmlFor='otp'
        className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'
      >
        OTP Code
      </Label>
      <Input
        {...register('otp', {
          required: enabled ? 'OTP is required' : false,
          minLength: { value: 6, message: 'OTP must be 6 digits' },
          maxLength: { value: 6, message: 'OTP must be 6 digits' }
        })}
        id='otp'
        type='text'
        placeholder='Enter 6 digit OTP'
        disabled={!enabled}
        className='bg-muted/30 border-border focus:ring-primary h-11'
      />
      {errors.otp && (
        <p className='text-[10px] font-bold mt-1 text-destructive uppercase tracking-tight'>
          {errors.otp.message}
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
    reset,
    watch
  } = useForm({ mode: 'onChange' })

  const changeEmail = useChangEmail()
  const sendOtp = useSendOtp()

  const [open, setOpen] = useState(false)
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [timer, setTimer] = useState(0)

  const email = watch('newEmail')

  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timer])

  const handleSendOtp = () => {
    if (!email || timer > 0) return

    sendOtp.mutate(
      { email, purpose: 'email_verification' },
      {
        onSuccess: () => {
          setOtpEnabled(true)
          setTimer(120)
        }
      }
    )
  }

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleUpdateEmail = data => {
    const payload = {
      newEmail: data?.newEmail,
      otp: data?.otp
    }

    changeEmail.mutate(payload, {
      onSuccess: () => {
        reset()
        setOtpEnabled(false)
        setOpen(false)
        setTimer(0)
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

          <Button
            type='button'
            onClick={handleSendOtp}
            disabled={sendOtp.isPending || timer > 0}
            className='w-full bg-secondary border border-border text-xs font-bold uppercase tracking-widest h-11'
          >
            {sendOtp.isPending ? (
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
            ) : timer > 0 ? (
              <span className='flex items-center gap-2'>
                Wait {formatTime(timer)}
              </span>
            ) : otpEnabled ? (
              <span className='flex items-center gap-2'>
                <RotateCcw className='w-3 h-3' /> Resend OTP
              </span>
            ) : (
              'Send OTP'
            )}
          </Button>

          <OtpField register={register} errors={errors} enabled={otpEnabled} />

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
              disabled={isSubmitting || !otpEnabled}
              className='w-full bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase tracking-widest text-xs h-11 shadow-md'
            >
              {(isSubmitting || changeEmail.isPending) && (
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              )}
              {isSubmitting || changeEmail.isPending
                ? 'Processing...'
                : 'Verify & Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeEmail
