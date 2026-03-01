import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '@/hooks/useDebounce'

const WishlistToolbar = () => {
  const [params, setParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(params.get('search') || '')

  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearch !== (params.get('search') || '')) {
      setParams(prev => {
        const newParams = new URLSearchParams(prev)
        if (debouncedSearch) {
          newParams.set('search', debouncedSearch)
        } else {
          newParams.delete('search')
        }
        newParams.set('page', '1')
        return newParams
      })
    }
  }, [debouncedSearch, params, setParams])

  const updateParam = (key, value) => {
    setParams(prev => {
      const newParams = new URLSearchParams(prev)
      if (value && value !== 'all') {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
      newParams.set('page', '1')
      return newParams
    })
  }

  return (
    <div className='flex flex-col gap-4 bg-card p-4 rounded-xl border border-border shadow-sm w-full'>
      <div className='flex flex-col sm:flex-row gap-3 justify-between items-center'>
        <div className='relative w-full sm:max-w-xs group'>
          {searchTerm && (
            <X
              className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors cursor-pointer'
              onClick={() => setSearchTerm('')}
            />
          )}
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
          <Input
            placeholder='Search products...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='pl-9 bg-background border-input focus-visible:ring-primary'
          />
        </div>

        <div className='flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0'>
          <Select
            value={params.get('itemType') || 'all'}
            onValueChange={val => updateParam('itemType', val)}
          >
            <SelectTrigger className='w-35 bg-background cursor-pointer'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Categories</SelectItem>
              <SelectItem value='harvested'>harvested</SelectItem>
              <SelectItem value='pre_harvested'>pre-harvested</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default WishlistToolbar
