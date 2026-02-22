import { Search } from 'lucide-react'
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
import { useFetchState } from '@/hooks/location.hook'

const Toolbar = () => {
  const [params, setParams] = useSearchParams()
  const { data: states = [], isLoading } = useFetchState()

  const [search, setSearch] = useState(params.get('search') || '')
  const debounceSearch = useDebounce(search)

  const isActive = params.get('isActive') || 'all'
  const selectedState = params.get('state') || 'all'

  useEffect(() => {
    const newParams = new URLSearchParams(params)

    if (debounceSearch) {
      newParams.set('search', debounceSearch)
    } else {
      newParams.delete('search')
    }

    setParams(newParams)
  }, [debounceSearch])

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
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card/80 backdrop-blur border px-3 py-2 rounded-xl shadow-sm sticky top-18 z-20'>
      <div className='relative w-full sm:w-64 md:w-72'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search...'
          className='pl-9 h-9 text-xs sm:text-sm bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/30'
        />
      </div>

      <div className='flex gap-2 md:items-center flex-col md:flex-row items-start w-full md:w-auto'>
        <Select
          value={
            isActive === 'true'
              ? 'active'
              : isActive === 'false'
              ? 'inactive'
              : 'all'
          }
          onValueChange={val => handleFilterChange('isActive', val)}
        >
          <SelectTrigger className='w-full md:w-40'>
            <SelectValue placeholder='Select Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={selectedState}
          onValueChange={val => handleFilterChange('state', val)}
        >
          <SelectTrigger className='w-full md:w-48'>
            <SelectValue placeholder='Select State' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='all'>All</SelectItem>
              {!isLoading &&
                states.map(state => (
                  <SelectItem value={state.name} key={state.id}>
                    {state.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Toolbar