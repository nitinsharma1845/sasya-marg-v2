import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'

const Toolbar = () => {
  const [params, setParams] = useSearchParams()

  const [search, setSearch] = useState(params.get('search') || '')
  const debounceSearch = useDebounce(search)

  const status = params.get('status') || undefined
  const priority = params.get('priority') || undefined
  const inquiry = params.get('inquiry') || undefined

  useEffect(() => {
    const newParams = new URLSearchParams(params)

    if (debounceSearch) {
      newParams.set('search', debounceSearch)
    } else {
      newParams.delete('search')
    }

    setParams(newParams)
  }, [debounceSearch, params, setParams])

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(params)

    if (value === 'all') {
      newParams.delete(key)
    } else if (key === 'isActive') {
      newParams.set(key, value === 'active' ? 'true' : 'false')
    } else {
      newParams.set(key, value)
    }

    setParams(newParams)
  }

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card/80 backdrop-blur border px-3 py-2 rounded-xl shadow-sm sticky top-18 z-10 mb-10'>
      <div className='relative w-full sm:w-64 md:w-72'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
        {search && (
          <X
            className='absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground'
            onClick={() => setSearch('')}
          />
        )}

        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search...'
          className='pl-9 h-9 text-xs sm:text-sm bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/30'
        />
      </div>

      <div className='flex gap-2 md:items-center flex-col md:flex-row items-start w-full md:w-auto'>
        <Select
          value={status}
          onValueChange={val => handleFilterChange('status', val)}
        >
          <SelectTrigger className='w-full md:w-40'>
            <SelectValue placeholder='Select Status' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='open'>Open</SelectItem>
            <SelectItem value='resolved'>Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priority}
          onValueChange={val => handleFilterChange('priority', val)}
        >
          <SelectTrigger className='w-full md:w-40'>
            <SelectValue placeholder='Select priority' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='low'>Low</SelectItem>
            <SelectItem value='medium'>Medium</SelectItem>
            <SelectItem value='high'>High</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={inquiry}
          onValueChange={val => handleFilterChange('inquiry', val)}
        >
          <SelectTrigger className='w-full md:w-40'>
            <SelectValue placeholder='Select Inquiry' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {[
              'crop',
              'product',
              'weather',
              'pricing',
              'technical',
              'account',
              'other'
            ].map(val => (
              <SelectItem key={val} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Toolbar
