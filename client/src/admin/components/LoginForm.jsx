import * as React from 'react'
import { ArrowRight, Eye, EyeOff, Loader2, Lock, ShieldAlert, User } from 'lucide-react'
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
import { useLoginAdmin } from '../hooks/auth.hooks'

function LoginForm () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[6-9]\d{9}$/
  const { mutate, isPending } = useLoginAdmin()

  const [showPassword, setShowPassword] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({ mode: 'onChange' })
  function handleLogin (data) {
    mutate(data)
  }

  return (
    <Card className='w-full max-w-md border-border/50 shadow-xl backdrop-blur-sm bg-card/95'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center text-foreground'>
          Admin Login
        </CardTitle>
        <CardDescription className='text-center text-muted-foreground'>
          Enter your credentials to access the Sasya Marg dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <form className='space-y-3' onSubmit={handleSubmit(handleLogin)}>
          <div className='grid gap-2'>
            <Label htmlFor='identifier'>Email or Phone</Label>
            <div className='relative'>
              <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                {...register('identifier', {
                  required: 'Email or phone is required',
                  validate: value => {
                    const isEmail = emailRegex.test(value)
                    const isPhone = phoneRegex.test(value)

                    if (!isEmail && !isPhone) {
                      return 'Enter a valid email or 10-digit phone number'
                    }

                    return true
                  }
                })}
                id='identifier'
                placeholder='admin@sasyamarg.com'
                className='pl-10'
              />
            </div>
            {errors.identifier && (
              <p className='text-xs text-destructive mt-1 ml-1'>
                {errors.identifier.message}
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
                Log In <ArrowRight className='ml-2 h-4 w-4' />
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

export default LoginForm
