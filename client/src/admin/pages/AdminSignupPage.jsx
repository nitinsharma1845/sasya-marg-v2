import { getOptimizedImg } from '@/lib/imageHelper'
import SignupForm from '../components/SignupForm'
import { useSearchParams } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function AdminSignupPage () {
  const [params] = useSearchParams()
  const imgUrl = getOptimizedImg(
    'https://res.cloudinary.com/dq0ltmja4/image/upload/v1770909519/photo-1500382017468-9049fed747ef_eewm0z.jpg'
  )

  const token = params.get('token')
  return (
    <div className='relative min-h-screen w-full flex items-center justify-center overflow-hidden'>
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='absolute inset-0 bg-foreground/30 backdrop-brightness-75' />
      </div>

      <main className='relative z-10 w-full px-4 flex flex-col items-center'>
        <div className='mb-8 flex flex-col items-center'>
          <h1 className='text-3xl font-bold text-white tracking-tight drop-shadow-md'>
            Sasya Marg
          </h1>
          <p className='text-white/80 text-sm mt-1'>
            Nurturing Growth with Intelligence
          </p>
        </div>

        {token ? <SignupForm token={token} /> : <InvalidTokenMessage />}

        <footer className='mt-8 text-white/60 text-xs'>
          © 2026 Sasya Marg AI Systems. All rights reserved.
        </footer>
      </main>
    </div>
  )
}

function InvalidTokenMessage () {
  return (
    <Card className='w-full max-w-md border-border/50 shadow-2xl backdrop-blur-md bg-card/95 animate-in fade-in zoom-in duration-300'>
      <CardHeader className='text-center pb-2'>
        <div className='flex justify-center mb-4'>
          <div className='p-3 bg-destructive/10 rounded-full'>
            <ShieldAlert className='h-10 w-10 text-destructive' />
          </div>
        </div>
        <CardTitle className='text-2xl font-bold text-foreground'>
          Access Restricted
        </CardTitle>
        <CardDescription className='text-muted-foreground pt-2'>
          Admin registration is strictly invitation-only.
        </CardDescription>
      </CardHeader>
      <CardContent className='text-center space-y-4 px-8'>
        <p className='text-sm leading-relaxed text-muted-foreground'>
          It looks like you're trying to access the signup page without a valid
          invitation token. Please use the link provided in your invitation
          email.
        </p>
        <div className='p-3 bg-muted/50 rounded-lg border border-border/50'>
          <p className='text-[11px] text-muted-foreground uppercase font-semibold tracking-wider'>
            Security Note
          </p>
          <p className='text-xs text-foreground/70 mt-1'>
            Unauthorized registration attempts are logged for system security.
          </p>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-3 pt-4'>
        <Button asChild className='w-full bg-primary hover:bg-primary/90'>
          <Link to='/admin/login' className='flex items-center gap-2'>
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
