import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Sprout,
  FileText,
  LogOut,
  Menu,
  X,
  UsersRound,
  Flower2,
  CircleQuestionMark,
  MessageCircleWarning,
  UserRoundPen,
  UserStar,
  Contact,
  Settings,
  Moon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
          <div className='w-9 h-9 rounded-xl flex items-center justify-center shadow-lg bg-background'>
            <Logo />
          </div>
          <div>
            <span className='font-bold text-lg tracking-tight text-sidebar-foreground block leading-none'>
              Sasya Marg
            </span>
            <span className='text-[10px] text-primary font-bold uppercase tracking-widest mt-1 block'>
              Admin Panel
            </span>
          </div>
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
            <Logo className='w-8 h-8' />
            <span className='font-bold text-xl text-sidebar-foreground tracking-tight'>
              Sasya Marg
            </span>
          </div>
          <Button variant='ghost' size='icon' onClick={closeMobileMenu}>
            <X size={24} />
          </Button>
        </div>
        <div className='flex-1 min-h-0'>
          <SidebarContent onItemClick={closeMobileMenu} />
        </div>
      </aside>

      <div className='flex-1 flex flex-col min-w-0'>
        <header className='h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shrink-0'>
          <div className='flex items-center gap-4 flex-1'>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
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
                <p className='text-sm font-bold leading-none text-foreground'>
                  {user?.fullname || 'Admin User'}
                </p>
                <p className='text-[10px] text-muted-foreground mt-1 uppercase font-medium tracking-wider'>
                  {user?.role || 'Management'}
                </p>
              </div>
              <Avatar className='h-9 w-9 border-2 border-primary/10 shadow-sm'>
                <AvatarFallback className='text-sm font-bold bg-primary/10 text-primary uppercase'>
                  {user?.fullname?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className='p-4 md:p-8 flex-1 bg-muted/20'>
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
    <div className='flex flex-col h-full min-h-0'>
      <nav className='flex-1 px-4 space-y-1 pt-4 overflow-y-auto custom-scrollbar'>
        <div className='pb-2 px-3'>
          <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            Main Menu
          </p>
        </div>
        <NavItem
          to='/admin/dashboard'
          icon={<LayoutDashboard size={18} />}
          label='Overview'
          end
          onClick={onItemClick}
        />

        <div className='pt-4 pb-2 px-3'>
          <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            Users & Entities
          </p>
        </div>
        <NavItem
          to='/admin/dashboard/farmers'
          icon={<Users size={18} />}
          label='Farmers List'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/buyers'
          icon={<UsersRound size={18} />}
          label='Buyers List'
          onClick={onItemClick}
        />

        <div className='pt-4 pb-2 px-3'>
          <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            Products
          </p>
        </div>
        <NavItem
          to='/admin/dashboard/product/harvested'
          icon={<Sprout size={18} />}
          label='Harvested Stock'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/product/pre-harvest'
          icon={<Flower2 size={18} />}
          label='Pre-Harvest Deals'
          onClick={onItemClick}
        />

        <div className='pt-4 pb-2 px-3'>
          <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
            Support & Logs
          </p>
        </div>
        <NavItem
          to='/admin/dashboard/schemes'
          icon={<FileText size={18} />}
          label='Govt Schemes'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/queries'
          icon={<CircleQuestionMark size={18} />}
          label='User Queries'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/reports'
          icon={<MessageCircleWarning size={18} />}
          label='Incident Reports'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/contacts'
          icon={<Contact size={18} />}
          label='Contact Leads'
          onClick={onItemClick}
        />
        <NavItem
          to='/admin/dashboard/subscribers'
          icon={<UserStar size={18} />}
          label='Newsletter'
          onClick={onItemClick}
        />
      </nav>

      <div className='p-4 border-t border-sidebar-border/50 shrink-0 bg-sidebar/50 space-y-1'>
        <NavItem
          to='/admin/dashboard/profile'
          icon={<UserRoundPen size={18} />}
          label='My Profile'
          onClick={onItemClick}
        />

        <div className='flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent/5 transition-colors'>
          <div className='flex items-center gap-3 text-sidebar-foreground/70'>
            <Moon size={18} />
            <span className='text-sm font-medium'>Dark Mode</span>
          </div>
          <ThemeToggle />
        </div>

        <Button
          onClick={() => setOpen(true)}
          variant='ghost'
          className='w-full justify-start gap-3 text-destructive hover:bg-destructive/10 cursor-pointer h-10 px-3 mt-2'
        >
          <LogOut size={18} />
          <span className='text-sm font-bold uppercase tracking-tight'>
            Logout
          </span>
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
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
        ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-semibold scale-[1.02]'
            : 'text-sidebar-foreground/60 hover:bg-accent/10 hover:text-sidebar-foreground'
        }
      `}
    >
      {icon}
      <span className='text-sm tracking-tight'>{label}</span>
    </NavLink>
  )
}
