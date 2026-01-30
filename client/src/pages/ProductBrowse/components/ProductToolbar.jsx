import React, { useState, useEffect } from 'react'
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Tag,
  IndianRupee
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '@/hooks/useDebounce'
import { useFetchDistrict, useFetchState } from '@/hooks/location.hook'

// const STATES = ['Uttar Pradesh', 'Maharashtra', 'Punjab', 'Madhya Pradesh']
const DISTRICTS = {
  'Uttar Pradesh': ['Agra', 'Mathura', 'Lucknow'],
  Maharashtra: ['Nashik', 'Pune', 'Nagpur'],
  Punjab: ['Ludhiana', 'Amritsar'],
  'Madhya Pradesh': ['Indore', 'Bhopal']
}
const GRADES = ['A', 'B', 'C', 'organic']

const ProductToolbar = () => {
  const [params, setParams] = useSearchParams()
  const [stateCode, setStateCode] = useState()
  const { data: state = [], isLoading: fetchingSates } = useFetchState()
  const { data: districts = [], isLoading: fetchingDistricts } =
    useFetchDistrict(stateCode)

  const [searchTerm, setSearchTerm] = useState(params.get('search') || '')
  const [minPrice, setMinPrice] = useState(params.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(params.get('maxPrice') || '')

  const [selectedState, setSelectedState] = useState(params.get('state') || '')
  const [selectedDistrict, setSelectedDistrict] = useState(
    params.get('district') || ''
  )

  const debouncedSearch = useDebounce(searchTerm, 500)

  const activeFiltersCount = Array.from(params.keys()).filter(
    key => !['page', 'sort', 'search', 'limit'].includes(key)
  ).length

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

  useEffect(() => {
    if (params.get('minPrice') !== minPrice)
      setMinPrice(params.get('minPrice') || '')
    if (params.get('maxPrice') !== maxPrice)
      setMaxPrice(params.get('maxPrice') || '')
    if (params.get('state') !== selectedState)
      setSelectedState(params.get('state') || '')
    if (params.get('district') !== selectedDistrict)
      setSelectedDistrict(params.get('district') || '')
  }, [params])

  const updateParam = (key, value) => {
    setParams(prev => {
      const newParams = new URLSearchParams(prev)
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
      newParams.set('page', '1')
      return newParams
    })
  }

  const applyAllFilters = () => {
    setParams(prev => {
      const newParams = new URLSearchParams(prev)

      if (minPrice) newParams.set('minPrice', minPrice)
      else newParams.delete('minPrice')

      if (maxPrice) newParams.set('maxPrice', maxPrice)
      else newParams.delete('maxPrice')

      // Apply Location
      if (selectedState) newParams.set('state', selectedState)
      else newParams.delete('state')

      if (selectedDistrict) newParams.set('district', selectedDistrict)
      else newParams.delete('district')

      newParams.set('page', '1')
      return newParams
    })
  }

  const clearFilters = () => {
    setParams(
      {
        page: '1',
        limit: '9'
      },
      { replace: true }
    )
  }


  return (
    <div className='flex flex-col gap-4 bg-card p-4 rounded-xl border border-border shadow-sm w-full'>
      <div className='flex flex-col sm:flex-row gap-3 justify-between items-center'>
        <div className='relative w-full sm:max-w-xs group'>
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
            value={params.get('category') || 'all'}
            onValueChange={val =>
              updateParam('category', val === 'all' ? '' : val)
            }
          >
            <SelectTrigger className='w-35 bg-background'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Categories</SelectItem>
              <SelectItem value='vegetable'>Vegetables</SelectItem>
              <SelectItem value='fruit'>Fruits</SelectItem>
              <SelectItem value='grain'>Grains</SelectItem>
              <SelectItem value='spice'>Spices</SelectItem>
              <SelectItem value='pulse'>Pulses</SelectItem>
              <SelectItem value='oilseed'>Oil Seed</SelectItem>
              <SelectItem value='other'>Other</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={params.get('sort') || 'newest'}
            onValueChange={val => updateParam('sort', val)}
          >
            <SelectTrigger className='w-35 bg-background'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='newest'>Newest First</SelectItem>
              <SelectItem value='price_asc'>Price: Low to High</SelectItem>
              <SelectItem value='price_desc'>Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Advanced Filters Button (Popover) */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' className='relative gap-2'>
                <SlidersHorizontal className='w-4 h-4' />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className='h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]'>
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-80 p-5' align='end'>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <h4 className='font-semibold'>Filters</h4>
                  <Button variant='ghost' size='sm' onClick={clearFilters}>
                    Clear all
                  </Button>
                </div>

                <Separator />

                <div className='space-y-2'>
                  <Label className='text-xs flex items-center gap-1'>
                    <MapPin className='w-3 h-3' /> Location
                  </Label>

                  <div className='flex items-center justify-between'>
                    <Select
                      value={selectedState}
                      onValueChange={val => {
                        const selected = state.find(s => s.name === val)
                        setStateCode(selected.code)
                        setSelectedState(val)
                        setSelectedDistrict('')
                      }}
                    >
                      <SelectTrigger className='h-8 text-xs'>
                        <SelectValue placeholder='State'>
                          {selectedState || 'State'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {!fetchingSates &&
                          state.map(s => (
                            <SelectItem key={s.id} value={s.name}>
                              {s.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    {/* District Selector */}
                    <Select
                      value={selectedDistrict}
                      disabled={!selectedState}
                      onValueChange={setSelectedDistrict}
                    >
                      <SelectTrigger className='h-8 text-xs'>
                        <SelectValue placeholder='District'>
                          {selectedDistrict || 'District'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {!fetchingDistricts &&
                          !fetchingSates &&
                          districts.map(d => (
                            <SelectItem key={d.id} value={d.name}>
                              {d.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label className='text-xs flex items-center gap-1'>
                    <IndianRupee className='w-3 h-3' /> Price Range
                  </Label>

                  <div className='flex items-center gap-2'>
                    <Input
                      type='number'
                      placeholder='Min'
                      className='h-8 text-xs'
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='Max'
                      className='h-8 text-xs'
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                    />
                  </div>

                  {/* Combined Apply Button */}
                  <Button
                    size='sm'
                    className='w-full h-7 text-xs'
                    onClick={applyAllFilters}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className='flex flex-wrap gap-2 pt-2 border-t border-border/50'>
          {Array.from(params.entries()).map(([key, value]) => {
            if (['page', 'sort', 'search', 'limit'].includes(key)) return null
            return (
              <Badge
                key={key}
                variant='secondary'
                className='gap-1 rounded-sm px-2 font-normal cursor-pointer'
                onClick={() => updateParam(key, '')}
              >
                <span className='opacity-60 capitalize'>{key}:</span> {value}
                <X className='w-3 h-3 cursor-pointer hover:text-destructive ml-1' />
              </Badge>
            )
          })}
          {searchTerm && (
            <Badge
              variant='secondary'
              className='gap-1 rounded-sm px-2 font-normal'
            >
              <span className='opacity-60'>Search:</span> {searchTerm}
              <X
                className='w-3 h-3 cursor-pointer hover:text-destructive ml-1'
                onClick={() => {
                  setSearchTerm('')
                  // Manually clear search param immediately on badge click
                  setParams(prev => {
                    const newParams = new URLSearchParams(prev)
                    newParams.delete('search')
                    return newParams
                  })
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductToolbar
