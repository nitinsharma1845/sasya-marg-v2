import { Link } from 'react-router-dom'
import {
  Menu,
  User,
  LogOut,
  LayoutDashboard,
  Loader2,
  Store,
  Tractor,
  HeartHandshake,
  Brain,
  BookMarked
} from 'lucide-react'
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

const DashboardHeader = () => {
  const { user, isAuthenticated, role } = useAuthStore()

  const farmerLinks = [
    { name: 'Scheme', href: '/farmer/schemes' },
    { name: 'Mandi', href: '/farmer/mandi' },
    { name: 'Farmland', href: '/farmer/farmland' },
    { name: 'Get-Suggestion', href: '/farmer/get-suggestion' },
    { name: 'Help & Support', href: '/farmer/support' }
  ]

  const buyerlinks = [
    { name: 'Harvested product', href: '/buyer/product/harvested' },
    { name: 'Pre-Harvested product', href: '/buyer/product/pre-harvested' },
    { name: 'Help & Support', href: '/buyer/product/disputes' },
    { name: 'Wishlist', href: '/buyer/wishlist' }
  ]

  return (
    <header className='h-16 bg-background border-b flex items-center justify-between px-10 md:px-23'>
      <h1 className='font-semibold text-xl'>Dashboard</h1>
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
                        Add Email
                      </Link>
                    )}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/${role}`}>
                <DropdownMenuItem className='focus:bg-secondary cursor-pointer focus:text-secondary-foreground'>
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>

              {role === 'farmer' &&
                farmerLinks.map(link => (
                  <Link to={link.href} key={link.name}>
                    <DropdownMenuItem className='focus:bg-secondary cursor-pointer focus:text-secondary-foreground'>
                      <Store className='mr-2 h-4 w-4' />
                      <span>{link.name}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}

              {role === 'buyer' &&
                buyerlinks.map(link => (
                  <Link to={link.href} key={link.name}>
                    <DropdownMenuItem className='focus:bg-secondary cursor-pointer focus:text-secondary-foreground'>
                      <span>{link.name}</span>
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
      </div>
    </header>
  )
}

export default DashboardHeader
