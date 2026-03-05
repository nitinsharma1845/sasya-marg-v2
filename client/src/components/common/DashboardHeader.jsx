import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sprout,
  TrendingUp,
  BookOpen,
  Heart,
  LogOut,
  Globe,
  Moon,
  Settings,
  Plus
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useTranslation } from 'react-i18next'
import LanguageProvider from './LanguageProvider'
import Logo from './Logo'

const DashboardHeader = () => {
  const { user, isAuthenticated, role } = useAuthStore()
  const { t } = useTranslation()
  const location = useLocation()

  const farmerLinks = [
    { name: 'nav.schemes', href: '/farmer/schemes', icon: BookOpen },
    { name: 'nav.mandi', href: '/farmer/mandi', icon: TrendingUp },
    { name: 'nav.farmlands', href: '/farmer/farmland', icon: Sprout },
    { name: 'nav.getSuggestion', href: '/farmer/get-suggestion', icon: Sprout },
    { name: 'nav.support', href: '/farmer/support', icon: Heart }
  ]

  const buyerLinks = [
    { name: 'nav.harvested', href: '/buyer/product/harvested', icon: Sprout },
    {
      name: 'nav.preHarvested',
      href: '/buyer/product/pre-harvested',
      icon: TrendingUp
    },
    { name: 'nav.helpSupport', href: '/buyer/disputes', icon: BookOpen },
    { name: 'nav.wishlist', href: '/buyer/wishlist', icon: Heart }
  ]

  const links = role === 'farmer' ? farmerLinks : buyerLinks

  return (
    <header className='sticky top-0 z-40 h-20 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-full items-center justify-between px-6 relative'>
        <div className='flex items-center z-10'>
          <Link to={`/${role}`} className='flex items-center gap-3 group'>
            <Logo className='w-10 h-10 transition-transform group-hover:scale-105' />
            <span className='font-bold text-2xl tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              {t('navbar.dashboard')}
            </span>
          </Link>
        </div>

        <nav className='hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1'>
          {isAuthenticated &&
            links.map(link => {
              const Icon = link.icon
              const active = location.pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                >
                  <Icon size={18} />
                  {t(link.name)}
                </Link>
              )
            })}
        </nav>

        <div className='flex items-center gap-6 z-10'>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='icon'
                  className='group flex items-center gap-3 h-12 px-2 hover:bg-transparent cursor-pointer outline-none'
                >
                  <div className='relative'>
                    <Avatar className='h-10 w-10 border-2 border-primary/20 transition-transform group-hover:scale-105'>
                      <AvatarFallback className='bg-primary text-primary-foreground font-bold'>
                        {user?.fullname?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full' />
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align='end'
                className='w-72 p-3 rounded-2xl shadow-2xl border-muted/50'
                sideOffset={12}
              >
                <DropdownMenuLabel className='px-3 py-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-12 w-12'>
                      <AvatarFallback className='bg-secondary text-secondary-foreground font-bold text-lg'>
                        {user?.fullname?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                      <p className='text-base font-bold truncate max-w-40'>
                        {user.fullname}
                      </p>
                      {user.email ? (
                        <p className='text-xs text-muted-foreground truncate max-w-40'>
                          {user.email}
                        </p>
                      ) : (
                        <Link to={`/${role}`}>
                          <Button
                            variant='secondary'
                            size='sm'
                            className='h-7 px-2 text-[10px] font-bold uppercase tracking-wider gap-1 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all'
                          >
                            <Plus size={12} /> Add Email
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className='my-2 xl:hidd' />

                <DropdownMenuGroup className='space-y-1 xl:hidden'>
                  {isAuthenticated &&
                    links.map(link => {
                      const Icon = link.icon
                      const active = location.pathname.startsWith(link.href)
                      return (
                        <Link
                          key={link.href}
                          to={link.href}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                        >
                          <Icon size={18} />
                          {t(link.name)}
                        </Link>
                      )
                    })}
                </DropdownMenuGroup>

                <DropdownMenuSeparator className='my-2' />
                <DropdownMenuGroup className='space-y-1'>
                  <div className='flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors gap-5'>
                    <div className='flex items-center gap-3 text-sm font-medium'>
                      <Globe size={18} className='text-primary' />
                      <span>Language</span>
                    </div>
                    <LanguageProvider />
                  </div>
                  <div className='flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors'>
                    <div className='flex items-center gap-3 text-sm font-medium'>
                      <Moon size={18} className='text-primary' />
                      <span>Appearance</span>
                    </div>
                    <ThemeToggle />
                  </div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className='my-2' />

                <DropdownMenuGroup className='space-y-1'>
                  <Link to={`/${role}`}>
                    <DropdownMenuItem className='h-11 rounded-xl cursor-pointer flex items-center gap-3 focus:bg-secondary hover:text-primary'>
                      <Settings size={18} className='text-muted-foreground' />
                      <span className='font-medium hover:text-primary'>Account Settings</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>

                {/* <DropdownMenuSeparator className='my-2' />

                <DropdownMenuItem
                  className='h-11 rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer flex items-center gap-3'
                  onClick={() => logout()}
                >
                  <LogOut size={18} />
                  <span className='font-bold'>Sign Out</span>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className='flex items-center gap-4'>
              <Button variant='ghost' className='font-semibold' asChild>
                <Link to='/login'>Log in</Link>
              </Button>
              <Button
                className='rounded-xl px-6 shadow-lg shadow-primary/25'
                asChild
              >
                <Link to='/signup'>Join Platform</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
