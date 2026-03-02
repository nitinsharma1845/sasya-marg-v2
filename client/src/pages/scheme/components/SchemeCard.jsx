import React from 'react'
import {
  Landmark,
  Calendar,
  FileText,
  ArrowRight,
  MapPin,
  Sprout,
  Users
} from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'

const SchemeCard = ({ scheme }) => {
  const navigate = useNavigate()

  const formatDate = date => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const isExpired = scheme.validTill && new Date(scheme.validTill) < new Date()

  return (
    <Card className='group flex flex-col justify-between overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5'>
      <CardHeader className='bg-muted/90 p-5 pb-3'>
        <div className='flex justify-between items-start gap-3'>
          <div className='flex gap-3'>
            <div className='mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
              <Landmark className='h-5 w-5' />
            </div>
            <div>
              <h3 className='font-bold text-lg leading-tight text-foreground line-clamp-2'>
                {scheme.title}
              </h3>
              <p className='text-xs text-muted-foreground mt-1 line-clamp-1'>
                Govt. Scheme • {scheme.eligibility?.farmerCategory || 'All'}{' '}
                Farmers
              </p>
            </div>
          </div>

          {scheme.eligibility?.states?.length > 0 ? (
            <Badge
              variant='outline'
              className='shrink-0 bg-background text-[10px] uppercase font-bold tracking-wide'
            >
              {scheme.eligibility.states[0]}
              {scheme.eligibility.states.length > 1 &&
                ` +${scheme.eligibility.states.length - 1}`}
            </Badge>
          ) : (
            <Badge variant='secondary' className='shrink-0 text-[10px]'>
              ALL INDIA
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className='p-5 pt-2 grow'>
        <div className='my-4 rounded-lg bg-accent/10 border border-accent/20 p-3'>
          <p className='text-xs font-bold text-accent-foreground dark:text-accent/80 uppercase tracking-widest mb-1'>
            Primary Benefit
          </p>
          <p className='text-lg font-bold text-foreground'>{scheme.benefits}</p>
        </div>

        <p className='text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed'>
          {scheme.description}
        </p>

        <div className='flex flex-wrap gap-2'>
          {scheme.eligibility?.cropTypes?.length > 0 && (
            <Badge
              variant='secondary'
              className='bg-secondary text-primary hover:bg-secondary/80 text-xs px-2 py-0.5'
            >
              <Sprout className='mr-1 h-3 w-3' />
              {scheme.eligibility.cropTypes[0]}
            </Badge>
          )}

          {scheme.validTill && (
            <Badge
              variant='outline'
              className={`text-xs px-2 py-0.5 ${
                isExpired
                  ? 'text-destructive border-destructive/50'
                  : 'text-muted-foreground'
              }`}
            >
              <Calendar className='mr-1 h-3 w-3' />
              Valid till {formatDate(scheme.validTill)}
            </Badge>
          )}
        </div>
      </CardContent>

      <Separator className='bg-border/60' />

      <CardFooter className='p-4 bg-muted/10'>
        <Button
          onClick={() => navigate(`${scheme._id}`)}
          className='w-full justify-between bg-primary text-primary-foreground hover:bg-primary/90 group-hover:shadow-md cursor-pointer'
        >
          View Full Details
          <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SchemeCard
