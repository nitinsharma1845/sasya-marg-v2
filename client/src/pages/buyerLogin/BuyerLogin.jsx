import { buyerAuthImg } from '@/constant/BuyerAuthImg'
import BuyerLoginForm from './components/BuyerLoginForm'

const BuyerLogin = () => {
  return (
    <div
      className='relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#0f172a] bg-cover bg-center transition-opacity duration-500'
      style={{
        backgroundImage: `url(${buyerAuthImg}) `
      }}
    >
      <div className='absolute inset-0 bg-black/50 backdrop-blur-xs' />

      <div className='relative z-10 w-full md:w-xl bg-card text-card-foreground rounded-xl overflow-hidden shadow-xl'>
        <div className='p-8 md:p-10 bg-linear-to-br from-primary/10 via-card to-accent/50'>
          <BuyerLoginForm />
        </div>
      </div>
    </div>
  )
}

export default BuyerLogin
