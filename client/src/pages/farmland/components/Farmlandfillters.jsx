import React from 'react'
import { Search, Sprout, Tractor, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const FarmlandFilter = ({
  searchTerm,
  onSearch,
  onFilterChange,
  currentFilter
}) => {
  return (
    <div className='w-full bg-card border border-border rounded-lg p-4 shadow-sm'>
      <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
        <div className='relative w-full md:max-w-md'>
          <div className='relative w-full md:w-lg'>
            <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            {searchTerm && (
              <X
                className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors cursor-pointer'
                onClick={() => onSearch('')}
              />
            )}
            <Input
              placeholder='Search schemes...'
              className='pl-9 h-10'
              value={searchTerm}
              onChange={e => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className='flex items-center gap-2 w-full md:w-auto bg-muted/50 p-1 rounded-lg border border-border/50'>
          <Button
            variant={currentFilter === 'active' ? 'default' : 'ghost'}
            onClick={() => onFilterChange('active')}
            className={`flex-1 md:w-32 h-9 text-sm font-medium transition-all duration-300 cursor-pointer ${
              currentFilter === 'active'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            <Sprout className='w-4 h-4 mr-2' />
            Active
          </Button>

          <Button
            variant={currentFilter === 'inactive' ? 'default' : 'ghost'}
            onClick={() => onFilterChange('inactive')}
            className={`flex-1 md:w-32 h-9 text-sm font-medium transition-all duration-300 cursor-pointer ${
              currentFilter === 'inactive'
                ? 'bg-destructive text-destructive-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            <Tractor className='w-4 h-4 mr-2' />
            Inactive
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FarmlandFilter
