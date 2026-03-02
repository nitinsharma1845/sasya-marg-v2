import React from 'react'
import { Clock, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const QueryStats = ({ openCount, resolvedCount }) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Card className='border-l-4 border-l-accent bg-card shadow-sm'>
        <CardContent className='flex items-center gap-4 p-4'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg---accent/10 text-accent'>
            <Clock className='h-6 w-6' />
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>Pending</p>
            <h3 className='text-2xl font-bold text-foreground'>{openCount}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className='border-l-4 border-l-primary bg-card shadow-sm'>
        <CardContent className='flex items-center gap-4 p-4'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
            <CheckCircle2 className='h-6 w-6' />
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>
              Resolved
            </p>
            <h3 className='text-2xl font-bold text-foreground'>
              {resolvedCount}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QueryStats
