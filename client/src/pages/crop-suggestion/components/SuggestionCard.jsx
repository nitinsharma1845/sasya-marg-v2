import React from 'react'
import {
  Sprout,
  CheckCircle2,
  Calendar,
  TrendingUp,
  BrainCircuit,
  RefreshCw,
  CloudSun,
  Wind,
  Droplets
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { getOptimizedImg } from '@/lib/imageHelper'

const getImageForCrop = cropName => {
  const name = cropName.toLowerCase()
  if (name.includes('wheat'))
    return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1000'
  if (name.includes('mustard'))
    return 'https://images.unsplash.com/photo-1530268729831-4b3b9589e02b?auto=format&fit=crop&q=80&w=1000'
  if (name.includes('sugarcane'))
    return 'https://images.unsplash.com/photo-1601633591968-3e4210cfc518?auto=format&fit=crop&q=80&w=1000'
  if (name.includes('rice') || name.includes('paddy'))
    return 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?auto=format&fit=crop&q=80&w=1000'
  return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000'
}

const SuggestionResults = React.memo(({ data, onReset }) => {
  const { recommendations, weather } = data
  const topPick = recommendations[0]
  const alternatives = recommendations.slice(1)

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <WeatherMetric
          icon={CloudSun}
          label='Condition'
          value={weather.condition}
        />
        <WeatherMetric
          icon={TrendingUp}
          label='Temp'
          value={`${weather.temperature}°C`}
        />
        <WeatherMetric
          icon={Droplets}
          label='Humidity'
          value={`${weather.humidity}%`}
        />
        <WeatherMetric
          icon={Wind}
          label='Wind'
          value={`${weather.windSpeed} km/h`}
        />
      </div>

      <Card className='overflow-hidden border-border shadow-2xl bg-card'>
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <div className='relative h-72 lg:h-auto lg:col-span-2'>
            <img
              src={
                topPick?.img?.url ||
                getOptimizedImg(
                  'https://res.cloudinary.com/dq0ltmja4/image/upload/jake-gard-CetB-bTDBtY-unsplash_c8vtsd.jpg'
                )
              }
              loading='lazy'
              decoding='async'
              alt={topPick.crop}
              className='h-full w-full object-cover'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent lg:bg-linear-to-r' />
            <div className='absolute top-4 left-4'>
              <Badge className='bg-accent text-accent-foreground border-none px-3 py-1 shadow-md'>
                {topPick.score} Score
              </Badge>
            </div>
            <div className='absolute bottom-4 left-4 text-white'>
              <p className='text-sm font-medium opacity-90'>
                {data.season} Season
              </p>
              <h2 className='text-4xl font-bold'>{topPick.crop}</h2>
            </div>
          </div>

          <div className='p-6 lg:p-8 lg:col-span-3 space-y-6'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary'>
                  <Sprout className='h-6 w-6' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground font-medium'>
                    Top Recommendation
                  </p>
                  <p className='text-lg font-bold text-foreground'>
                    Highest Profit Potential
                  </p>
                </div>
              </div>
              <div className='inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary border border-primary/20'>
                <CheckCircle2 className='h-4 w-4' />
                {topPick.confidence.percentage}% Confidence
              </div>
            </div>

            <div className='h-px w-full bg-border' />

            <div className='grid grid-cols-2 gap-4'>
              <div className='p-3 rounded-lg border border-border bg-background flex flex-col justify-center gap-1'>
                <div className='flex items-center gap-1.5 text-muted-foreground'>
                  <Calendar className='h-3.5 w-3.5' />
                  <span className='text-[10px] uppercase font-bold tracking-wider'>
                    Duration
                  </span>
                </div>
                <span className='font-semibold text-foreground'>
                  {topPick.durationRange.min}-{topPick.durationRange.max} Days
                </span>
              </div>
              <div className='p-3 rounded-lg border border-accent/30 bg-accent/5 flex flex-col justify-center gap-1'>
                <div className='flex items-center gap-1.5 text-muted-foreground'>
                  <TrendingUp className='h-3.5 w-3.5 text-accent' />
                  <span className='text-[10px] uppercase font-bold tracking-wider'>
                    Reliability
                  </span>
                </div>
                <span className='font-semibold text-accent-foreground dark:text-foreground/60'>
                  {topPick.confidence.level}
                </span>
              </div>
            </div>

            <div className='rounded-xl bg-secondary/50 p-5 border border-secondary'>
              <h4 className='flex items-center gap-2 font-semibold text-primary mb-3'>
                <BrainCircuit className='h-4 w-4' /> AI Analysis
              </h4>
              <ul className='space-y-2'>
                {topPick.reasons.map((reason, i) => (
                  <li
                    key={i}
                    className='flex items-start gap-2 text-sm text-muted-foreground'
                  >
                    <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0' />
                    {reason}
                  </li>
                ))}
              </ul>

              <div className='mt-4 space-y-1'>
                <div className='flex justify-between text-xs font-medium text-foreground/80'>
                  <span>Match Score</span>
                  <span>{topPick.score}/100</span>
                </div>
                <Progress
                  value={topPick.score}
                  className='h-1.5 bg-muted [&>div]:bg-primary'
                />
              </div>
            </div>

            <div className='flex gap-3 pt-2'>
              <Button
                variant='outline'
                onClick={onReset}
                className='flex-1 bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90 h-11 dark:bg-primary dark:hover:bg-primary/90'
              >
                <RefreshCw className='mr-2 h-4 w-4' /> Check Again
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {alternatives.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-200'>
          {alternatives.map(crop => (
            <Card
              key={crop.cropId}
              className='border-border bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all'
            >
              <CardContent className='p-5 flex items-center gap-4'>
                <div className='h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-muted'>
                  <img
                    src={getImageForCrop(crop.crop)}
                    alt={crop.crop}
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-start mb-1'>
                    <h3 className='font-bold text-lg text-foreground truncate'>
                      {crop.crop}
                    </h3>
                    <Badge
                      variant='secondary'
                      className='text-xs bg-secondary text-secondary-foreground'
                    >
                      {crop.score} Score
                    </Badge>
                  </div>
                  <div className='flex items-center gap-3 text-sm text-muted-foreground mb-2'>
                    <span className='flex items-center gap-1'>
                      <Calendar className='h-3 w-3' /> {crop.durationRange.min}-
                      {crop.durationRange.max}d
                    </span>
                    <span className='flex items-center gap-1'>
                      <TrendingUp className='h-3 w-3' />{' '}
                      {crop.confidence.percentage}%
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground/80 line-clamp-1'>
                    {crop.reasons[0]}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
})

const WeatherMetric = ({ icon: Icon, label, value }) => (
  <div className='bg-card border border-border/50 rounded-xl p-3 flex items-center gap-3 shadow-sm'>
    <div className='h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0'>
      <Icon className='h-5 w-5' />
    </div>
    <div>
      <p className='text-xs text-muted-foreground font-medium uppercase'>
        {label}
      </p>
      <p className='text-sm font-bold text-foreground'>{value}</p>
    </div>
  </div>
)

export default SuggestionResults
