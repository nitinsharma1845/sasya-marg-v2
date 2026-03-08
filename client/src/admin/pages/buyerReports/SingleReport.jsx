import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleReport } from '@/admin/hooks/reports.hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
  MapPin,
  Fingerprint,
  Calendar,
  AlertTriangle,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react'
import { getOptimizedImg } from '@/lib/imageHelper'
import ReplyDialog from '../reports/ReplyDialog'

const QuerySkeleton = () => (
  <div className='p-8 max-w-6xl mx-auto space-y-8'>
    <div className='flex justify-between items-center'>
      <div className='space-y-3'>
        <Skeleton className='h-12 w-80 bg-secondary' />
        <Skeleton className='h-5 w-48 bg-secondary' />
      </div>
      <div className='flex gap-3'>
        <Skeleton className='h-10 w-28 rounded-full bg-secondary' />
      </div>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      <div className='space-y-6'>
        <Skeleton className='h-100 w-full rounded-lg bg-secondary' />
      </div>
      <div className='lg:col-span-2'>
        <Skeleton className='h-150 w-full rounded-lg bg-secondary' />
      </div>
    </div>
  </div>
)

const SingleReport = () => {
  const { id } = useParams()
  const { data: response, isLoading } = useGetSingleReport(id)

  if (isLoading) return <QuerySkeleton />

  const report = response?.data
  const buyer = report?.buyer

  const getStatusStyles = status => {
    const s = status?.toLowerCase()
    if (s === 'pending') return 'bg-accent/10 text-accent border-accent/20'
    if (s === 'resolved') return 'bg-primary/10 text-primary border-primary/20'
    return 'bg-muted text-muted-foreground border-border'
  }

  return (
    <div className='min-h-screen bg-background text-foreground p-6 lg:p-10'>
      <div className='max-w-6xl mx-auto space-y-8'>
        <header className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-[10px]'>
              <Fingerprint className='w-4 h-4' />
              Incident Verification
            </div>
            <h1 className='text-4xl font-extrabold tracking-tight'>
              {report?.reason || 'Report Detail'}
            </h1>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <span className='flex items-center gap-1.5 font-mono bg-muted px-2 py-0.5 rounded'>
                ID: {report?._id}
              </span>
              <span className='flex items-center gap-1.5'>
                <Calendar className='w-4 h-4' />
                {new Date(report?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Badge
              variant='outline'
              className={`px-5 py-1.5 text-xs font-bold rounded-full border-2 uppercase tracking-widest shadow-sm ${getStatusStyles(
                report?.status
              )}`}
            >
              {report?.status}
            </Badge>
          </div>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='space-y-6'>
            <Card className='border-border shadow-sm bg-card overflow-hidden'>
              <CardHeader className='pb-4 border-b border-border bg-muted/30'>
                <CardTitle className='text-base flex items-center gap-2.5'>
                  <div className='p-2 bg-primary text-primary-foreground rounded-lg'>
                    <User className='w-4 h-4' />
                  </div>
                  Buyer Dossier
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6 space-y-6'>
                <div className='flex flex-col'>
                  <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1'>
                    Full Identity
                  </span>
                  <span className='font-bold text-lg'>{buyer?.fullname}</span>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center gap-3 group'>
                    <div className='p-2 bg-secondary rounded-full transition-colors'>
                      <Mail className='w-4 h-4 text-primary' />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-[9px] font-bold text-muted-foreground uppercase'>
                        Email
                      </span>
                      <span className='text-sm font-medium'>
                        {buyer?.email}
                      </span>
                    </div>
                  </div>

                  <div className='flex items-center gap-3 group'>
                    <div className='p-2 bg-secondary rounded-full transition-colors'>
                      <Phone className='w-4 h-4 text-primary' />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-[9px] font-bold text-muted-foreground uppercase'>
                        Contact
                      </span>
                      <span className='text-sm font-medium'>
                        {buyer?.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className='opacity-50' />

                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-3.5 h-3.5 text-primary' />
                    <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
                      Location Details
                    </span>
                  </div>
                  <div className='bg-muted/50 p-4 rounded-lg border border-border text-sm leading-relaxed'>
                    <p className='font-bold text-primary mb-1'>
                      {buyer?.address?.label}
                    </p>
                    <p className='text-muted-foreground'>
                      {buyer?.address?.addressLine}
                    </p>
                    <p className='text-muted-foreground'>
                      {buyer?.address?.city}, {buyer?.address?.state} -{' '}
                      {buyer?.address?.pincode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className='p-5 rounded-lg bg-primary text-primary-foreground shadow-lg'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-primary-foreground/10 rounded-lg'>
                  <AlertTriangle className='w-5 h-5 text-accent' />
                </div>
                <div>
                  <p className='text-[10px] uppercase font-bold opacity-80'>
                    Category
                  </p>
                  <p className='text-xl font-bold tracking-tight'>
                    {report?.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-2 space-y-6'>
            <Card className='border-border shadow-sm bg-card'>
              <CardHeader className='pb-4 border-b border-border flex flex-row items-center justify-between bg-muted/10'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <MessageSquare className='w-4 h-4 text-primary' />
                    <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
                      Statement
                    </span>
                  </div>
                  <CardTitle className='text-xl'>Report Description</CardTitle>
                </div>
                <Badge
                  variant='secondary'
                  className='font-mono text-[10px] bg-secondary text-secondary-foreground'
                >
                  REF: {report?.refrence || 'N/A'}
                </Badge>
              </CardHeader>
              <CardContent className='pt-8 space-y-10'>
                <div className='relative'>
                  <div className='absolute -left-2 top-0 bottom-0 w-1 bg-accent rounded-full' />
                  <p className='text-lg leading-relaxed pl-6 whitespace-pre-wrap font-medium'>
                    {report?.description || 'No detailed description provided.'}
                  </p>
                </div>

                <Separator className='opacity-50' />

                <div className='space-y-6'>
                  <div className='flex items-center gap-2.5'>
                    <div className='h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center'>
                      <ImageIcon className='w-5 h-5 text-primary' />
                    </div>
                    <h3 className='font-bold text-xl'>Supporting Evidence</h3>
                  </div>

                  {report?.evidence?.length > 0 ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                      {report.evidence.map((img, index) => (
                        <div
                          key={index}
                          className='group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted'
                        >
                          <img
                            src={getOptimizedImg(img.url)}
                            alt={`Evidence ${index + 1}`}
                            className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
                          />
                          <a
                            href={img.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'
                          >
                            <ExternalLink className='text-white w-6 h-6' />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='bg-muted/30 border border-border rounded-lg p-8 text-center'>
                      <ImageIcon className='w-10 h-10 text-muted-foreground/40 mx-auto mb-3' />
                      <p className='text-muted-foreground text-sm font-medium'>
                        No visual evidence or attachments provided with this
                        report.
                      </p>
                    </div>
                  )}
                </div>

                <Separator className='opacity-50' />

                <div className='space-y-6'>
                  <div className='flex items-center gap-2.5'>
                    <div className='h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center'>
                      <ShieldCheck className='w-5 h-5 text-primary' />
                    </div>
                    <h3 className='font-bold text-xl'>Resolution & Response</h3>
                  </div>

                  {report?.adminRemark ? (
                    <div className='bg-secondary/50 border border-border p-6 rounded-lg space-y-4'>
                      <p className='italic leading-relaxed'>
                        "{report.adminRemark}"
                      </p>
                      <div className='flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest'>
                        <Clock className='w-4 h-4' />
                        Resolved on{' '}
                        {new Date(report.updatedAt).toLocaleDateString(
                          undefined,
                          { dateStyle: 'long' }
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='bg-background border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4'>
                      <div className='mx-auto w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4'>
                        <Clock className='w-8 h-8 text-muted-foreground' />
                      </div>
                      <div className='space-y-1'>
                        <p className='font-bold text-lg'>Awaiting Review</p>
                        <p className='text-muted-foreground max-w-xs mx-auto text-sm'>
                          This report is flagged for administrative attention.
                          Review the buyer context before taking action.
                        </p>
                      </div>
                      <div className='pt-4'>
                        <ReplyDialog id={id} forBuyerReports={true} />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleReport
