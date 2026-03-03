import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Search, Filter, XCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/useDebounce'

const QueryToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    setSearchParams(params)
  }, [debouncedSearch])

  const handleSelectChange = (key, value) => {
    const params = new URLSearchParams(searchParams)
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.set('page', '1')
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSearchParams({})
  }

  const hasFilters =
    searchParams.get('search') ||
    searchParams.get('role') ||
    searchParams.get('status')

  return (
    <div className='bg-card border border-border p-5 rounded-(--radius) mb-6 shadow-sm'>
      <div className='flex flex-col xl:flex-row gap-5 items-center'>
        <div className='relative w-full xl:max-w-md'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by name, email or phone...'
            className='pl-10 bg-background border-border focus-visible:ring-primary h-11'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='flex flex-wrap items-center gap-4 w-full xl:w-auto'>
          <div className='h-8 w-px bg-border hidden xl:block mx-2' />

          <div className='flex items-center gap-2'>
            <Filter className='h-4 w-4 text-primary' />
            <span className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
              Filter By
            </span>
          </div>

          <Select
            value={searchParams.get('role') || 'all'}
            onValueChange={val => handleSelectChange('role', val)}
          >
            <SelectTrigger className='w-37 bg-background border-border h-11'>
              <SelectValue placeholder='Role' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Roles</SelectItem>
              <SelectItem value='farmer'>Farmer</SelectItem>
              <SelectItem value='buyer'>Buyer</SelectItem>
              <SelectItem value='guest'>Guest</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={searchParams.get('status') || 'all'}
            onValueChange={val => handleSelectChange('status', val)}
          >
            <SelectTrigger className='w-37 bg-background border-border h-11'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='resolved'>Resolved</SelectItem>
              <SelectItem value='in-progress'>in-progress</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant='ghost'
              size='sm'
              onClick={clearFilters}
              className='text-destructive hover:bg-destructive/10 gap-2 h-11 px-4 font-semibold'
            >
              <RotateCcw className='h-4 w-4' />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QueryToolbar
