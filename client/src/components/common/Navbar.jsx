import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import {
  Menu,
  LayoutDashboard,
  Globe,
  Moon,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  User,
  Bell,
  Loader,
  Loader2
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
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
import { useLogoutFarmer } from '@/hooks/auth.hooks'
import { useLogoutBuyer } from '@/hooks/buyer.hooks'
import ThemeToggle from './ThemeToggle'
import LogoutConfirmDialog from './LogoutDialog'
import LanguageProvider from './LanguageProvider'
import { useTranslation } from 'react-i18next'
import { useGetUnreadNotificationCount } from '@/hooks/notification.hooks'

const Navbar = () => {
  const { user, isAuthenticated, role } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const unreadCount = useGetUnreadNotificationCount(user?._id)
  const count = unreadCount?.data?.data
  const location = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { mutate: logoutFarmer } = useLogoutFarmer()
  const { mutate: logoutBuyer } = useLogoutBuyer()

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

  const currentLinks = role === 'farmer' ? farmerLinks : buyerLinks
  const isActive = path => location.pathname === path

  const handleLogout = () => {
    if (role === 'farmer') logoutFarmer()
    if (role === 'buyer') logoutBuyer()
  }

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto px-4 lg:px-8 relative'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center z-10'>
            <Link to='/' className='flex items-center gap-2 group'>
              <Logo className='w-9 md:w-10 transition-transform group-hover:scale-105' />
              <span className='text-xl font-bold tracking-tight'>
                {t('app.name1')}
                <span className='text-primary'>{t('app.name2')}</span>
              </span>
            </Link>
          </div>

          <div className='hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1'>
            {(isAuthenticated ? currentLinks : navLinks).map(link => (
              <Link
                key={link.key}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/5 font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className='flex items-center z-10'>
            <div className='lg:hidden flex items-center gap-2'>
              {!isAuthenticated}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant='ghost' size='icon' className='rounded-xl'>
                    <Menu className='h-6 w-6' />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side='right'
                  className='w-full sm:w-88 pl-5 flex flex-col'
                >
                  <SheetHeader className='p-6 border-b shrink-0'>
                    <SheetTitle className='text-left flex items-center justify-between'>
                      <Link
                        to='/'
                        className='flex items-center gap-2'
                        onClick={() => setIsOpen(false)}
                      >
                        <Logo className='w-10' />
                        <span className='text-xl font-bold truncate max-w-45'>
                          {t('app.fullname')}
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className='flex flex-col gap-4 overflow-y-auto'>
                    {(isAuthenticated ? currentLinks : navLinks).map(link => (
                      <Link
                        key={link.key}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-semibold p-4 rounded-tl-4xl rounded-bl-4xl transition-colors ${
                          isActive(link.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-secondary'
                        }`}
                      >
                        {t(link.key)}
                      </Link>
                    ))}

                    <div className='mt-4 pt-4 border-t space-y-3'>
                      {!isAuthenticated && (
                        <div className='p-5 space-y-3'>
                          <Button
                            variant='secondary'
                            className='w-full justify-start h-12 rounded-xl'
                            asChild
                            onClick={() => setIsOpen(false)}
                          >
                            <Link to='/farmer/login'>
                              {t('auth.login.farmerTitle')}
                            </Link>
                          </Button>
                          <Button
                            className='w-full justify-start h-12 rounded-xl'
                            asChild
                            onClick={() => setIsOpen(false)}
                          >
                            <Link to='/buyer/login'>
                              {t('auth.login.buyerTitle')}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {isAuthenticated ? (
              <div className='flex items-center gap-3'>
                <Button
                  onClick={() => navigate(`/${role}/notification`)}
                  variant='ghost'
                  size='icon'
                  className='relative h-9 w-9 hover:bg-secondary transition cursor-pointer border rounded-full hidden md:flex'
                >
                  <Bell className='w-6 h-6' />
                  <span className='absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 text-[10px] font-bold bg-destructive text-white rounded-full px-1'>
                    {unreadCount.isLoading ? (
                      <Loader2 className='animate-spin w-1 h-' />
                    ) : (
                      count
                    )}
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='group flex items-center gap-3 h-12 px-2 hover:bg-secondary/50 rounded-xl transition-all outline-none'
                    >
                      <div className='relative'>
                        <Avatar className='h-9 w-9 border-2 border-primary/20 transition-transform group-hover:scale-105'>
                          <AvatarFallback className='bg-primary text-primary-foreground font-bold'>
                            {user?.fullname?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className='absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-background rounded-full' />
                      </div>

                      <div className='hidden md:flex flex-col items-start'>
                        <span className='text-sm font-bold leading-none'>
                          {user.fullname}
                        </span>
                        <span className='text-[10px] uppercase tracking-widest text-muted-foreground mt-1'>
                          {role}
                        </span>
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

                    <DropdownMenuSeparator className='my-2 md:hidden' />

                    <DropdownMenuItem
                      onClick={() => navigate(`/${role}/notification`)}
                      className='flex items-center gap-3 md:hidden h-11 rounded-xl'
                    >
                      <Bell size={18} />
                      <span className='font-medium'>Notifications</span>
                      <span className='ml-auto text-xs bg-destructive text-white px-2 py-0.5 rounded-full'>
                        {unreadCount.isLoading ? (
                          <Loader2 className='animate-spin w-1 h-' />
                        ) : (
                          count
                        )}
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className='my-2' />

                    <DropdownMenuGroup className='space-y-1'>
                      <Link to={`/${role}/dashboard`}>
                        <DropdownMenuItem className='h-11 rounded-xl cursor-pointer flex items-center gap-3 bg-primary/5 text-primary hover:bg-primary/10'>
                          <LayoutDashboard size={18} />
                          <span className='font-semibold'>
                            {t('navbar.dashboard')}
                          </span>
                        </DropdownMenuItem>
                      </Link>

                      <Link to={`/${role}`}>
                        <DropdownMenuItem className='h-11 rounded-xl cursor-pointer flex items-center gap-3 hover:bg-secondary'>
                          <Settings
                            size={18}
                            className='text-muted-foreground'
                          />
                          <span className='font-medium'>Account Settings</span>
                        </DropdownMenuItem>
                      </Link>
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

                    <DropdownMenuItem
                      className='h-11 rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer flex items-center gap-3'
                      onClick={() => setShowLogoutDialog(true)}
                    >
                      <LogOut size={18} />
                      <span className='font-bold'>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className='hidden md:flex items-center gap-2'>
                <Button variant='ghost' asChild className='font-semibold'>
                  <Link to='/farmer/login'>{t('auth.login.farmerTitle')}</Link>
                </Button>
                <Button
                  asChild
                  className='rounded-xl shadow-lg shadow-primary/20'
                >
                  <Link to='/buyer/login'>{t('auth.login.buyerTitle')}</Link>
                </Button>
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </div>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </nav>
  )
}

export default Navbar
