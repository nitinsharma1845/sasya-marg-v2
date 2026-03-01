import React, { useState } from 'react'
import { useFarmerDashboard } from '@/hooks/farmer.hooks'
import {
  StatsOverview,
  DetailedPredictionReport,
  FarmlandTable,
  HarvestActivityLog
} from './components/DashboardWidgets'
import {
  UserCircle,
  RefreshCcw,
  Mail,
  Phone,
  LayoutDashboard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLogoutFarmer } from '@/hooks/auth.hooks'
import { Link } from 'react-router-dom'
import LogoutButton from '@/components/common/LogoutButton'
import LogoutConfirmDialog from '@/components/common/LogoutDialog'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

const FarmerDashboardPage = () => {
  const getDashboard = useFarmerDashboard()
  const logout = useLogoutFarmer()
  const [isOpen, setIsOpen] = useState(false)

  const data = getDashboard?.data?.data
  const isLoading = getDashboard.isLoading || getDashboard.isRefetching
  const { profile = {}, stats = {}, farmlands = [], recent = {} } = data || {}

  const handleLogout = () => logout.mutate()

  return (
    <div className='min-h-screen text-foreground pb-12'>
      <div className='sticky top-0 z-30 w-full border-b border-border bg-card/80 backdrop-blur-md px-4 py-3 md:px-8'>
        <div className='container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-4 min-w-0 flex-1'>
            <div className='relative shrink-0'>
              <div className='h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm'>
                <UserCircle className='h-7 w-7' />
              </div>
            </div>
            <div className='min-w-0 flex-1'>
              <div className='flex items-center gap-2'>
                <h1 className='text-lg font-black tracking-tight text-foreground truncate'>
                  {isLoading ? (
                    <Skeleton className='h-5 w-32 bg-secondary' />
                  ) : (
                    profile.fullname || 'User'
                  )}
                </h1>
                {!isLoading && (
                  <Badge
                    variant='outline'
                    className='bg-primary/5 text-[10px] py-0 border-primary/20 text-primary uppercase font-bold shrink-0'
                  >
                    {profile.role || 'Farmer'}
                  </Badge>
                )}
              </div>
              <div className='flex items-center gap-3 text-xs text-muted-foreground mt-0.5 w-full'>
                <span className='flex items-center gap-1 shrink-0'>
                  <Phone className='h-3 w-3' />{' '}
                  {isLoading ? (
                    <Skeleton className='h-3 w-20 bg-secondary' />
                  ) : (
                    profile.phone || 'N/A'
                  )}
                </span>
                <span className='opacity-30 shrink-0'>|</span>
                <span className='flex items-center gap-1 truncate min-w-0'>
                  <Mail className='h-3 w-3 shrink-0' />
                  <span className='truncate'>
                    {isLoading ? (
                      <Skeleton className='h-3 w-32 bg-secondary' />
                    ) : (
                      profile.email || 'No Email'
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2 shrink-0'>
            <Button
              variant='secondary'
              size='sm'
              className='h-9 rounded-xl font-bold text-xs shadow-none border border-border'
              onClick={() => getDashboard.refetch()}
              disabled={isLoading}
            >
              <RefreshCcw
                className={`mr-2 h-3.5 w-3.5 ${
                  getDashboard.isFetching ? 'animate-spin' : ''
                }`}
              />{' '}
              Sync
            </Button>
            <LogoutButton
              className='cursor-pointer h-9 rounded-xl text-xs font-bold px-4'
              onClick={() => setIsOpen(true)}
              variant='destructive'
            />
            <LogoutConfirmDialog
              onClose={() => setIsOpen(false)}
              open={isOpen}
              onConfirm={handleLogout}
            />
          </div>
        </div>
      </div>

      <div className='p-4 md:p-8 max-w-400 mx-auto space-y-8 mt-4'>
        <StatsOverview stats={stats} isLoading={isLoading} />

        <div className='grid grid-cols-1 xl:grid-cols-12 gap-8 items-start'>
          <div className='xl:col-span-8 space-y-8'>
            <div className='flex items-center justify-between px-1'>
              <h2 className='text-xl font-black flex items-center gap-2 tracking-tight'>
                <LayoutDashboard className='h-5 w-5 text-primary' /> Active
                Advisory
              </h2>
              <Link
                to='/farmer/get-suggestion'
                className='text-xs font-bold text-primary hover:underline underline-offset-4 uppercase tracking-wider'
              >
                Get Suggestion
              </Link>
            </div>
            <DetailedPredictionReport
              predictions={recent.predictions || []}
              isLoading={isLoading}
            />
          </div>

          <div className='xl:col-span-4 flex flex-col gap-8'>
            <div className='space-y-4'>
              <h2 className='text-sm font-black uppercase tracking-[0.2em] text-muted-foreground px-1'>
                Infrastructure
              </h2>
              <FarmlandTable
                farmlands={farmlands || []}
                isLoading={isLoading}
              />
            </div>
            <div className='space-y-4'>
              <h2 className='text-sm font-black uppercase tracking-[0.2em] text-muted-foreground px-1'>
                Market Activity
              </h2>
              <HarvestActivityLog
                listings={recent.listings || []}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmerDashboardPage
