import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, Filter } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDebounce } from '@/hooks/useDebounce'

const ToolbarForFarmer = ({ type }) => {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('search') || '')
  const debounceSearch = useDebounce(search, 400)

  const statusKey = type === 'farmer' ? 'isActive' : 'isBlocked'

  const statusParam = params.get(statusKey)

  let tabValue = 'all'

  if (statusKey === 'isActive') {
    if (statusParam === 'true') tabValue = 'active'
    else if (statusParam === 'false') tabValue = 'inactive'
  }

  if (statusKey === 'isBlocked') {
    if (statusParam === 'false') tabValue = 'active'
    else if (statusParam === 'true') tabValue = 'inactive'
  }

  useEffect(() => {
    const newParams = new URLSearchParams(params)

    if (debounceSearch) {
      newParams.set('search', debounceSearch)
    } else {
      newParams.delete('search')
    }

    setParams(newParams, { replace: true })
  }, [debounceSearch, params])

  const handleTabChange = val => {
    const newParams = new URLSearchParams(params)

    if (val === 'all') {
      newParams.delete(statusKey)
    } else {
      const value =
        statusKey === 'isActive' ? val === 'active' : val !== 'active'

      newParams.set(statusKey, value.toString())
    }

    setParams(newParams)
  }

  return (
    <Card className='w-full my-2 border shadow-sm'>
      <CardContent className=''>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-3'>
          <div className='relative w-full sm:max-w-100'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Search...'
              className='pl-9 pr-8 h-9 text-sm rounded-md bg-muted/30 focus-visible:ring-1'
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-destructive transition-colors'
              >
                <X className='h-3.5 w-3.5 text-muted-foreground' />
              </button>
            )}
          </div>

          <div className='flex items-center gap-2 w-full sm:w-auto'>
            <div className='hidden lg:flex items-center text-[11px] font-semibold uppercase tracking-tight text-muted-foreground gap-1.5 mr-1'>
              <Filter className='h-3 w-3' />
              <span>Status</span>
            </div>

            <Tabs
              value={tabValue}
              onValueChange={handleTabChange}
              className='w-full sm:w-auto'
            >
              <TabsList className='h-8 p-0.5 bg-muted/50 w-full sm:w-auto'>
                <TabsTrigger
                  value='all'
                  className='h-7 text-xs px-3 data-[state=active]:shadow-sm'
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value='active'
                  className='h-7 text-xs px-3 data-[state=active]:shadow-sm'
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value='inactive'
                  className='h-7 text-xs px-3 data-[state=active]:shadow-sm'
                >
                  Inactive
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ToolbarForFarmer
