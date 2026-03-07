import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Loader2,
  User,
  Tractor,
  ShieldCheck,
  ArrowRight,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

const GlobalSearch = () => {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const debouncedSearch = useDebounce(search, 400)
  const navigate = useNavigate()
  const { role } = useAuthStore()

  const { data, isFetching } = useQuery({
    queryKey: ['globalSearch', debouncedSearch],
    queryFn: async () => {
      const res = await api.get(
        role === 'admin' ? '/admin/search' : '/admin/super-admin/search',
        {
          params: { search: debouncedSearch }
        }
      )
      return res.data
    },
    enabled: debouncedSearch?.trim().length >= 2
  })

  const results = data?.data?.results || []

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getTypeStyles = type => {
    switch (type) {
      case 'farmer':
        return {
          icon: <Tractor size={14} />,
          class: 'bg-primary/10 text-primary border-primary/20',
          label: 'Farmer'
        }

      case 'buyer':
        return {
          icon: <User size={14} />,
          class: 'bg-blue-100 text-blue-700 border-blue-200',
          label: 'Buyer'
        }

      case 'scheme':
        return {
          icon: <ShieldCheck size={14} />,
          class: 'bg-accent/10 text-accent-foreground border-accent/20',
          label: 'Scheme'
        }

      case 'preHarvestListing':
        return {
          icon: <Tractor size={14} />,
          class: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
          label: 'Pre-Harvest'
        }

      case 'harvestedProduct':
        return {
          icon: <Tractor size={14} />,
          class: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
          label: 'Product'
        }

      case 'report':
        return {
          icon: <ShieldCheck size={14} />,
          class: 'bg-destructive/10 text-destructive border-destructive/20',
          label: 'Report'
        }

      case 'query':
        return {
          icon: <User size={14} />,
          class: 'bg-muted text-muted-foreground border-border',
          label: 'Query'
        }

      default:
        return {
          icon: <User size={14} />,
          class: 'bg-muted text-muted-foreground',
          label: 'Unknown'
        }
    }
  }

  const handleNavigate = (type, id) => {
    switch (type) {
      case 'farmer':
        navigate(
          role === 'admin'
            ? `/admin/dashboard/farmers/${id}`
            : `/super_admin/dashboard/farmers/${id}`
        )
        break

      case 'buyer':
        navigate(
          role === 'admin'
            ? `/admin/dashboard/buyers/${id}`
            : `/super_admin/dashboard/buyers/${id}`
        )
        break

      case 'scheme':
        navigate(`/admin/dashboard/schemes/${id}`)
        break

      case 'preHarvestListing':
        navigate(`/admin/dashboard/product/pre-harvest/${id}`)
        break

      case 'harvestedProduct':
        navigate(`/admin/dashboard/product/harvested/${id}`)
        break

      case 'report':
        navigate(`/admin/dashboard/reports/${id}`)
        break

      case 'query':
        navigate(`/admin/dashboard/queries/${id}`)
        break

      default:
        return
    }

    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className='relative w-full max-w-xl'>
      <div className='relative flex items-center'>
        <Search className='absolute left-3 text-muted-foreground' size={18} />
        <Input
          value={search}
          onFocus={() => setIsOpen(true)}
          onChange={e => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          type={'text'}
          className='pl-10 pr-10 py-6 text-base rounded-2xl border-border focus-visible:ring-primary shadow-sm'
          placeholder='Search names, emails, or phone numbers...'
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className='absolute right-3 p-1 hover:bg-muted rounded-full transition-colors'
          >
            <X size={16} className='text-muted-foreground' />
          </button>
        )}
      </div>

      {isOpen && debouncedSearch.length >= 2 && (
        <div className='absolute w-full mt-3 bg-card border border-border rounded-2xl shadow-2xl max-h-113 overflow-hidden z-100 animate-in fade-in zoom-in-95 duration-200'>
          <div className='p-3 border-b border-border bg-muted/30 flex justify-between items-center'>
            <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
              Search Results
            </span>
            {isFetching && (
              <Loader2 size={14} className='animate-spin text-primary' />
            )}
          </div>

          <div className='overflow-y-auto max-h-95 p-2'>
            {!isFetching && results.length === 0 ? (
              <div className='py-12 flex flex-col items-center justify-center text-center'>
                <div className='p-3 bg-muted rounded-full mb-3'>
                  <Search size={24} className='text-muted-foreground/50' />
                </div>
                <p className='text-sm font-medium'>No matches found</p>
                <p className='text-xs text-muted-foreground'>
                  Try searching for a different keyword
                </p>
              </div>
            ) : (
              results.map(item => {
                const styles = getTypeStyles(item.type)
                return (
                  <div
                    onClick={() => handleNavigate(item.type, item.id)}
                    key={item.id}
                    className='group flex items-center justify-between px-4 py-4 hover:bg-secondary/50 rounded-xl cursor-pointer transition-all duration-200 mb-1 border border-transparent hover:border-border'
                  >
                    <div className='flex items-center gap-4 min-w-0'>
                      <div
                        className={cn(
                          'p-2.5 rounded-lg border flex items-center justify-center shadow-sm',
                          styles.class
                        )}
                      >
                        {styles.icon}
                      </div>
                      <div className='flex flex-col min-w-0'>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-bold truncate group-hover:text-primary transition-colors'>
                            {item.title}
                          </span>
                          <Badge
                            variant='outline'
                            className={cn(
                              'text-[10px] h-4 px-1.5 uppercase font-bold tracking-tighter',
                              styles.class
                            )}
                          >
                            {styles.label}
                          </Badge>
                        </div>
                        <span className='text-xs text-muted-foreground truncate font-medium'>
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200'>
                      <ArrowRight size={16} className='text-primary' />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalSearch
