import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

const Footer = () => {
  const { authStatus, role } = useAuthStore()

  const isAuthenticated = authStatus === 'authenticated' || authStatus === true

  return (
    <footer className='w-full bg-background border-t border-border'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5'>
          <div className='col-span-1 md:col-span-2 lg:col-span-2'>
            <div className='flex items-center gap-2 mb-4'>
              <Logo className={'w-8 md:w-11'} />
              <span className='text-xl font-bold tracking-tight text-foreground'>
                SasyaMarg
              </span>
            </div>

            <p className='text-sm text-muted-foreground mb-6 max-w-sm'>
              {!isAuthenticated
                ? 'Join our community of modern farmers. Get the latest crop insights and market trends.'
                : role === 'farmer'
                ? 'Empowering your farming journey with real-time data and AI insights.'
                : role === 'buyer'
                ? 'Explore the market and buy crops even before harvest. Grow your business and profit margins by empowering farmers.'
                : 'Welcome to SasyaMarg.'}
            </p>

            <form
              className='flex w-full max-w-sm items-center space-x-2 mb-6'
              onSubmit={e => e.preventDefault()}
            >
              <input
                type='email'
                placeholder='Enter your email'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50'
              />
              <button
                type='submit'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-foreground tracking-wider uppercase'>
              {!isAuthenticated
                ? 'Discover'
                : role === 'buyer'
                ? 'Marketplace'
                : 'My Farm'}
            </h3>
            <ul className='mt-4 space-y-3'>
              {!isAuthenticated && (
                <>
                  <FooterLink href='/' label='Home' />
                  <FooterLink href='/about' label='About Us' />
                  <FooterLink href='/services' label='Our Services' />
                  <FooterLink href='/farmer/signup' label='Start as farmer' />
                  <FooterLink href='/buyer/signup' label='Start as buyer' />
                </>
              )}

              {isAuthenticated && role === 'farmer' && (
                <>
                  <FooterLink href='/farmer/mandi' label='Mandi Prices' />
                  <FooterLink href='/farmer/farmland' label='My Farmlands' />
                  <FooterLink
                    href='/farmer/get-suggestion'
                    label='AI Suggestions'
                  />
                  <FooterLink
                    href='/farmer/dashboard'
                    label='Farmer Dashboard'
                  />
                </>
              )}

              {isAuthenticated && role === 'buyer' && (
                <>
                  <FooterLink
                    href='/buyer/product/harvested-products'
                    label='Harvested Product'
                  />
                  <FooterLink
                    href='/buyer/product/pre-harvested-products'
                    label='Pre-harvested Product'
                  />
                  <FooterLink href='/buyer/dashboard' label='Buyer Dashboard' />
                  <FooterLink href='/buyer/wishlist' label='Wishlist' />
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-foreground tracking-wider uppercase'>
              {isAuthenticated ? 'Support' : 'Connect'}
            </h3>
            <ul className='mt-4 space-y-3'>
              {isAuthenticated ? (
                <>
                  {role === 'farmer' && (
                    <>
                      <FooterLink href='/support' label='Help & Support' />
                      <FooterLink
                        href='/farmer/community'
                        label='Farmer Forum'
                      />
                      <FooterLink href='/farmer/schemes' label='Govt Schemes' />
                    </>
                  )}

                  {role === 'buyer' && (
                    <FooterLink
                      href='/buyer/disputes'
                      label='Resolution Center'
                    />
                  )}
                </>
              ) : (
                <>
                  <FooterLink href='/contact' label='Contact Us' />
                  <FooterLink href='/blogs' label='Farming Blog' />
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-foreground tracking-wider uppercase'>
              Legal
            </h3>
            <ul className='mt-4 space-y-3'>
              <FooterLink href='/privacy-policy' label='Privacy Policy' />
              <FooterLink href='/terms-of-service' label='Terms of Service' />
              <FooterLink href='/data-usage' label='Data Usage Policy' />
              <FooterLink href='/disclaimer' label='Disclaimer' />
              <FooterLink href='/refund-policy' label='Refund Policy' />
            </ul>
          </div>
        </div>

        <div className='mt-12 border-t border-border pt-8 text-center'>
          <p className='text-center text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} Sasya-Marg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, label }) => (
  <li>
    <Link
      to={href}
      className='text-sm text-muted-foreground hover:text-primary transition-colors block'
    >
      {label}
    </Link>
  </li>
)

export default Footer
