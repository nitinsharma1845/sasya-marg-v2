import React, { useEffect, useState } from 'react'
import {
  Search,
  FileText,
  CheckCircle2,
  LayoutGrid,
  Sprout,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SchemeCard from './components/SchemeCard'
import { useFetchFarmlands } from '@/hooks/farmer.hooks'
import { toast } from 'sonner'
import { useGetAllSchemes } from '@/hooks/scheme.hooks'
import { useDebounce } from '@/hooks/useDebounce'
import { Skeleton } from '@/components/ui/skeleton'

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
]

const GovernmentSchemesPage = () => {
  const [viewMode, setViewMode] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const search = useDebounce(searchTerm, 500)
  const [selectedFarmId, setSelectedFarmId] = useState('')
  const [filters, setFilters] = useState({
    page: 1,
    limit: 3,
    state: undefined
  })

  const apiParams = {
    ...filters,
    search: search || undefined
  }

  const { data: farmlandData } = useFetchFarmlands({ status: 'active' })
  const getScheme = useGetAllSchemes(apiParams)

  useEffect(() => {
    if (viewMode === 'eligible' && selectedFarmId) {
      setFilters(prev => ({
        ...prev,
        farmlandId: selectedFarmId,
        page: 1
      }))
    } else {
      setFilters(prev => {
        const { farmlandId, ...rest } = prev
        return { ...rest, page: 1 }
      })
    }
  }, [viewMode, selectedFarmId])

  useEffect(() => {
    setFilters(prev => ({ ...prev, page: 1 }))
  }, [search])

  const farmlands = farmlandData?.data?.farmland || []

  if (getScheme.isError) {
    toast.error('Failed to load schemes. Please try again.')
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value,
      page: 1
    }))
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedFarmId('')
    setFilters({
      page: 1,
      limit: 3,
      state: undefined
    })
  }

  const handlePageChange = newPage => {
    setFilters(prev => ({ ...prev, page: newPage }))
  }

  const responseData = getScheme.data?.data
  const schemes = responseData?.schemes || []
  const total = responseData?.pagination?.total || 0
  const totalPages = responseData?.pagination?.totalPages || 0
  const hasNextPage = filters.page < totalPages
  const hasPrevPage = filters.page > 1

  const SchemeSkeleton = () => (
    <div className='rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm'>
      <div className='flex justify-between items-start'>
        <Skeleton className='h-6 w-20 bg-secondary' />
        <Skeleton className='h-6 w-16 bg-secondary rounded-full' />
      </div>
      <Skeleton className='h-7 w-3/4 bg-secondary' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full bg-secondary' />
        <Skeleton className='h-4 w-5/6 bg-secondary' />
      </div>
      <div className='flex gap-2 pt-2'>
        <Skeleton className='h-10 flex-1 bg-secondary rounded-xl' />
        <Skeleton className='h-10 w-12 bg-secondary rounded-xl' />
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-background p-4 md:p-8 animate-in fade-in duration-500'>
      <div className='mx-auto container space-y-8'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border pb-6'>
          <div className='space-y-2'>
            <Badge className='bg-accent/10 text-accent-foreground border-accent/20 dark:bg-accent/80 px-3 py-1 mb-2'>
              Government Support
            </Badge>
            <h1 className='text-3xl md:text-4xl font-bold text-primary tracking-tight'>
              Schemes & Subsidies
            </h1>
            <p className='text-muted-foreground max-w-2xl text-lg'>
              Find financial aid, insurance, and equipment subsidies tailored
              for your farm.
            </p>
          </div>
          <div className='hidden md:flex items-center gap-3 text-right'>
            <div className='h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary'>
              <FileText className='h-6 w-6' />
            </div>
            <div>
              <p className='text-2xl font-bold text-foreground'>
                {getScheme.isLoading ? (
                  <Skeleton className='h-8 w-8 bg-secondary' />
                ) : (
                  total
                )}
              </p>
              <p className='text-xs font-medium text-muted-foreground uppercase'>
                Active Schemes
              </p>
            </div>
          </div>
        </div>

        <div className='sticky top-2 z-10 space-y-4'>
          <Tabs value={viewMode} onValueChange={setViewMode} className='w-full'>
            <TabsList className='grid w-full max-w-md grid-cols-2 bg-muted/50 p-1'>
              <TabsTrigger value='all' className='cursor-pointer'>
                <LayoutGrid className='mr-2 h-4 w-4' /> Browse All
              </TabsTrigger>
              <TabsTrigger value='eligible' className='cursor-pointer'>
                <CheckCircle2 className='mr-2 h-4 w-4' /> Check Eligibility
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='bg-background/80 backdrop-blur-md border border-border rounded-xl p-4 shadow-sm'>
            <div className='flex flex-col md:flex-row gap-4 justify-between'>
              {viewMode === 'all' ? (
                <>
                  <div className='relative w-full md:w-xl'>
                    <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    {searchTerm && (
                      <X
                        className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors cursor-pointer'
                        onClick={() => setSearchTerm('')}
                      />
                    )}
                    <Input
                      placeholder='Search schemes...'
                      className='pl-9 h-10'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className='flex items-center gap-2'>
                    <Select
                      value={filters.state}
                      onValueChange={val => handleFilterChange('state', val)}
                    >
                      <SelectTrigger className='w-full md:w-48 h-10 cursor-pointer'>
                        <SelectValue placeholder='Filter by State' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All States</SelectItem>
                        {INDIAN_STATES.map(st => (
                          <SelectItem key={st} value={st}>
                            {st}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {filters.state && (
                      <Button
                        variant='ghost'
                        onClick={clearAllFilters}
                        className='cursor-pointer h-10'
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className='w-full flex items-center gap-4'>
                  <div className='h-10 w-10 shrink-0 rounded-full bg-accent/20 flex items-center justify-center'>
                    <Sprout className='h-5 w-5' />
                  </div>
                  <Select
                    value={selectedFarmId}
                    onValueChange={setSelectedFarmId}
                  >
                    <SelectTrigger className='w-full md:max-w-md h-10 cursor-pointer'>
                      <SelectValue placeholder='Select a Farmland...' />
                    </SelectTrigger>
                    <SelectContent>
                      {farmlands.map(farm => (
                        <SelectItem key={farm._id} value={farm._id}>
                          {farm.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {getScheme.isLoading
            ? Array.from({ length: filters.limit }).map((_, i) => (
                <SchemeSkeleton key={i} />
              ))
            : schemes.map(scheme => (
                <SchemeCard key={scheme._id} scheme={scheme} />
              ))}
        </div>

        {!getScheme.isLoading && schemes.length > 0 && (
          <div className='flex items-center justify-between border-t border-border pt-6 mt-6'>
            <div className='text-sm text-muted-foreground'>
              Page{' '}
              <span className='font-medium text-foreground'>
                {filters.page}
              </span>{' '}
              of{' '}
              <span className='font-medium text-foreground'>{totalPages}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='secondary'
                size='sm'
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={!hasPrevPage}
                className='cursor-pointer'
              >
                <ChevronLeft className='h-4 w-4 mr-1' /> Prev
              </Button>
              <Button
                variant='secondary'
                size='sm'
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={!hasNextPage}
                className='cursor-pointer'
              >
                Next <ChevronRight className='h-4 w-4 ml-1' />
              </Button>
            </div>
          </div>
        )}

        {!getScheme.isLoading && schemes.length === 0 && (
          <div className='flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border rounded-2xl bg-muted/5'>
            <div className='h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4'>
              <Search className='h-8 w-8 text-muted-foreground' />
            </div>
            <h3 className='text-xl font-bold text-foreground'>
              {viewMode === 'eligible' && !selectedFarmId
                ? 'Select a Farmland to see eligible schemes'
                : 'No Schemes Found'}
            </h3>
            <p className='text-muted-foreground mt-2 max-w-sm'>
              Adjust your search or filters to find government subsidies and aid
              programs.
            </p>
            {(filters.state || searchTerm) && (
              <Button
                variant='link'
                className='mt-4 text-primary font-bold cursor-pointer'
                onClick={clearAllFilters}
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default GovernmentSchemesPage
