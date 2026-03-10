import { useState, useEffect } from 'react'
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useSendOtp } from '@/hooks/auth.hooks'
import { useRegisterBuyer } from '@/hooks/buyer.hooks'

const BuyerRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [phoneTimer, setPhoneTimer] = useState(0)
  const [emailTimer, setEmailTimer] = useState(0)

  const { mutate: sendPhoneOtp, isPending: isSendingPhone } = useSendOtp()

  const { mutate: sendEmailOtp, isPending: isSendingEmail } = useSendOtp()

  const { mutate: registerUser, isPending: isRegistering } = useRegisterBuyer()

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm({ mode: 'onChange' })

  useEffect(() => {
    if (phoneTimer === 0) return
    const interval = setInterval(() => {
      setPhoneTimer(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [phoneTimer])

  useEffect(() => {
    if (emailTimer === 0) return
    const interval = setInterval(() => {
      setEmailTimer(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [emailTimer])

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleSendOtp = async () => {
    const isPhoneValid = await trigger('phone')
    if (isPhoneValid) {
      const phone = getValues('phone')
      sendPhoneOtp(
        { phone, purpose: 'register' },
        {
          onSuccess: () => {
            setOtpSent(true)
            setPhoneTimer(120)
          }
        }
      )
    }
  }

  const handleSendEmailOtp = async () => {
    const isEmailValid = await trigger('email')
    if (isEmailValid) {
      const email = getValues('email')
      sendEmailOtp(
        { email, purpose: 'email_verification' },
        {
          onSuccess: () => {
            setEmailOtpSent(true)
            setEmailTimer(120)
          }
        }
      )
    }
  }

  const handleRegisterBuyer = async data => {
    const payload = {
      fullname: data.fullname,
      phone: data.phone,
      otp: data.otp,
      password: data.password,
      email: data.email,
      emailOtp: data.emailOtp
    }
    registerUser(payload)
  }

  return (
    <div className='w-full max-w-lg mx-auto space-y-8 p-2'>
      <div className='space-y-2 text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground'>
          Create Buyer Account
        </h2>
        <p className='text-sm text-muted-foreground'>
          Join Sasya Marg to source quality products directly
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(handleRegisterBuyer)}>
        <div className='space-y-1'>
          <div className='relative'>
            <User className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Full Name'
              className={`pl-10 h-11 ${
                errors.fullname ? 'border-destructive' : ''
              }`}
              {...register('fullname', {
                required: 'Full name is required',
                minLength: { value: 3, message: 'At least 3 characters' }
              })}
            />
          </div>
          {errors.fullname && (
            <p className='text-[11px] text-destructive ml-1'>
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div className='space-y-1'>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Email'
              type='email'
              className={`pl-10 pr-24 h-11 ${
                errors.email ? 'border-destructive' : ''
              }`}
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address'
                }
              })}
            />
            <div className='absolute right-2 top-1/2 -translate-y-1/2'>
              {!emailOtpSent || emailTimer === 0 ? (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='h-8 text-primary font-bold hover:bg-primary/5'
                  onClick={handleSendEmailOtp}
                  disabled={isSendingEmail}
                >
                  {isSendingEmail ? (
                    <Loader2 className='h-3 w-3 animate-spin' />
                  ) : emailOtpSent ? (
                    'Resend'
                  ) : (
                    'Get OTP'
                  )}
                </Button>
              ) : (
                <span className='text-xs font-mono text-muted-foreground pr-2'>
                  {formatTime(emailTimer)}
                </span>
              )}
            </div>
          </div>
          {errors.email && (
            <p className='text-[11px] text-destructive ml-1'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='space-y-1'>
          <div className='relative'>
            <ShieldCheck className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              disabled={!emailOtpSent}
              placeholder='6-digit OTP'
              className={`pl-10 h-11 tracking-widest ${
                errors.emailOtp ? 'border-destructive' : ''
              }`}
              {...register('emailOtp', {
                required: 'OTP is required',
                minLength: { value: 6, message: 'Must be 6 digits' }
              })}
            />
          </div>
          {errors.emailOtp && (
            <p className='text-[11px] text-destructive ml-1'>
              {errors.emailOtp.message}
            </p>
          )}
        </div>

        <div className='space-y-1'>
          <div className='relative'>
            <Phone className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Phone Number'
              type='tel'
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
              {!otpSent || phoneTimer === 0 ? (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='h-8 text-primary font-bold hover:bg-primary/5'
                  onClick={handleSendOtp}
                  disabled={isSendingPhone}
                >
                  {isSendingPhone ? (
                    <Loader2 className='h-3 w-3 animate-spin' />
                  ) : otpSent ? (
                    'Resend'
                  ) : (
                    'Get OTP'
                  )}
                </Button>
              ) : (
                <span className='text-xs font-mono text-muted-foreground pr-2'>
                  {formatTime(phoneTimer)}
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
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className={`pl-10 pr-10 h-11 text-xs ${
                  errors.password ? 'border-destructive' : ''
                }`}
                {...register('password', {
                  required: 'Required',
                  minLength: { value: 8, message: 'Min 8 chars' }
                })}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && (
              <p className='text-[11px] text-destructive ml-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className='space-y-1'>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm'
                className={`pl-10 pr-10 h-11 text-xs ${
                  errors.confirmPassword ? 'border-destructive' : ''
                }`}
                {...register('confirmPassword', {
                  required: 'Required',
                  validate: (value, formValues) =>
                    value === formValues.password || 'Mismatch'
                })}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
              >
                {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-[11px] text-destructive ml-1'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type='submit'
          className='w-full h-11 font-bold shadow-lg shadow-primary/20 mt-2'
          disabled={isRegistering}
        >
          {isRegistering ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <span className='flex items-center'>
              Create Account <ArrowRight className='ml-2 h-4 w-4' />
            </span>
          )}
        </Button>
      </form>

      <p className='text-center text-sm text-muted-foreground'>
        Already have account?{' '}
        <Link
          to='/buyer/login'
          className='font-bold text-primary hover:underline underline-offset-4'
        >
          Login
        </Link>
      </p>
    </div>
  )
}

export default BuyerRegisterForm
