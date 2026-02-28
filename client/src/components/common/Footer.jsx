import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { authStatus, role } = useAuthStore()
  const { t } = useTranslation()

  const isAuthenticated = authStatus === 'authenticated' || authStatus === true

  return (
    <footer className='w-full bg-background border-t border-border'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5'>
          <div className='col-span-1 md:col-span-2 lg:col-span-2'>
            <div className='flex items-center gap-2 mb-4'>
              <Logo className={'w-8 md:w-11'} />
              <span className='text-xl font-bold tracking-tight text-foreground'>
                {t('app.fullname')}
              </span>
            </div>

            <p className='text-sm text-muted-foreground mb-6 max-w-sm'>
              {!isAuthenticated
                ? t('footer.description.guest')
                : role === 'farmer'
                ? t('footer.description.farmer')
                : role === 'buyer'
                ? t('footer.description.buyer')
                : t('footer.description.default')}
            </p>

            <form
              className='flex w-full max-w-sm items-center space-x-2 mb-6'
              onSubmit={e => e.preventDefault()}
            >
              <input
                type='email'
                placeholder={t('footer.newsletter.placeholder')}
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50'
              />
              <button
                type='submit'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
              >
                {t('footer.newsletter.subscribe')}
              </button>
            </form>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-foreground tracking-wider uppercase'>
              {!isAuthenticated
                ? t('footer.sections.discover')
                : role === 'buyer'
                ? t('footer.sections.marketplace')
                : t('footer.sections.myFarm')}
            </h3>
            <ul className='mt-4 space-y-3'>
              {!isAuthenticated && (
                <>
                  <FooterLink href='/' label={t('footer.links.home')} />
                  <FooterLink href='/about' label={t('footer.links.about')} />
                  <FooterLink
                    href='/services'
                    label={t('footer.links.services')}
                  />
                  <FooterLink
                    href='/farmer/signup'
                    label={t('footer.links.startFarmer')}
                  />
                  <FooterLink
                    href='/buyer/signup'
                    label={t('footer.links.startBuyer')}
                  />
                </>
              )}

              {isAuthenticated && role === 'farmer' && (
                <>
                  <FooterLink
                    href='/farmer/mandi'
                    label={t('footer.links.mandiPrices')}
                  />
                  <FooterLink
                    href='/farmer/farmland'
                    label={t('footer.links.myFarmlands')}
                  />
                  <FooterLink
                    href='/farmer/get-suggestion'
                    label={t('footer.links.aiSuggestions')}
                  />
                  <FooterLink
                    href='/farmer/dashboard'
                    label={t('footer.links.farmerDashboard')}
                  />
                </>
              )}

              {isAuthenticated && role === 'buyer' && (
                <>
                  <FooterLink
                    href='/buyer/product/harvested-products'
                    label={t('footer.links.harvestedProduct')}
                  />
                  <FooterLink
                    href='/buyer/product/pre-harvested-products'
                    label={t('footer.links.preHarvestedProduct')}
                  />
                  <FooterLink
                    href='/buyer/dashboard'
                    label={t('footer.links.buyerDashboard')}
                  />
                  <FooterLink
                    href='/buyer/wishlist'
                    label={t('footer.links.wishlist')}
                  />
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-foreground tracking-wider uppercase'>
              {isAuthenticated
                ? t('footer.sections.support')
                : t('footer.sections.connect')}
            </h3>
            <ul className='mt-4 space-y-3'>
              {isAuthenticated ? (
                <>
                  {role === 'farmer' && (
                    <>
                      <FooterLink
                        href='/support'
                        label={t('footer.links.helpSupport')}
                      />
                      <FooterLink
                        href='/farmer/community'
                        label={t('footer.links.farmerForum')}
                      />
                      <FooterLink
                        href='/farmer/schemes'
                        label={t('footer.links.govtSchemes')}
                      />
                    </>
                  )}

                  {role === 'buyer' && (
                    <FooterLink
                      href='/buyer/disputes'
                      label={t('footer.links.resolutionCenter')}
                    />
                  )}
                </>
              ) : (
                <>
                  <FooterLink
                    href='/contact'
                    label={t('footer.links.contact')}
                  />
                  <FooterLink href='/blogs' label={t('footer.links.blog')} />
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-foreground tracking-wider uppercase'>
              {t('footer.sections.legal')}
            </h3>
            <ul className='mt-4 space-y-3'>
              <FooterLink
                href='/privacy-policy'
                label={t('footer.links.privacyPolicy')}
              />
              <FooterLink
                href='/terms-of-service'
                label={t('footer.links.terms')}
              />
              <FooterLink
                href='/data-usage'
                label={t('footer.links.dataUsage')}
              />
              <FooterLink
                href='/disclaimer'
                label={t('footer.links.disclaimer')}
              />
              <FooterLink
                href='/refund-policy'
                label={t('footer.links.refundPolicy')}
              />
            </ul>
          </div>
        </div>

        <div className='mt-12 border-t border-border pt-8 text-center'>
          <p className='text-center text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} {t('app.fullname')}{' '}
            {t('footer.copyright')}
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
