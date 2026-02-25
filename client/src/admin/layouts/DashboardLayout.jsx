import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Sprout,
  CloudSun,
  FileText,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  X,
  UsersRound,
  Flower2,
  CircleQuestionMark
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Outlet, NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import ThemeToggle from '@/components/common/ThemeToggle'
import LogoutConfirmDialog from '@/components/common/LogoutDialog'
import { useLogoutAdmin } from '../hooks/auth.hooks'
import Logo from '@/components/common/Logo'
import GlobalSearch from '../components/GlobalSearch'

export default function AdminDashboardLayout () {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useAuthStore()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className='flex min-h-screen bg-background text-foreground'>
      <aside className='w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col sticky top-0 h-screen shrink-0'>
        <div className='p-6 flex items-center gap-3 shrink-0'>
          <div className='w-8 h-8 rounded-full flex items-center justify-center shadow-md'>
            <Logo />
          </div>
          <span className='font-bold text-xl tracking-tight text-sidebar-foreground'>
            Sasya Marg
          </span>
        </div>
        <SidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm md:hidden transition-opacity'
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
            <div className='w-8 h-8 rounded-full flex items-center justify-center shadow-md'>
              <Logo />
            </div>
            <span className='font-bold text-xl text-sidebar-foreground uppercase tracking-tight'>
              Sasya Marg
            </span>
          </div>
          <X
            className='cursor-pointer text-muted-foreground transition-colors hover:text-foreground'
            size={24}
            onClick={closeMobileMenu}
          />
        </div>
        <div className='flex-1 min-h-0'>
          <SidebarContent onItemClick={closeMobileMenu} />
        </div>
      </aside>

      <div className='flex-1 flex flex-col min-w-0'>
        <header className='h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shrink-0'>
          <div className='flex items-center gap-2 md:gap-4 flex-1'>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-sidebar-foreground'
              onClick={toggleMobileMenu}
            >
              <Menu />
            </Button>
            <div className='w-full max-w-md hidden sm:block'>
              <GlobalSearch />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
              <div className='text-right hidden sm:block'>
                <p className='text-sm font-semibold leading-none text-foreground'>
                  {user?.fullname || 'Admin User'}
                </p>
                <p className='text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter'>
                  {user?.role || 'Admin'}
                </p>
              </div>
              <Avatar className='h-9 w-9 border border-border shadow-sm'>
                <AvatarFallback className='text-sm font-bold bg-secondary text-primary'>
                  {user?.fullname?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className='h-8 w-px bg-border mx-1 md:mx-2 shrink-0'></div>
            <ThemeToggle />
          </div>
        </header>

        <main className='p-4 md:p-8 flex-1'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SidebarContent ({ onItemClick }) {
  const [open, setOpen] = useState(false)
  const logout = useLogoutAdmin()
  const handleLogout = () => {
    logout.mutate()
  }
  return (
    <div className='flex flex-col h-full'>
      <nav className='flex-1 px-4 space-y-1.5 pt-4 overflow-y-auto min-h-0 scrollbar-hide'>
        <NavItem
          to='/admin/dashboard'
          icon={<LayoutDashboard size={20} />}
          label='Overview'
          end
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/farmers'
          icon={<Users size={20} />}
          label='Farmers'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/buyers'
          icon={<UsersRound size={20} />}
          label='Buyers'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/product/harvested'
          icon={<Sprout size={20} />}
          label='Harvested'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/product/pre-harvest'
          icon={<Flower2 size={20} />}
          label='Pre-Harvest'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/schemes'
          icon={<FileText size={20} />}
          label='Schemes'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/queries'
          icon={<CircleQuestionMark size={20} />}
          label='Queries'
          onClick={onItemClick}
        />
        <div className='pt-4 mt-4 border-t border-sidebar-border/50'>
          <NavItem
            to='/admin/dashboard/settings'
            icon={<Settings size={20} />}
            label='Settings'
            onClick={onItemClick}
          />
        </div>
      </nav>

      <div className='p-4 border-t border-sidebar-border/50 shrink-0 bg-sidebar'>
        <Button
          onClick={() => setOpen(true)}
          variant='ghost'
          className='w-full justify-start gap-3 text-destructive hover:bg-destructive/10 cursor-pointer'
        >
          <LogOut size={20} />
          <span className='text-sm font-medium'>Logout</span>
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
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium'
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground'
        }
      `}
    >
      {icon}
      <span className='text-sm'>{label}</span>
    </NavLink>
  )
}
