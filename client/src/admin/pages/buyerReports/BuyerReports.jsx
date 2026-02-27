import { useGetAllReports } from '@/admin/hooks/reports.hooks'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Calendar,
  MessageSquare
} from 'lucide-react'
import PaginationComp from '@/admin/components/Pagination'
import { useNavigate } from 'react-router-dom'
import Toolbar from './Toolbar'


const BuyerReports = () => {
  const { data: response, isLoading } = useGetAllReports()
  const queries = response?.data?.reports || []
  const pagination = response?.data?.pagination || {}
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className='p-6 space-y-4 bg-background min-h-screen'>
        <Skeleton className='h-8 w-48 bg-muted' />
        {[1, 2, 3, 4].map(i => (
          <Skeleton
            key={i}
            className='h-32 w-full max-w-4xl rounded-lg bg-muted'
          />
        ))}
      </div>
    )
  }

  const getStatusStyle = status => {
    switch (status) {
      case 'open':
        return 'bg-primary text-primary-foreground'
      case 'reolved':
        return 'bg-secondary text-secondary-foreground'
      case 'closed':
        return 'bg-destructive text-destructive-foreground'
    }
  }
  return (
    <div className='p-6 min-h-screen bg-background'>
      <header className='mb-6'>
        <h1 className='text-2xl font-bold text-foreground'>Buyer Help Desk</h1>
        <p className='text-muted-foreground text-sm'>
          Review and help buyer with their questions & reports
        </p>
      </header>

      <Toolbar />

      <div className='flex flex-col gap-4 max-w-5xl'>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className='p-4 border-border bg-card space-y-3'>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-16' />
              </div>

              <Skeleton className='h-5 w-1/2' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-1/3' />
            </Card>
          ))
        ) : queries.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 bg-card border border-dashed border-border rounded-xl'>
            <p className='text-muted-foreground font-medium text-sm'>
              No new questions from Buyers today.
            </p>
          </div>
        ) : (
          queries.map(item => (
            <Card
              onClick={() => navigate(`${item._id}`)}
              className='p-4 cursor-pointer border-border hover:border-primary transition-all group bg-card'
            >
              <div className='flex justify-between items-start mb-2'>
                <Badge
                  className={`${getStatusStyle(
                    item.status
                  )} border-none text-[10px] px-2 py-0`}
                >
                  {item.status}
                </Badge>

                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                  <Calendar className='w-3 h-3' />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>

              <h3 className='font-semibold text-foreground group-hover:text-primary transition-colors'>
                {item.reason}
              </h3>

              <div className='flex items-center gap-2 text-muted-foreground mt-1'>
                <MessageSquare className='w-3.5 h-3.5 text-primary/60 shrink-0' />
                <p className='text-sm line-clamp-1'>
                  {item?.description || 'No description provided'}
                </p>
              </div>

              <p className='text-xs text-muted-foreground mt-2'>
                By {item.buyer?.fullname}
              </p>
            </Card>
          ))
        )}
      </div>

      {pagination && <PaginationComp pagination={pagination} />}
    </div>
  )
}

export default BuyerReports
