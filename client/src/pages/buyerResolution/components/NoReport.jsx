import React from 'react'
import { FileText } from 'lucide-react'

const EmptyReports = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center border border-dashed border-border rounded-lg bg-muted/30 min-h-80'>
      <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3'>
        <FileText className='w-6 h-6 text-muted-foreground' />
      </div>

      <h3 className='text-base font-semibold text-foreground'>
        No reports found
      </h3>

      <p className='text-sm text-muted-foreground mt-1 max-w-xs'>
        You haven't submitted any reports yet, or no reports match the
        selected filters.
      </p>
    </div>
  )
}

export default EmptyReports
