import React from 'react'
import logo from '@/assets/sasyamarg_logo.png'

const Logo = ({ className }) => {
  return (
    <div className={`${className}`}>
      <im
        loading='lazy'
        decoding='async'
        src={logo}
        alt='SasyaMarg'
        className='w-full h-full'
      />
    </div>
  )
}

export default Logo
