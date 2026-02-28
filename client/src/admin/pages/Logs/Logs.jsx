import React, { useState } from 'react'
import { useGetLogs } from '@/admin/hooks/superAdmin.hooks'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Terminal,
  ArrowRightCircle,
  Clock,
  Copy,
  Check,
  Globe,
  Database,
  Activity,
  SearchX
} from 'lucide-react'
import { format } from 'date-fns'
import PaginationComp from '@/admin/components/Pagination'
import Toolbar from './Toolbar'

const Logs = () => {
  const { data, isLoading } = useGetLogs()
  const [selectedLog, setSelectedLog] = useState(null)
  const [copied, setCopied] = useState(false)

  const logs = data?.data?.logs || []
  const pagination = data?.data?.pagination || {}

  const copyToClipboard = text => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderMetadata = obj => {
    return Object.entries(obj).map(([key, value]) => (
      <div
        key={key}
        className='grid grid-cols-3 gap-4 py-2 border-b border-border/50 last:border-0'
      >
        <span className='text-xs font-mono text-muted-foreground uppercase tracking-wider'>
          {key}
        </span>
        <div className='col-span-2 text-sm font-medium break-all text-foreground'>
          {typeof value === 'object' && value !== null ? (
            <pre className='bg-muted p-2 rounded text-[11px] overflow-x-auto border border-border/50 mt-1'>
              {JSON.stringify(value, null, 2)}
            </pre>
          ) : (
            String(value)
          )}
        </div>
      </div>
    ))
  }

  const getActionColor = action => {
    switch (action) {
      case 'LOGIN':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'CROP_SUGGESTION':
        return 'bg-chart-2/10 text-chart-2 border-chart-2/20'
      case 'FARMLAND_CREATED':
        return 'bg-chart-5/10 text-chart-5 border-chart-5/20'
      case 'LISTING_UPDATED':
        return 'bg-accent/20 text-accent-foreground border-accent/30'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }

  return (
    <div className='p-6 space-y-6 bg-background min-h-screen text-foreground'>
      <header className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight flex items-center gap-2'>
            <Terminal className='w-8 h-8 text-primary' />
            System Audit Logs
          </h1>
          <p className='text-muted-foreground mt-1'>
            Monitor real-time activities and system events across the SasyaMarg
            platform.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Badge
            variant='secondary'
            className='h-10 px-4 py-2 flex items-center gap-2 bg-secondary/50 text-secondary-foreground border border-border shadow-sm'
          >
            <Activity className='w-4 h-4' />
            {pagination?.total || 0} Total Logs
          </Badge>
        </div>
      </header>

      <Toolbar />

      <Card className='border-border bg-card shadow-sm overflow-hidden'>
        <CardHeader className='bg-secondary/30 border-b border-border py-4 px-6'>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-lg'>Activity Stream</CardTitle>
              <CardDescription>
                Detailed trail of user interactions and API triggers.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow className='border-border hover:bg-transparent'>
                <TableHead className='w-48 font-semibold text-foreground'>
                  Timestamp
                </TableHead>
                <TableHead className='font-semibold text-foreground'>
                  User & Role
                </TableHead>
                <TableHead className='font-semibold text-foreground'>
                  Action
                </TableHead>
                <TableHead className='font-semibold text-foreground'>
                  Event Message
                </TableHead>
                <TableHead className='text-right font-semibold text-foreground pr-6'>
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(8)].map((_, i) => (
                  <TableRow key={i} className='border-border'>
                    <TableCell>
                      <Skeleton className='h-8 w-full bg-secondary/40' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-8 w-full bg-secondary/40' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-8 w-24 bg-secondary/40' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-8 w-full bg-secondary/40' />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Skeleton className='h-8 w-20 ml-auto bg-secondary/40' />
                    </TableCell>
                  </TableRow>
                ))
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='h-64 text-center'>
                    <div className='flex flex-col items-center justify-center space-y-3'>
                      <div className='p-4 bg-secondary/20 rounded-full'>
                        <SearchX className='w-10 h-10 text-muted-foreground' />
                      </div>
                      <div className='space-y-1'>
                        <p className='text-lg font-semibold text-foreground'>
                          No logs found
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Try adjusting your filters or search terms.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                logs.map(log => (
                  <TableRow
                    key={log._id}
                    className='border-border transition-colors hover:bg-secondary/30'
                  >
                    <TableCell className='font-medium'>
                      <div className='flex flex-col text-xs'>
                        <span className='flex items-center gap-1.5 font-bold text-foreground'>
                          <Clock className='w-3 h-3 text-primary' />
                          {format(new Date(log.createdAt), 'MMM dd, yyyy')}
                        </span>
                        <span className='text-muted-foreground pl-4'>
                          {format(new Date(log.createdAt), 'HH:mm:ss a')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='flex flex-col'>
                          <span className='text-sm font-semibold truncate max-w-38'>
                            {log.metadata?.fullname || 'System'}
                          </span>
                          <Badge
                            variant='outline'
                            className='text-[10px] w-fit px-1 py-0 uppercase bg-background text-muted-foreground'
                          >
                            {log.role}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getActionColor(
                          log.action
                        )} border font-mono text-[10px] tracking-tight`}
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-sm text-foreground/80 max-w-75 leading-snug'>
                      {log.message}
                    </TableCell>
                    <TableCell className='text-right pr-6'>
                      <button
                        onClick={() => setSelectedLog(log)}
                        className='inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-all'
                      >
                        Show JSON <ArrowRightCircle className='w-4 h-4' />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className='max-w-2xl bg-card border-border p-0 overflow-hidden flex flex-col max-h-[85vh] shadow-2xl'>
          <DialogHeader className='p-6 border-b border-border bg-secondary/10'>
            <div className='flex justify-between items-start w-full pr-6'>
              <div>
                <DialogTitle className='text-xl flex items-center gap-2 text-primary'>
                  Full Log Details
                  <Badge
                    variant='outline'
                    className='font-mono text-[10px] uppercase bg-primary/5 text-primary border-primary/20'
                  >
                    {selectedLog?.action}
                  </Badge>
                </DialogTitle>
                <DialogDescription className='font-mono text-[10px] mt-1 text-muted-foreground'>
                  REFERENCE ID: {selectedLog?._id}
                </DialogDescription>
              </div>
              <button
                onClick={() => copyToClipboard(selectedLog)}
                className='p-2 hover:bg-primary/10 hover:text-primary rounded-md border border-border transition-colors'
                title='Copy JSON'
              >
                {copied ? (
                  <Check className='w-4 h-4 text-primary' />
                ) : (
                  <Copy className='w-4 h-4' />
                )}
              </button>
            </div>
          </DialogHeader>

          <div className='overflow-y-auto p-6 space-y-6'>
            <section>
              <h4 className='text-xs font-bold text-primary uppercase mb-3 flex items-center gap-2 border-b border-primary/10 pb-1'>
                <Globe className='w-3.5 h-3.5' /> Source Information
              </h4>
              <div className='grid grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg border border-border'>
                <div>
                  <p className='text-[10px] text-muted-foreground uppercase font-bold tracking-wider'>
                    IP Address
                  </p>
                  <p className='text-sm font-mono font-medium text-foreground'>
                    {selectedLog?.ipAddress}
                  </p>
                </div>
                <div>
                  <p className='text-[10px] text-muted-foreground uppercase font-bold tracking-wider'>
                    User Agent
                  </p>
                  <p className='text-[10px] italic leading-tight text-foreground/80'>
                    {selectedLog?.userAgent}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h4 className='text-xs font-bold text-primary uppercase mb-3 flex items-center gap-2 border-b border-primary/10 pb-1'>
                <Database className='w-3.5 h-3.5' /> Event Metadata
              </h4>
              <div className='bg-background rounded-lg border border-border/50 overflow-hidden shadow-inner'>
                <div className='p-4'>
                  {selectedLog?.metadata ? (
                    renderMetadata(selectedLog.metadata)
                  ) : (
                    <p className='text-sm text-muted-foreground italic'>
                      No metadata available.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className='pb-2'>
              <h4 className='text-xs font-bold text-primary uppercase mb-2 flex items-center gap-2'>
                Raw API Object
              </h4>
              <pre className='text-[11px] bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-white/10 shadow-lg font-mono leading-relaxed'>
                {JSON.stringify(selectedLog, null, 2)}
              </pre>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {!isLoading && pagination && logs.length > 0 && (
        <PaginationComp pagination={pagination} />
      )}
    </div>
  )
}

export default Logs
