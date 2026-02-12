import * as React from 'react'
import {
  ShieldCheck,
  Users,
  UserPlus,
  Sprout,
  ShoppingBag,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  X,
  FileBadge,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Outlet, NavLink } from 'react-router-dom'
import Logo from '@/components/common/Logo'
import { useAuthStore } from '@/store/useAuthStore'
import ThemeToggle from '@/components/common/ThemeToggle'
import { useLogoutAdmin } from '../hooks/auth.hooks'
import LogoutConfirmDialog from '@/components/common/LogoutDialog'

export default function SuperAdminLayout () {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { user } = useAuthStore()
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className='flex min-h-screen bg-background text-foreground'>
      <aside className='w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col sticky top-0 h-screen'>
        <div className='p-6 flex items-center gap-3 shrink-0'>
          <div className='w-10 h-10 rounded-full flex items-center justify-center shadow-lg'>
            <Logo />
          </div>
          <div>
            <span className='font-bold text-lg tracking-tight text-sidebar-foreground block leading-none'>
              Sasya Marg
            </span>
            <span className='text-[10px] text-accent font-bold uppercase tracking-widest'>
              Super Admin
            </span>
          </div>
        </div>
        <SuperSidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm md:hidden'
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border flex flex-col transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className='flex justify-between items-center p-6 border-b border-sidebar-border shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-accent rounded-lg flex items-center justify-center'>
              <ShieldCheck className='text-accent-foreground' size={18} />
            </div>
            <span className='font-bold text-xl text-sidebar-foreground'>
              Super Admin
            </span>
          </div>
          <X
            className='cursor-pointer text-muted-foreground'
            size={24}
            onClick={closeMobileMenu}
          />
        </div>
        <div className='flex-1 min-h-0'>
          <SuperSidebarContent onItemClick={closeMobileMenu} />
        </div>
      </aside>

      <div className='flex-1 flex flex-col min-w-0'>
        <header className='h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-20'>
          <div className='flex items-center gap-4 flex-1'>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-sidebar-foreground'
              onClick={toggleMobileMenu}
            >
              <Menu />
            </Button>

            <div className='relative w-full max-w-md hidden sm:block'>
              <Search className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search platform-wide...'
                className='pl-10 bg-muted/50 border-none focus-visible:ring-accent'
              />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              className='hidden lg:flex gap-2 border-accent/20 text-accent hover:bg-accent/10 h-9'
            >
              <UserPlus size={16} />
              <span>Invite Admin</span>
            </Button>
            <div className='h-8 w-px bg-border mx-1 md:mx-2'></div>
            <div className='flex items-center gap-3'>
              <div className='text-right hidden sm:block'>
                <p className='text-sm font-semibold leading-none text-foreground'>
                  {user?.fullname}
                </p>
                <p className='text-[10px] text-accent mt-1 uppercase font-bold'>
                  Full Access
                </p>
              </div>
              <Avatar className='h-10 w-10 border-2 border-accent shadow-sm'>
                <AvatarFallback
                  className={
                    'text-lg font-bold dark:bg-primary dark:text-primary-foreground bg-chart-5/20 cursor-pointer'
                  }
                >
                  {user.fullname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className='h-8 w-px bg-border mx-1 md:mx-2'></div>
            <ThemeToggle />
          </div>
        </header>

        <main className='p-4 md:p-8'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SuperSidebarContent ({ onItemClick }) {
  const [open, setOpen] = React.useState(false)
  const logout = useLogoutAdmin()
  const handleLogout = () => {
    logout.mutate()
  }
  return (
    <div className='flex flex-col h-full'>
      <nav className='flex-1 px-4 space-y-1.5 pt-4 overflow-y-auto min-h-0'>
        <NavItem
          to='/super_admin/dashboard'
          icon={<LayoutDashboard size={20} />}
          label='Global Overview'
          end
          onClick={onItemClick}
        />

        <div className='pt-4 pb-2'>
          <p className='text-[10px] font-bold text-muted-foreground uppercase px-3 tracking-widest'>
            Admin Control
          </p>
        </div>
        <NavItem
          to='/super_admin/admins'
          icon={<ShieldCheck size={20} />}
          label='Manage Admins'
          onClick={onItemClick}
        />
        <NavItem
          to='/super_admin/invites'
          icon={<UserPlus size={20} />}
          label='Admin Invites'
          onClick={onItemClick}
        />

        <div className='pt-4 pb-2'>
          <p className='text-[10px] font-bold text-muted-foreground uppercase px-3 tracking-widest'>
            Ecosystem
          </p>
        </div>
        <NavItem
          to='/super_admin/farmers'
          icon={<Sprout size={20} />}
          label='All Farmers'
          onClick={onItemClick}
        />
        <NavItem
          to='/super_admin/buyers'
          icon={<Users size={20} />}
          label='All Buyers'
          onClick={onItemClick}
        />
      </nav>

      <div className='p-4 border-t border-sidebar-border/50 shrink-0 bg-sidebar'>
        <Button
          onClick={() => setOpen(true)}
          variant='ghost'
          className='w-full justify-start gap-3 text-destructive hover:bg-destructive/10'
        >
          <LogOut size={20} />
          <span className='text-sm font-medium'>Terminate Session</span>
        </Button>
      </div>
      <LogoutConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  )
}

function NavItem ({ icon, label, to, end = false, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `
        w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200
        ${
          isActive
            ? 'bg-accent text-accent-foreground shadow-md font-medium'
            : 'text-sidebar-foreground/70 hover:bg-accent/10 hover:text-sidebar-foreground'
        }
      `}
    >
      {icon}
      <span className='text-sm'>{label}</span>
    </NavLink>
  )
}