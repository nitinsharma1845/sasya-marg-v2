import { getOptimizedImg } from '@/lib/imageHelper'
import LoginForm from '../components/LoginForm'

export default function LoginPage () {
  const imgUrl = getOptimizedImg(
    'https://res.cloudinary.com/dq0ltmja4/image/upload/v1770909519/photo-1500382017468-9049fed747ef_eewm0z.jpg'
  )
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

        <LoginForm />

        <footer className='mt-8 text-white/60 text-xs'>
          © 2026 Sasya Marg AI Systems. All rights reserved.
        </footer>
      </main>
    </div>
  )
}
