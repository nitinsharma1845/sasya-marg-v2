import React from 'react'
import { ArrowLeft, Edit2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { createPrefetch } from '@/lib/prefetch'

const FarmlandHeader = ({ farmland, onEdit }) => {
  const navigate = useNavigate()
  const prefetchEdit = createPrefetch(() => import('./EditFarmlandSheet'))
  if (!farmland) return null

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='space-y-1'>
        <div className='flex items-center gap-3'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => navigate(-1)}
            className='-ml-2 text-muted-foreground hover:text-primary hover:bg-secondary dark:hover:bg-transparent cursor-pointer'
          >
            <ArrowLeft className='h-6 w-6' />
          </Button>

          <h1 className='text-3xl font-bold capitalize tracking-tight text-foreground'>
            {farmland.name}
          </h1>

          <Badge variant={farmland.isActive ? 'default' : 'destructive'}>
            {farmland.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        <div className='ml-10 flex items-center gap-2 text-muted-foreground'>
          <MapPin className='h-4 w-4 text-primary' />
          <span>
            {farmland.location.locality}, {farmland.location.district},{' '}
            {farmland.location.state}
          </span>
        </div>
      </div>

      <Button
        onClick={onEdit}
        onMouseEnter={prefetchEdit}
        onTouchStart={prefetchEdit}
        variant='outline'
        className='border-primary text-primary hover:bg-secondary hover:text-primary cursor-pointer'
      >
        <Edit2 className='mr-2 h-4 w-4' /> Edit Details
      </Button>
    </div>
  )
}

export default FarmlandHeader
