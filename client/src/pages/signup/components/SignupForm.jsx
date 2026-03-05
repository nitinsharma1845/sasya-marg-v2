import { useState, useEffect } from 'react'
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  User,
  Phone,
  Lock,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useSendOtp, useRegisterFarmer } from '@/hooks/auth.hooks'

const FarmerSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [timer, setTimer] = useState(0)

  const { mutate: sendOtp, isPending: isSending } = useSendOtp()
  const { mutate: registerUser, isPending: isRegistering } = useRegisterFarmer()

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm({ mode: 'onChange' })

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
        { phone, purpose: 'register' },
        {
          onSuccess: () => {
            setOtpSent(true)
            setTimer(120)
          }
        }
      )
    }
  }

  const registerFarmer = async data => {
    const payload = {
      fullname: data.fullname,
      phone: data.phone,
      otp: data.otp,
      password: data.password
    }
    registerUser(payload)
  }

  return (
    <div className='w-full max-w-lg mx-auto space-y-8 p-2'>
      <div className='space-y-2 text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground'>
          Create Account
        </h2>
        <p className='text-sm text-muted-foreground'>
          Start your journey with Sasya Marg today
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(registerFarmer)}>
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
              {!otpSent || timer === 0 ? (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='h-8 text-primary font-bold hover:bg-primary/5'
                  onClick={handleSendOtp}
                  disabled={isSending}
                >
                  {isSending ? (
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
        Already have an account?{' '}
        <Link
          to='/farmer/login'
          className='font-bold text-primary hover:underline underline-offset-4'
        >
          Login
        </Link>
      </p>
    </div>
  )
}

export default FarmerSignupForm
