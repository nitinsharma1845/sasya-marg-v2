import * as React from 'react'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldAlert,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { useSignupAdmin } from '../hooks/auth.hooks'

function SignupForm ({ token }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[6-9]\d{9}$/
  const { mutate, isPending } = useSignupAdmin()

  const [showPassword, setShowPassword] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({ mode: 'onChange' })
  function handleLogin (data) {
    const payload = {
      token,
      ...data
    }
    mutate(payload)
  }

  return (
    <Card className='w-full max-w-md border-border/50 shadow-xl backdrop-blur-sm bg-card/95'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center text-foreground'>
          Admin Signup
        </CardTitle>
        <CardDescription className='text-center text-muted-foreground'>
          Enter your credentials and became authorized Sasya Marg Admin
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <form className='space-y-3' onSubmit={handleSubmit(handleLogin)}>
          <div className='grid gap-2'>
            <Label htmlFor='fullname'>Full Name</Label>
            <div className='relative'>
              <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                {...register('fullname', {
                  required: 'fullname is required'
                })}
                id='fullname'
                placeholder='Ram Singh'
                className='pl-10'
              />
            </div>
            {errors.fullname && (
              <p className='text-xs text-destructive mt-1 ml-1'>
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <div className='relative'>
              <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                {...register('email', {
                  required: 'email is required',
                  pattern: {
                    value: emailRegex,
                    message: 'Invalid email format'
                  }
                })}
                id='email'
                placeholder='ramsingh@gmail.com'
                className='pl-10'
              />
            </div>
            {errors.email && (
              <p className='text-xs text-destructive mt-1 ml-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='phone'>Phone</Label>
            <div className='relative'>
              <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                {...register('phone', {
                  required: 'phone is required',
                  pattern: {
                    value: phoneRegex,
                    message: 'Invalid phone format'
                  }
                })}
                id='phone'
                placeholder='9999999999'
                className='pl-10'
              />
            </div>
            {errors.phone && (
              <p className='text-xs text-destructive mt-1 ml-1'>
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='pssword'>Password</Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />

              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='h-9 pl-9 pr-9 text-sm'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must contain 8 character'
                  }
                })}
              />

              <button
                type='button'
                onClick={() => setShowPassword(prev => !prev)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </button>
            </div>
          </div>

          {errors.password && (
            <p className='text-xs text-destructive mt-1 ml-1'>
              {errors.password.message}
            </p>
          )}

          <Button
            type='submit'
            className='w-full font-bold text-md'
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <>
                Register <ArrowRight className='ml-2 h-4 w-4' />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col gap-4 border-t border-border/50 pt-6'>
        <div className='flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/40'>
          <ShieldAlert className='h-5 w-5 text-destructive shrink-0 mt-0.5' />
          <div className='space-y-1'>
            <p className='text-xs font-bold text-foreground uppercase tracking-tight'>
              Restricted Area
            </p>
            <p className='text-[11px] leading-relaxed text-muted-foreground'>
              This portal is strictly for authorized{' '}
              <span className='text-foreground font-medium'>Sasya Marg</span>{' '}
              administrators. Unauthorized access attempts are restricted.
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default SignupForm
