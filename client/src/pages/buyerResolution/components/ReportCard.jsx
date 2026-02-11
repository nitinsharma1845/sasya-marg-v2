import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { Calendar, Hash, MessageSquare, Clock } from 'lucide-react'

const ReportCard = ({ report }) => {
  const getStatusVariant = status => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'secondary'
      case 'reviewed':
        return 'default'
      case 'rejected':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <Card className='overflow-hidden transition-all hover:ring-1 hover:ring-ring/20'>
      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-4'>
        <div className='space-y-1.5'>
          <CardTitle className='text-lg font-bold capitalize leading-none'>
            {report.reason.replace(/_/g, ' ')}
          </CardTitle>
          <div className='flex items-center text-xs font-mono text-muted-foreground'>
            <Hash className='mr-1 h-3 w-3' />
            {report._id.slice(-8).toUpperCase()}
          </div>
        </div>
        <Badge
          variant={getStatusVariant(report.status)}
          className='rounded-md font-semibold px-2.5 py-0.5'
        >
          {report.status}
        </Badge>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='rounded-lg border bg-muted/30 p-4'>
          <div className='mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            <MessageSquare className='h-3.5 w-3.5' />
            Admin Remarks
          </div>
          <div className='text-sm leading-relaxed text-foreground/90'>
            {report?.adminRemark ? (
              report.adminRemark
            ) : (
              <span className='italic text-muted-foreground'>
                Pending administrative review...
              </span>
            )}
          </div>
        </div>

        <Separator className='bg-border/50' />

        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1.5'>
            <span className='text-[10px] font-bold uppercase text-muted-foreground'>
              Submitted On
            </span>
            <div className='flex items-center gap-2 text-xs font-medium'>
              <Calendar className='h-3.5 w-3.5 text-primary' />
              {format(new Date(report.createdAt), 'MMM dd, yyyy')}
            </div>
          </div>
          <div className='flex flex-col gap-1.5 text-right'>
            <span className='text-[10px] font-bold uppercase text-muted-foreground'>
              Last Activity
            </span>
            <div className='flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground'>
              <Clock className='h-3.5 w-3.5' />
              {format(new Date(report.updatedAt), 'MMM dd, yyyy')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReportCard
