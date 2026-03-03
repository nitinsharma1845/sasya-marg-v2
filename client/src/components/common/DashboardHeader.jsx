import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import ThemeToggle from './ThemeToggle'
import { useTranslation } from 'react-i18next'
import LanguageProvider from './LanguageProvider'

const DashboardHeader = () => {
  const { user, isAuthenticated, role } = useAuthStore()
  const { t } = useTranslation()

  const farmerLinks = [
    { name: 'nav.schemes', href: '/farmer/schemes' },
    { name: 'nav.mandi', href: '/farmer/mandi' },
    { name: 'nav.farmlands', href: '/farmer/farmland' },
    { name: 'nav.getSuggestion', href: '/farmer/get-suggestion' },
    { name: 'nav.support', href: '/farmer/support' }
  ]

  const buyerlinks = [
    { name: 'nav.harvested', href: '/buyer/product/harvested' },
    { name: 'nav.preHarvested', href: '/buyer/product/pre-harvested' },
    { name: 'nav.helpSupport', href: '/buyer/disputes' },
    { name: 'nav.wishlist', href: '/buyer/wishlist' }
  ]

  return (
    <header className='h-16 bg-background border-b flex items-center justify-between px-10 md:px-23'>
      <h1 className='font-semibold text-xl'>{t('navbar.dashboard')}</h1>
      <div className='flex items-center gap-2'>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-9 w-9 rounded-full'>
                <Avatar className='md:h-8.5 md:w-8.5 w-7 h-7'>
                  <AvatarFallback
                    className={
                      'text-lg font-bold dark:bg-primary dark:text-primary-foreground bg-chart-5/20 cursor-pointer'
                    }
                  >
                    {user.fullname.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {user.fullname}
                  </p>
                  <p className='text-xs leading-none text-foreground'>
                    {user.email ? (
                      user.email
                    ) : (
                      <Link
                        to={`/${role}/`}
                        className='border-b border-dotted text-accent'
                      >
                        {t('nav.addEmail')}
                      </Link>
                    )}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/${role}`}>
                <DropdownMenuItem className='focus:bg-secondary cursor-pointer focus:text-secondary-foreground'>
                  <span>{t('nav.profile')}</span>
                </DropdownMenuItem>
              </Link>

              {role === 'farmer' &&
                farmerLinks.map(link => (
                  <Link to={link.href} key={link.name}>
                    <DropdownMenuItem className='focus:bg-secondary cursor-pointer focus:text-secondary-foreground'>
                      <span>{t(link.name)}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}

              {role === 'buyer' &&
                buyerlinks.map(link => (
                  <Link to={link.href} key={link.name}>
                    <DropdownMenuItem className='focus:bg-secondary cursor-pointer focus:text-secondary-foreground'>
                      <span>{t(link.name)}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className='flex gap-2'>
            <Button variant='ghost' asChild>
              <Link to='/farmer/login'>Log in</Link>
            </Button>
            <Button asChild>
              <Link to='/farmer/signup'>Get Started</Link>
            </Button>
          </div>
        )}
        <ThemeToggle />
        {/* <LanguageProvider /> */}
      </div>
    </header>
  )
}

export default DashboardHeader
