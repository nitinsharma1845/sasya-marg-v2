import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Wind,
  Droplets,
  Sprout,
  CheckCircle2,
  TrendingUp,
  Wallet,
  CloudSun
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useGetSingleSuggestion } from '@/hooks/farmer.hooks'
import AppLoader from '@/components/common/AppLoader'

// const getCropName = cropId => {
//   if (typeof cropId === 'object' && cropId?.name) return cropId.name

//   const idString = String(cropId)
//   if (idString.includes('aaa')) return 'Wheat'
//   if (idString.includes('ab2')) return 'Mustard'
//   if (idString.includes('aab')) return 'Potato'
//   if (idString.includes('aad')) return 'Sugarcane'

//   return 'Unknown Crop'
// }

const ShowSuggestionPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useGetSingleSuggestion(id)

  console.log(data)

  if (isLoading) return <AppLoader />
  if (!data?.data)
    return <div className='p-8 text-center'>Suggestion not found</div>

  const report = data.data
  const { weatherSnapshot, farmLandSnapshot, factsSnapshot, result } = report

  const sortedResults = [...result].sort((a, b) => b.score - a.score)
  const winner = sortedResults[0]
  const alternatives = sortedResults.slice(1)

  const reportDate = new Date(report.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className='min-h-screen bg-background pb-12 animate-in fade-in duration-500'>
      <div className='bg-primary/5 border-b border-border pb-8 pt-6 px-4 md:px-8'>
        <div className='mx-auto container px-10'>
          <Button
            variant='ghost'
            onClick={() => navigate(-1)}
            className='mb-4 pl-0 hover:bg-transparent hover:text-primary gap-2 cursor-pointer dark:hover:bg-transparent'
          >
            <ArrowLeft className='h-4 w-4' /> Back to Advisor
          </Button>

          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <Badge
                variant='outline'
                className='mb-2 border-primary/30 text-primary bg-primary/5'
              >
                AI Prediction Report
              </Badge>
              <h1 className='text-3xl md:text-4xl font-bold text-primary tracking-tight'>
                Crop Recommendation
              </h1>
              <p className='text-muted-foreground mt-1 flex items-center gap-2'>
                <Calendar className='h-4 w-4' /> Generated on {reportDate}
              </p>
            </div>

            <div className='flex items-center gap-3 bg-card p-3 rounded-lg border border-border shadow-sm'>
              <div className='h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary'>
                <MapPin className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs font-bold uppercase text-muted-foreground'>
                  Target Land
                </p>
                <p className='font-semibold text-foreground'>
                  {farmLandSnapshot.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto container px-4 md:px-8 mt-8 space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='border-border/60 bg-card/50'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2'>
                <CloudSun className='h-4 w-4 text-accent' /> Weather Context
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-between items-end'>
                <span className='text-3xl font-bold text-foreground'>
                  {weatherSnapshot.temperature}°C
                </span>
                <span className='text-sm font-medium text-muted-foreground mb-1'>
                  {weatherSnapshot.condition}
                </span>
              </div>
              <Separator />
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Droplets className='h-3.5 w-3.5' />{' '}
                  {weatherSnapshot.humidity}% Hum
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Wind className='h-3.5 w-3.5' /> {weatherSnapshot.windSpeed}{' '}
                  km/h
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-border/60 bg-card/50'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2'>
                <Sprout className='h-4 w-4 text-primary' /> Soil & Season
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex flex-wrap gap-2'>
                <Badge variant='secondary' className='capitalize'>
                  {factsSnapshot.season} Season
                </Badge>
                <Badge variant='outline' className='capitalize'>
                  {factsSnapshot.soilType} Soil
                </Badge>
              </div>
              <Separator />
              <div className='text-sm text-muted-foreground'>
                Previous Crop:{' '}
                <span className='font-medium text-foreground'>
                  {factsSnapshot.previousCrop || 'None'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className='border-border/60 bg-card/50'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2'>
                <Wallet className='h-4 w-4 text-primary' /> Economics
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  Budget Level
                </span>
                <span className='font-semibold capitalize text-foreground'>
                  {factsSnapshot.budgetLevel}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  Irrigation
                </span>
                <span className='font-semibold capitalize text-foreground'>
                  {factsSnapshot.irrigationLevel}
                </span>
              </div>
              <Separator />
              <div className='text-sm text-muted-foreground'>
                Land Size:{' '}
                <span className='font-medium text-foreground'>
                  {farmLandSnapshot.size.value} {farmLandSnapshot.size.unit}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-foreground flex items-center gap-2'>
            <TrendingUp className='h-5 w-5 text-primary' /> Top Recommendation
          </h2>

          <Card className='overflow-hidden border-primary/20 shadow-lg bg-linear-to-br from-card to-secondary/30'>
            <div className='p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
              <div className='md:col-span-1 text-center md:text-left space-y-4'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/50 text-sm font-bold'>
                  <CheckCircle2 className='h-4 w-4' /> {winner.score}% Match
                  Score
                </div>
                <h3 className='text-4xl font-bold text-primary'>
                  {winner.crop}
                </h3>
                <p className='text-muted-foreground'>
                  Optimal duration:{' '}
                  <span className='font-semibold text-foreground'>
                    {winner.durationRange.min}-{winner.durationRange.max} days
                  </span>
                </p>
              </div>

              <div className='md:col-span-2 bg-background/60 rounded-xl p-5 border border-border/50'>
                <h4 className='font-semibold text-foreground mb-3 flex items-center gap-2'>
                  Why this is the best choice:
                </h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {winner.reasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className='flex items-start gap-2 text-sm text-muted-foreground'
                    >
                      <div className='mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0' />
                      {reason}
                    </div>
                  ))}
                </div>
                <div className='mt-4 pt-4 border-t border-border/50'>
                  <div className='flex justify-between text-xs mb-1.5 font-medium'>
                    <span>Suitability Index</span>
                    <span>{winner.score}/100</span>
                  </div>
                  <Progress value={winner.score} className='h-2' />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {alternatives.length > 0 && (
          <div className='space-y-4'>
            <h2 className='text-xl font-bold text-foreground opacity-90'>
              Alternative Options
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {alternatives.map(crop => (
                <Card
                  key={crop._id}
                  className='border-border bg-card hover:border-primary/40 transition-colors'
                >
                  <CardContent className='p-5'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <h4 className='text-lg font-bold text-foreground'>
                          {crop.crop}
                        </h4>
                        <p className='text-xs text-muted-foreground'>
                          {crop.durationRange.min}-{crop.durationRange.max} days
                        </p>
                      </div>
                      <Badge variant='secondary' className='font-bold'>
                        {crop.score} Score
                      </Badge>
                    </div>
                    <div className='space-y-1'>
                      {crop.reasons.slice(0, 2).map((reason, idx) => (
                        <p
                          key={idx}
                          className='text-xs text-muted-foreground flex items-center gap-1.5'
                        >
                          <span className='h-1 w-1 rounded-full bg-muted-foreground/50' />
                          {reason}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowSuggestionPage
