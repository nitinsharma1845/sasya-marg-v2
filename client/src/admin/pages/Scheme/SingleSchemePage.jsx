import { useGetSingleScheme } from '@/admin/hooks/scheme.hooks'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  FileText,
  MapPin,
  UserCircle,
  Maximize2,
  CheckCircle2,
  Edit,
  PowerOff,
  ChevronLeft,
  BookOpen,
  ClipboardCheck,
  Globe,
  Clock,
  Activity,
  Tag
} from 'lucide-react'
import ToggleActiveStatusDialog from './ToggleActiveStatusDialog'
import { createPrefetch } from '@/lib/prefetch'

const SchemeDetailSkeleton = () => (
  <div className='max-w-7xl mx-auto p-4 md:p-8 space-y-8'>
    <div className='flex justify-between items-center'>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-64 bg-secondary' />
        <Skeleton className='h-4 w-40 bg-secondary' />
      </div>
      <div className='flex gap-3'>
        <Skeleton className='h-10 w-28 bg-secondary' />
        <Skeleton className='h-10 w-28 bg-secondary' />
      </div>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      <div className='lg:col-span-2 space-y-6'>
        <Skeleton className='h-64 w-full bg-secondary' />
        <Skeleton className='h-48 w-full bg-secondary' />
      </div>
      <Skeleton className='h-96 w-full bg-secondary' />
    </div>
  </div>
)

const SingleSchemePage = () => {
  const { schemeId } = useParams()
  const navigate = useNavigate()
  const { data: response, isLoading } = useGetSingleScheme(schemeId)
  const prefetchAddScheme = createPrefetch(() => import('./AddScheme'))

  const scheme = response?.data

  if (isLoading) return <SchemeDetailSkeleton />
  if (!scheme)
    return (
      <div className='min-h-screen flex items-center justify-center text-destructive font-bold'>
        Scheme Not Found
      </div>
    )

  return (
    <div className='min-h-screen bg-background p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-xl border border-border shadow-sm'>
          <div className='space-y-3'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center text-sm text-muted-foreground hover:text-primary transition-colors'
            >
              <ChevronLeft className='w-4 h-4 mr-1' /> Back to Schemes
            </button>
            <div className='flex items-center gap-3 flex-wrap'>
              <h1 className='text-3xl font-bold text-foreground'>
                {scheme.title}
              </h1>
              <Badge
                variant={scheme.isActive ? 'outline' : 'destructive'}
                className={
                  scheme.isActive
                    ? 'border-primary text-primary px-3 capitalize'
                    : 'px-3 capitalize'
                }
              >
                {scheme.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <div className='flex gap-3 flex-col md:flex-row'>
            <Button
              onClick={() =>
                navigate(`/admin/dashboard/schemes/${schemeId}/edit`)
              }
              onMouseEnter={prefetchAddScheme}
              onTouchStart={prefetchAddScheme}
              variant='outline'
              className='flex items-center gap-2 border-border text-foreground hover:bg-secondary'
            >
              <Edit className='w-4 h-4' /> Update Scheme
            </Button>

            <ToggleActiveStatusDialog scheme={scheme} />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          <div className='lg:col-span-8 space-y-8'>
            <Card className='border-border shadow-sm bg-card'>
              <CardHeader className='border-b border-border/50 bg-muted/10'>
                <CardTitle className='flex items-center gap-2 text-xl'>
                  <BookOpen className='w-5 h-5 text-primary' /> Overview &
                  Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <p className='text-foreground/90 text-lg leading-relaxed'>
                  {scheme.description}
                </p>
                <div className='mt-8 p-6 bg-secondary/30 rounded-lg border border-border/50'>
                  <h4 className='font-bold text-primary flex items-center gap-2 mb-3 uppercase tracking-wider text-[10px]'>
                    <CheckCircle2 className='w-4 h-4' /> Direct Benefits
                  </h4>
                  <p className='text-foreground font-medium text-lg italic'>
                    "{scheme.benefits}"
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border bg-card'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl font-bold'>
                  <ClipboardCheck className='w-5 h-5 text-accent' /> Eligibility
                  Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='space-y-6'>
                  <div className='flex items-start gap-4'>
                    <div className='p-3 bg-primary/10 rounded-lg'>
                      <UserCircle className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                      <p className='text-[10px] text-muted-foreground uppercase font-bold tracking-widest'>
                        Farmer Category
                      </p>
                      <p className='text-lg font-semibold capitalize'>
                        {scheme.eligibility.farmerCategory}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='p-3 bg-accent/10 rounded-lg'>
                      <Maximize2 className='w-6 h-6 text-accent' />
                    </div>
                    <div>
                      <p className='text-[10px] text-muted-foreground uppercase font-bold tracking-widest'>
                        Land Size Requirement
                      </p>
                      <p className='text-lg font-semibold'>
                        {scheme.eligibility.landSizeMin} -{' '}
                        {scheme.eligibility.landSizeMax || '∞'} Acres
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-6 border-l border-border/50 pl-0 md:pl-8'>
                  <div className='flex items-start gap-4'>
                    <div className='p-3 bg-destructive/10 rounded-lg'>
                      <Globe className='w-6 h-6 text-destructive' />
                    </div>
                    <div className='w-full'>
                      <p className='text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2'>
                        Target States
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {scheme.eligibility.states.length > 0 ? (
                          scheme.eligibility.states.map((state, i) => (
                            <Badge
                              key={i}
                              variant='secondary'
                              className='rounded-md bg-secondary text-secondary-foreground border-none'
                            >
                              {state}
                            </Badge>
                          ))
                        ) : (
                          <Badge
                            variant='outline'
                            className='border-primary text-primary bg-primary/5'
                          >
                            Available PAN India
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='lg:col-span-4 space-y-6'>
            <Card className='border-border sticky top-8 bg-card'>
              <CardHeader className='bg-muted/30'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <FileText className='w-5 h-5 text-primary' /> Documentation
                </CardTitle>
                <CardDescription>
                  Required papers for application
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='space-y-4'>
                  {scheme.documentsRequired?.length > 0 ? (
                    scheme.documentsRequired.map((doc, i) => (
                      <div
                        key={i}
                        className='flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border/50 hover:bg-secondary/40 transition-colors'
                      >
                        <div className='w-2 h-2 rounded-full bg-primary' />
                        <span className='text-sm font-medium'>{doc}</span>
                      </div>
                    ))
                  ) : (
                    <div className='text-center py-6 text-muted-foreground italic'>
                      No documents specified
                    </div>
                  )}
                </div>

                <Separator className='my-8 bg-border' />

                <div className='space-y-5'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                      <Tag className='w-4 h-4' />
                      <span className='text-[10px] font-bold uppercase'>
                        System ID
                      </span>
                    </div>
                    <span className='font-mono text-[10px] bg-muted px-2 py-1 rounded text-foreground'>
                      {scheme._id}
                    </span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                      <Activity className='w-4 h-4' />
                      <span className='text-[10px] font-bold uppercase'>
                        Moderation
                      </span>
                    </div>
                    <Badge
                      className={
                        scheme.isActive
                          ? 'bg-primary/10 text-primary hover:bg-primary/10 border-primary/20'
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {scheme.isActive ? 'Live' : 'Hidden'}
                    </Badge>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                      <Clock className='w-4 h-4' />
                      <span className='text-[10px] font-bold uppercase'>
                        Status
                      </span>
                    </div>
                    <span className='text-xs font-semibold'>
                      {scheme.isActive ? 'Active Support' : 'Paused'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleSchemePage
