import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useUnSubscribeToNewsletter } from '@/hooks/public.hooks'
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Leaf
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Logo from '@/components/common/Logo'

const Unsubscribe = () => {
  const { token } = useParams()
  const { data, isLoading, isError, error } = useUnSubscribeToNewsletter(token)

  return (
    <div className='min-h-screen bg-background flex flex-col items-center justify-center p-4'>
      <div className='flex items-center gap-2 mb-8'>
        <div className='p-2 w-15 h-15'>
          <Logo />
        </div>
        <span className='text-2xl font-bold text-foreground tracking-tight'>
          Sasya Marg
        </span>
      </div>

      <Card className='max-w-md w-full border-border bg-card shadow-sm rounded-[var(--radius)]'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            {isLoading ? (
              <div className='h-16 w-16 bg-muted rounded-full flex items-center justify-center'>
                <Loader2 className='h-8 w-8 text-primary animate-spin' />
              </div>
            ) : isError ? (
              <div className='h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center'>
                <AlertCircle className='h-8 w-8 text-destructive' />
              </div>
            ) : (
              <div className='h-16 w-16 bg-secondary rounded-full flex items-center justify-center'>
                <CheckCircle2 className='h-8 w-8 text-primary' />
              </div>
            )}
          </div>

          <CardTitle className='text-2xl font-semibold text-card-foreground'>
            {isLoading
              ? 'Processing Request'
              : isError
              ? 'Unable to Unsubscribe'
              : 'Unsubscribed'}
          </CardTitle>

          <CardDescription className='text-muted-foreground mt-2'>
            {isLoading
              ? 'Updating your preferences...'
              : isError
              ? error?.response?.data?.message ||
                'This link may be invalid or expired.'
              : data?.message ||
                'You have been successfully removed from our newsletter.'}
          </CardDescription>
        </CardHeader>

        <CardContent className='flex flex-col gap-4 items-center pb-8'>
          {!isLoading && (
            <>
              <p className='text-sm text-center text-muted-foreground/80'>
                Changed your mind? You can re-subscribe anytime from your
                dashboard.
              </p>

              <div className='w-full h-px bg-border my-2' />

              <Button
                asChild
                variant='outline'
                className='w-full border-border hover:bg-secondary text-foreground'
              >
                <Link to='/' className='flex items-center justify-center gap-2'>
                  <ArrowLeft className='h-4 w-4' />
                  Return to Sasya Marg
                </Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <footer className='mt-8 text-muted-foreground text-sm font-medium'>
        &copy; {new Date().getFullYear()} Sasya Marg — Path of crops
      </footer>
    </div>
  )
}

export default Unsubscribe
