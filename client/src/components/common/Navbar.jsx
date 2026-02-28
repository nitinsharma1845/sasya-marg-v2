import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { Menu, User, LogOut, LayoutDashboard, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useLogoutFarmer } from '@/hooks/auth.hooks'
import ThemeToggle from './ThemeToggle'
import LogoutButton from './LogoutButton'
import LogoutConfirmDialog from './LogoutDialog'
import LanguageProvider from './LanguageProvider'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { isAuthenticated, role } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const navLinks = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.services', href: '/services' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.contact', href: '/contact' }
  ]

  const farmerLinks = [
    { key: 'nav.mandi', href: '/farmer/mandi' },
    { key: 'nav.schemes', href: '/farmer/schemes' },
    { key: 'nav.farmlands', href: '/farmer/farmland' },
    { key: 'nav.getSuggestion', href: '/farmer/get-suggestion' },
    { key: 'nav.support', href: '/farmer/support' }
  ]

  const buyerLinks = [
    { key: 'nav.harvested', href: '/buyer/product/harvested' },
    { key: 'nav.preHarvested', href: '/buyer/product/pre-harvested' },
    { key: 'nav.helpSupport', href: '/buyer/disputes' },
    { key: 'nav.wishlist', href: '/buyer/wishlist' }
  ]

  const isActive = path => location.pathname === path
  const { mutate } = useLogoutFarmer()

  function handleLogout () {
    mutate()
  }

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex md:h-14 h-12 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Link to='/' className='flex items-center gap-2'>
              <Logo className={'w-8 md:w-11'} />
              <span className='md:text-2xl text-lg font-bold tracking-tight text-foreground'>
                {t('app.name1')}
                <span className='text-primary'>{t('app.name2')}</span>
              </span>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className='hidden md:flex md:items-center md:gap-6'>
              {role === 'farmer' &&
                farmerLinks.map(link => (
                  <Link
                    key={link.key}
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(link.href)
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}

              {role === 'buyer' &&
                buyerLinks.map(link => (
                  <Link
                    key={link.key}
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(link.href)
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
            </div>
          ) : (
            <div className='hidden md:flex md:items-center md:gap-6'>
              {navLinks.map(link => (
                <Link
                  key={link.key}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          )}

          <div className='hidden md:flex md:items-center md:gap-4'>
            {isAuthenticated ? (
              <>
                <Link
                  to={`/${role}/dashboard`}
                  className='flex items-center hover:bg-primary/80 cursor-pointer transition-all ease-in-out py-2 rounded-full px-4 bg-primary text-primary-foreground text-sm'
                >
                  <LayoutDashboard className='mr-2 h-4 w-4' />
                  <span>{t('navbar.dashboard')}</span>
                </Link>
              </>
            ) : (
              <div className='flex items-center gap-2'>
                <Button variant='secondary' asChild size='sm'>
                  <Link to='/farmer/login'>{t('auth.login.farmerTitle')}</Link>
                </Button>
                <Button asChild size='sm'>
                  <Link to='/buyer/login'>{t('auth.login.buyerTitle')}</Link>
                </Button>
              </div>
            )}
            <ThemeToggle />
            <LanguageProvider />
          </div>

          <div className='md:hidden flex items-center gap-2'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <ThemeToggle size={14} />
              <SheetContent side='left' className='w-75 sm:w-100'>
                <SheetHeader>
                  <SheetTitle className='text-left flex items-center justify-between'>
                    <Link to='/' className='flex items-center gap-2'>
                      <Logo className={'w-8 md:w-11'} />
                      <span className='text-lg font-bold tracking-tight text-foreground'>
                        {t('app.nam1')}
                        <span className='text-primary'>{t('app.nam2')}</span>
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {isAuthenticated ? (
                  <div className='flex flex-col gap-4 p-4'>
                    {role === 'farmer' &&
                      farmerLinks.map(link => (
                        <Link
                          key={link.key}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-lg font-medium ${
                            isActive(link.href)
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {t(link.key)}
                        </Link>
                      ))}

                    {role === 'buyer' &&
                      buyerLinks.map(link => (
                        <Link
                          key={link.key}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-lg font-medium ${
                            isActive(link.href)
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {t(link.key)}
                        </Link>
                      ))}

                    <div className='flex flex-col gap-4 w-full'>
                      <Button asChild>
                        <Link to={`/${role}/dashboard`}>
                          {t('navbar.dashboard')}
                        </Link>
                      </Button>
                      <LogoutButton
                        onClick={() => setOpen(true)}
                        variant='destructive'
                        size='default'
                      />
                      <LogoutConfirmDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        onConfirm={handleLogout}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col gap-4 p-4'>
                    {navLinks.map(link => (
                      <Link
                        key={link.key}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium ${
                          isActive(link.href)
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {t(link.key)}
                      </Link>
                    ))}
                    <div className='flex flex-col gap-4 w-full'>
                      <Button variant='secondary' asChild size='sm'>
                        <Link to='/farmer/login'>
                          {t('auth.login.farmerTitle')}
                        </Link>
                      </Button>
                      <Button asChild size='sm'>
                        <Link to='/buyer/login'>
                          {t('auth.login.buyerTitle')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
