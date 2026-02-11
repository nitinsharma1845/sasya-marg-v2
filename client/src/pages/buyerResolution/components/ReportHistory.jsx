import { useGetReports } from '@/hooks/productReport.hooks'
import ReportCard from './ReportCard'
import ReportPagination from './ReportPagination'
import { useSearchParams } from 'react-router-dom'
import CardSkeleton from './CardSkeleton'
import EmptyReports from './NoReport'

const ReportHistory = () => {
  const [params] = useSearchParams()
  const { data, isLoading, isError, isFetching } = useGetReports(params)

  const reports = data?.data?.reports || []

  return (
    <div className='flex flex-col min-h-screen bg-background p-1'>
      <div>
        <h2 className='text-2xl font-bold text-foreground mb-1 tracking-tight'>
          My Reports
        </h2>
        <p className='text-sm text-muted-foreground'>
          Track the status and details of issues you have raised.
        </p>
      </div>

      <div className='space-y-4 mt-10'>
        {isLoading || isFetching ? (
          <CardSkeleton count={2} />
        ) : reports?.length > 0 ? (
          reports?.map(report => (
            <ReportCard key={report._id} report={report} />
          ))
        ) : (
          <EmptyReports />
        )}
      </div>
      {!isLoading && !isError && (
        <ReportPagination pagination={data?.data?.pagination} />
      )}
    </div>
  )
}

export default ReportHistory
