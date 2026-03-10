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
import {
  AtSign,
  Mail,
  ShieldAlert,
  Loader2,
  Pencil,
  RotateCcw
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useChangeEmail } from '@/hooks/farmer.hooks'
import { useSendOtp } from '@/hooks/auth.hooks'

const ChangeEmail = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch
  } = useForm({ mode: 'onChange' })

  const changeEmail = useChangeEmail()
  const sendOtp = useSendOtp()

  const [open, setOpen] = useState(false)
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [timer, setTimer] = useState(0) // Timer state

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

  const handleUpdateEmail = data => {
    changeEmail.mutate(
      {
        email: data.newEmail,
        otp: data.otp
      },
      {
        onSuccess: () => {
          reset()
          setOtpEnabled(false)
          setOpen(false)
          setTimer(0)
        }
      }
    )
  }

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type='button'
          variant='outline'
          className='h-12 px-4 flex items-center gap-2'
        >
          <Pencil className='w-4 h-4' />
          Edit
        </Button>
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
            Enter your new email address below.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-6 py-4'>
          <div className='space-y-2'>
            <Label className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
              New Email Address
            </Label>
            <div className='relative'>
              <Input
                {...register('newEmail', {
                  required: 'Email is required'
                })}
                type='email'
                placeholder='email@example.com'
                className='bg-muted/30 border-border h-11 pl-10'
              />
              <AtSign className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
            </div>
            {errors.newEmail && (
              <p className='text-[10px] text-destructive font-bold'>
                {errors.newEmail.message}
              </p>
            )}
          </div>

          <Button
            type='button'
            onClick={handleSendOtp}
            disabled={sendOtp.isPending || timer > 0}
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

          <div className='space-y-2'>
            <Label className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
              OTP Code
            </Label>
            <Input
              {...register('otp', {
                required: otpEnabled ? 'OTP is required' : false
              })}
              placeholder='Enter 6 digit OTP'
              disabled={!otpEnabled}
              className='bg-muted/30 border-border h-11'
            />
          </div>

          <div className='p-3 rounded-lg bg-destructive/5 border border-destructive/10 flex gap-3'>
            <ShieldAlert className='w-5 h-5 text-destructive shrink-0' />
            <p className='text-[10px] text-destructive/80 font-medium'>
              Changing your email will affect login credentials.
            </p>
          </div>

          <DialogFooter>
            <Button
              type='button'
              onClick={handleSubmit(handleUpdateEmail)}
              disabled={changeEmail.isPending || !otpEnabled}
              className='w-full bg-primary text-primary-foreground h-11'
            >
              {changeEmail.isPending && (
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              )}
              {changeEmail.isPending ? 'Processing...' : 'Verify & Update'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeEmail
