const ReportHistory = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-semibold mb-1'>My Reports</h2>
        <p className='text-sm text-muted-foreground'>
          Track the status of issues you have raised.
        </p>
      </div>

      <div className='border border-border rounded-md divide-y divide-border'>

        <div className='p-4 flex items-center justify-between'>
          <div>
            <p className='font-medium text-sm'>
              Report: Fake Listing - Tomatoes
            </p>
            <p className='text-xs text-muted-foreground'>
              ID: #RPT-8823 • Submitted on Oct 12, 2024
            </p>
          </div>
          <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200'>
            Under Review
          </span>
        </div>

        <div className='p-4 flex items-center justify-between'>
          <div>
            <p className='font-medium text-sm'>
              Report: Abusive User - John Doe
            </p>
            <p className='text-xs text-muted-foreground'>
              ID: #RPT-7712 • Submitted on Sept 28, 2024
            </p>
          </div>
          <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 hover:bg-green-200'>
            Resolved (User Banned)
          </span>
        </div>
      </div>
    </div>
  )
}

export default ReportHistory
