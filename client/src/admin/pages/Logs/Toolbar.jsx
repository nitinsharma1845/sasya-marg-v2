import { Search, X, Calendar as CalendarIcon, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

const Toolbar = () => {
  const [params, setParams] = useSearchParams()

  const [search, setSearch] = useState(params.get('search') || '')
  const debounceSearch = useDebounce(search)

  const role = params.get('role') || undefined
  const action = params.get('action') || undefined
  const startDateParam = params.get('startDate')
  const endDateParam = params.get('endDate')

  const [startDate, setStartDate] = useState(
    startDateParam ? new Date(startDateParam) : undefined
  )
  const [endDate, setEndDate] = useState(
    endDateParam ? new Date(endDateParam) : undefined
  )

  const isFilterActive = useMemo(() => {
    return !!(search || role || action || startDate || endDate)
  }, [search, role, action, startDate, endDate])

  useEffect(() => {
    const newParams = new URLSearchParams(params)
    if (debounceSearch) {
      newParams.set('search', debounceSearch)
      newParams.set('page', '1')
    } else {
      newParams.delete('search')
    }
    setParams(newParams)
  }, [debounceSearch])

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(params)
    newParams.set('page', '1')

    if (value === 'all') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setParams(newParams)
  }

  const handleStartDateChange = date => {
    const newParams = new URLSearchParams(params)
    newParams.set('page', '1')
    setStartDate(date)

    if (date) {
      const start = new Date(date.setHours(0, 0, 0, 0))
      newParams.set('startDate', start.toISOString())
    } else {
      newParams.delete('startDate')
    }
    setParams(newParams)
  }

  const handleEndDateChange = date => {
    const newParams = new URLSearchParams(params)
    newParams.set('page', '1')
    setEndDate(date)

    if (date) {
      const end = new Date(date.setHours(23, 59, 59, 999))
      newParams.set('endDate', end.toISOString())
    } else {
      newParams.delete('endDate')
    }
    setParams(newParams)
  }

  const handleClearFilters = () => {
    setSearch('')
    setStartDate(undefined)
    setEndDate(undefined)
    const newParams = new URLSearchParams()
    newParams.set('page', '1')
    setParams(newParams)
  }

  return (
    <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/80 backdrop-blur border border-border px-4 py-3 rounded-xl shadow-sm sticky top-18 z-20 mb-10'>
      <div className='relative w-full lg:w-72'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search...'
          className='pl-9 h-10 bg-muted/30 border-border focus-visible:ring-1 focus-visible:ring-primary/30'
        />
        {search && (
          <X
            className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground'
            onClick={() => setSearch('')}
          />
        )}
      </div>

      <div className='flex flex-wrap items-center gap-2 w-full lg:w-auto'>
        <Select
          value={role}
          onValueChange={val => handleFilterChange('role', val)}
        >
          <SelectTrigger className='h-10 w-full sm:w-33 bg-background border-border shadow-none'>
            <SelectValue placeholder='Role' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Roles</SelectItem>
            <SelectItem value='farmer'>Farmer</SelectItem>
            <SelectItem value='buyer'>Buyer</SelectItem>
            <SelectItem value='admin'>Admin</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={action}
          onValueChange={val => handleFilterChange('action', val)}
        >
          <SelectTrigger className='h-10 w-full sm:w-45 bg-background border-border shadow-none'>
            <SelectValue placeholder='Action' />
          </SelectTrigger>
          <SelectContent className='max-h-75'>
            <SelectItem value='all'>All Actions</SelectItem>
            <SelectItem value='ACCOUNT_CREATED'>Account Created</SelectItem>
            <SelectItem value='LOGIN'>Login</SelectItem>
            <SelectItem value='LOGOUT'>Logout</SelectItem>
            <SelectItem value='UPDATE_PROFILE'>Update Profile</SelectItem>
            <SelectItem value='UPDATE_ADDRESS'>Update Address</SelectItem>
            <SelectItem value='FORGOT_PASSWORD'>Forgot Password</SelectItem>
            <SelectItem value='RESET_PASSWORD'>Reset Password</SelectItem>
            <SelectItem value='MODERATION'>Moderation</SelectItem>
            <SelectItem value='FARMLAND_CREATED'>Farmland Created</SelectItem>
            <SelectItem value='FARMLAND_UPDATED'>Farmland Updated</SelectItem>
            <SelectItem value='LISTING_CREATED'>Listing Created</SelectItem>
            <SelectItem value='LISTING_UPDATED'>Listing Updated</SelectItem>
            <SelectItem value='RESPONSE'>Response</SelectItem>
            <SelectItem value='REPORT_POSTED'>Report Posted</SelectItem>
            <SelectItem value='QUERY_RAISED'>Query Raised</SelectItem>
            <SelectItem value='QUERY_UPDATED'>Query Updated</SelectItem>
            <SelectItem value='QUERY_CLOSED'>Query Closed</SelectItem>
            <SelectItem value='CROP_SUGGESTION'>Crop Suggestion</SelectItem>
            <SelectItem value='CHANGE_CONTACT_VISIBILITY'>
              Contact Visibility
            </SelectItem>
            <SelectItem value='SCHEME_CREATED'>Scheme Created</SelectItem>
            <SelectItem value='SCHEME_UPDATED'>Scheme Updated</SelectItem>
          </SelectContent>
        </Select>

        <div className='flex items-center gap-2 w-full sm:w-auto'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='h-10 flex-1 sm:w-35 justify-start text-left font-normal bg-background border-border'
              >
                <CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
                <span className='truncate text-xs'>
                  {startDate ? format(startDate, 'dd MMM yyyy') : 'Start Date'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={startDate}
                onSelect={handleStartDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='h-10 flex-1 sm:w-35 justify-start text-left font-normal bg-background border-border'
              >
                <CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
                <span className='truncate text-xs'>
                  {endDate ? format(endDate, 'dd MMM yyyy') : 'End Date'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={endDate}
                onSelect={handleEndDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {isFilterActive && (
          <Button
            variant='ghost'
            onClick={handleClearFilters}
            className='h-10 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2'
          >
            <RotateCcw className='h-4 w-4' />
            <span className='hidden xl:inline'>Reset</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default Toolbar
