import React, { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'react-router-dom'

const ReportPagination = ({ pagination }) => {
  const [params, setParams] = useSearchParams()
  const { total, totalPages } = pagination

  const page = Number(params.get('page')) || 1
  const limit = Number(params.get('limit')) || 2

  useEffect(() => {
    if (!params.get('page') || !params.get('limit')) {
      setParams(
        {
          ...Object.fromEntries(params),
          page,
          limit
        },
        { replace: true }
      )
    }
  }, [])

  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  const changePage = p => {
    setParams({
      ...Object.fromEntries(params),
      page: p,
      limit
    })
  }

  return (
    <div className='flex items-center justify-between border-t px-2 py-4 mt-8'>
      <div className='text-sm text-muted-foreground'>
        Showing <b>{start}</b> to <b>{end}</b> of <b>{total}</b> items
      </div>

      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
          className={"cursor-pointer"}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <Button variant='outline' size='sm'>
          {page}
        </Button>

        <Button
          variant='outline'
          size='icon'
          disabled={totalPages === 0 || page >= totalPages}
          onClick={() => changePage(page + 1)}
          className={"cursor-pointer"}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default ReportPagination
