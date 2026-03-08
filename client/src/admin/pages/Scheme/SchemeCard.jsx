import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  FileText,
  MapPin,
  UserCircle,
  Maximize2,
  CheckCircle2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { createPrefetch } from '@/lib/prefetch'

const SchemeCard = React.memo(({ scheme }) => {
  const navigate = useNavigate()

  const prefetchSingleScheme = createPrefetch(() =>
    import('./SingleSchemePage')
  )
  return (
    <Card
      onMouseEnter={prefetchSingleScheme}
      onClick={() => navigate(`${scheme._id}`)}
      className='h-full flex flex-col border-border bg-card hover:shadow-md transition-shadow cursor-pointer'
    >
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-start gap-2'>
          <CardTitle className='text-lg font-bold text-foreground leading-tight'>
            {scheme.title}
          </CardTitle>
          <Badge
            variant={scheme.isActive ? 'outline' : 'destructive'}
            className={scheme.isActive ? 'border-primary text-primary' : ''}
          >
            {scheme.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <p className='text-sm text-muted-foreground line-clamp-2 mt-2'>
          {scheme.description}
        </p>
      </CardHeader>

      <CardContent className='grow space-y-4'>
        <div className='bg-secondary/50 p-3 rounded-lg space-y-2'>
          <p className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1'>
            <CheckCircle2 className='w-3 h-3' /> Key Benefits
          </p>
          <p className='text-sm text-foreground font-medium italic'>
            "{scheme.benefits}"
          </p>
        </div>

        <div className='space-y-3'>
          <div className='flex items-start gap-2'>
            <UserCircle className='w-4 h-4 mt-0.5 text-primary shrink-0' />
            <div className='text-xs'>
              <span className='text-muted-foreground block'>
                Farmer Category
              </span>
              <span className='font-semibold capitalize'>
                {scheme.eligibility.farmerCategory}
              </span>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <Maximize2 className='w-4 h-4 mt-0.5 text-accent shrink-0' />
            <div className='text-xs'>
              <span className='text-muted-foreground block'>
                Land Requirement
              </span>
              <span className='font-semibold'>
                {scheme.eligibility.landSizeMin} -{' '}
                {scheme.eligibility.landSizeMax || '∞'}{' '}
                {scheme.eligibility.landSizeMax ? 'Acres' : ''}
              </span>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <MapPin className='w-4 h-4 mt-0.5 text-destructive shrink-0' />
            <div className='text-xs'>
              <span className='text-muted-foreground block'>
                Applicable States
              </span>
              <div className='flex flex-wrap gap-1 mt-1'>
                {scheme.eligibility.states.length > 0 ? (
                  scheme.eligibility.states.slice(0, 3).map((state, i) => (
                    <Badge
                      key={i}
                      variant='secondary'
                      className='text-[10px] py-0 px-1 font-normal'
                    >
                      {state}
                    </Badge>
                  ))
                ) : (
                  <span className='font-semibold'>All India</span>
                )}
                {scheme.eligibility.states.length > 3 && (
                  <span className='text-[10px] text-muted-foreground'>
                    +{scheme.eligibility.states.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <Separator className='bg-border' />

      <CardFooter className='py-3 bg-muted/20'>
        <div className='w-full'>
          <p className='text-[10px] font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1'>
            <FileText className='w-3 h-3' /> Required Documents
          </p>
          <div className='flex flex-wrap gap-1'>
            {scheme.documentsRequired?.length > 0 ? (
              scheme.documentsRequired.map((doc, i) => (
                <span
                  key={i}
                  className='text-[10px] bg-background border border-border px-2 py-0.5 rounded-full'
                >
                  {doc}
                </span>
              ))
            ) : (
              <span className='text-[10px] italic text-muted-foreground'>
                No specific documents listed
              </span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
})

export default SchemeCard
