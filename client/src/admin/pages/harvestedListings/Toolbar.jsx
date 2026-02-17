import { Search, BadgeAlert, BadgeCheck, BadgeX } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams } from 'react-router-dom'

const Toolbar = () => {
  const [params, setParams] = useSearchParams()

  const tabValue = params.get('moderation') || 'pending'

  const handleChange = (val) => {
    const newParams = new URLSearchParams(params)

    if (val === 'pending') {
      newParams.set('moderation', 'pending')
    } else {
      newParams.set('moderation', val)
    }

    setParams(newParams, { replace: true })
  }

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card/80 backdrop-blur border px-3 py-2 rounded-xl shadow-sm sticky top-18 z-20'>
      
      <Tabs
        value={tabValue}
        onValueChange={handleChange}
        className='w-full sm:w-auto'
      >
        <TabsList className='h-9 p-1 bg-muted/40 grid grid-cols-3 sm:flex w-full'>
          <TabsTrigger
            value='pending'
            className='text-xs sm:text-sm px-3 py-1.5 gap-1'
          >
            <BadgeAlert className='w-3.5 h-3.5' />
            <span className='hidden sm:inline'>Pending</span>
          </TabsTrigger>

          <TabsTrigger
            value='approved'
            className='text-xs sm:text-sm px-3 py-1.5 gap-1'
          >
            <BadgeCheck className='w-3.5 h-3.5' />
            <span className='hidden sm:inline'>Approved</span>
          </TabsTrigger>

          <TabsTrigger
            value='rejected'
            className='text-xs sm:text-sm px-3 py-1.5 gap-1'
          >
            <BadgeX className='w-3.5 h-3.5' />
            <span className='hidden sm:inline'>Rejected</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className='relative w-full sm:w-64 md:w-72'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
        <Input
          placeholder='Search...'
          className='pl-9 h-9 text-xs sm:text-sm bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/30'
        />
      </div>

    </div>
  )
}

export default Toolbar
