import { useState, useEffect } from 'react'
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useFarmerForgotPassword, useSendOtp } from '@/hooks/auth.hooks'

const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [timer, setTimer] = useState(0)

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm({ mode: 'onChange' })

  const { mutate: sendOtp, isPending: sendingOtp } = useSendOtp()
  const { mutate: forgotPassword, isPending: changingPassword } =
    useFarmerForgotPassword()

  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleSendOtp = async () => {
    const isPhoneValid = await trigger('phone')
    if (isPhoneValid) {
      const phone = getValues('phone')
      sendOtp(
        { phone, purpose: 'forgot_password' },
        {
          onSuccess: () => {
            setOtpSent(true)
            setTimer(120)
          }
        }
      )
    }
  }

  const handleFarmerForgotPassword = data => {
    const payload = {
      phone: data.phone,
      otp: data.otp,
      newPassword: data.newPassword
    }
    forgotPassword(payload)
  }

  return (
    <div className='w-full max-w-lg mx-auto space-y-8 p-2'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Reset Password
        </h1>
        <p className='text-sm text-muted-foreground'>
          Verify your phone number to secure your account
        </p>
      </div>

      <form
        className='space-y-4'
        onSubmit={handleSubmit(handleFarmerForgotPassword)}
      >
        <div className='space-y-1'>
          <div className='relative'>
            <Phone className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              type='tel'
              placeholder='Phone Number'
              className={`pl-10 pr-24 h-11 ${
                errors.phone ? 'border-destructive' : ''
              }`}
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Valid 10-digit number required'
                }
              })}
            />
            <div className='absolute right-2 top-1/2 -translate-y-1/2'>
              {!otpSent || timer === 0 ? (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='h-8 text-primary font-bold hover:bg-primary/5'
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                >
                  {sendingOtp ? (
                    <Loader2 className='h-3 w-3 animate-spin' />
                  ) : otpSent ? (
                    'Resend'
                  ) : (
                    'Get OTP'
                  )}
                </Button>
              ) : (
                <span className='text-xs font-mono text-muted-foreground pr-2'>
                  {formatTime(timer)}
                </span>
              )}
            </div>
          </div>
          {errors.phone && (
            <p className='text-[11px] text-destructive ml-1'>
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className='space-y-1'>
          <div className='relative'>
            <ShieldCheck className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              disabled={!otpSent}
              placeholder='6-digit OTP'
              className={`pl-10 h-11 tracking-widest ${
                errors.otp ? 'border-destructive' : ''
              }`}
              {...register('otp', {
                required: 'OTP is required',
                minLength: { value: 6, message: 'Must be 6 digits' }
              })}
            />
          </div>
          {errors.otp && (
            <p className='text-[11px] text-destructive ml-1'>
              {errors.otp.message}
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='space-y-1'>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                disabled={!otpSent}
                type={showPassword ? 'text' : 'password'}
                placeholder='New Password'
                className={`pl-10 pr-10 h-11 text-xs ${
                  errors.newPassword ? 'border-destructive' : ''
                }`}
                {...register('newPassword', {
                  required: 'Required',
                  minLength: { value: 8, message: 'Min 8 chars' }
                })}
              />
              <button
                type='button'
                disabled={!otpSent}
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className='text-[11px] text-destructive ml-1'>
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className='space-y-1'>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                disabled={!otpSent}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm'
                className={`pl-10 pr-10 h-11 text-xs ${
                  errors.confirmNewPassword ? 'border-destructive' : ''
                }`}
                {...register('confirmNewPassword', {
                  required: 'Required',
                  validate: (value, formValues) =>
                    value === formValues.newPassword || 'Mismatch'
                })}
              />
              <button
                type='button'
                disabled={!otpSent}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
              >
                {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className='text-[11px] text-destructive ml-1'>
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type='submit'
          className='w-full h-11 font-bold shadow-lg shadow-primary/20 mt-2'
          disabled={isSubmitting || changingPassword || !otpSent}
        >
          {isSubmitting || changingPassword ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <span className='flex items-center'>
              Reset Password <ArrowRight className='ml-2 h-4 w-4' />
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}

export default ForgotPasswordForm
