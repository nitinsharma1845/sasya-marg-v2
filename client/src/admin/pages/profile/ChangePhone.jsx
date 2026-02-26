import React, { useEffect, useState } from 'react'
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
  Smartphone,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSendOtp } from '@/hooks/auth.hooks'
import { useChangPhone } from '@/admin/hooks/admin.hooks'

const ChangePhone = () => {
  const [otpSent, setOtpSent] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm({ mode: 'onChange' })
  const sendOtp = useSendOtp()
  const changePhone = useChangPhone()

  const phoneValue = watch('phone')

  useEffect(() => {
    let timer
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [otpSent, timeLeft])

  const handleSendOTP = () => {
    if (!phoneValue || errors.phone) return
    const payload = {
      phone: phoneValue,
      purpose: 'forgot_password'
    }

    sendOtp.mutate(payload, {
      onSuccess: () => {
        setOtpSent(true)
        setTimeLeft(120)
      }
    })
  }

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVerifyAndChange = data => {
    const payload = {
      otp: data?.otp,
      newPhone: phoneValue,
      purpose: 'forgot_password'
    }

    changePhone.mutate(payload, {
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
          <Smartphone className='w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform' />
          <span className='text-[10px] font-bold uppercase tracking-tight text-center'>
            New Phone
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-100 bg-card border-border'>
        <DialogHeader>
          <div className='flex items-center gap-2 mb-2'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Smartphone className='w-5 h-5 text-primary' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              Update Phone
            </DialogTitle>
          </div>
          <DialogDescription className='text-muted-foreground text-xs font-medium'>
            Verify your new contact number to maintain account security.
          </DialogDescription>
        </DialogHeader>

        <form
          className='grid gap-6 py-4'
          onSubmit={handleSubmit(handleVerifyAndChange)}
        >
          
          <div className='space-y-2'>
            <Label className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
              New Phone Number
            </Label>
            <div className='flex gap-2'>
              <div className='relative flex-1'>
                <Input
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Invalid 10-digit number'
                    }
                  })}
                  disabled={otpSent}
                  placeholder='9876543210'
                  className='bg-muted/30 border-border focus:ring-primary h-11 pl-10 disabled:opacity-50'
                />
                <Smartphone className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
              </div>
              {!otpSent && (
                <Button
                  type='button'
                  onClick={handleSendOTP}
                  disabled={!phoneValue || !!errors.phone}
                  className='h-11 bg-primary text-primary-foreground font-bold text-[10px] uppercase px-4 hover:opacity-90'
                >
                  <Send className='w-3 h-3 mr-2' />
                  Send
                </Button>
              )}
            </div>
            {errors.phone && (
              <p className='text-[10px] font-bold text-destructive uppercase tracking-tight'>
                {errors.phone.message}
              </p>
            )}
          </div>

        
          <div
            className={`space-y-2 transition-all duration-300 ${
              otpSent ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}
          >
            <Label className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
              Verification Code
            </Label>
            <div className='relative'>
              <Input
                {...register('otp', {
                  required: otpSent ? 'OTP is required' : false,
                  minLength: { value: 6, message: 'OTP must be 6 digits' }
                })}
                placeholder='000000'
                maxLength={6}
                className='bg-muted/30 border-border focus:ring-primary h-11 pl-10 tracking-[0.5em] font-bold text-center'
              />
              <ShieldCheck className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
            </div>
            {errors.otp && (
              <p className='text-[10px] font-bold text-destructive uppercase tracking-tight'>
                {errors.otp.message}
              </p>
            )}
            <div className='flex justify-end mt-1'>
              {otpSent &&
                (timeLeft > 0 ? (
                  <div className='flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase'>
                    <Clock className='w-3 h-3' />
                    Resend in {formatTime(timeLeft)}
                  </div>
                ) : (
                  <button
                    type='button'
                    onClick={handleSendOTP}
                    className='text-[10px] text-primary font-black uppercase hover:underline underline-offset-4 tracking-tighter'
                  >
                    Resend OTP
                  </button>
                ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type='submit'
              disabled={!otpSent || isSubmitting}
              className='w-full bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase tracking-widest text-xs h-11 shadow-md disabled:bg-muted disabled:text-muted-foreground'
            >
              <CheckCircle2 className='w-4 h-4 mr-2' />
              {isSubmitting ? 'Verifying...' : 'Change Number'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePhone
