import React from 'react'
import {
  Tractor,
  Sprout,
  Leaf,
  MapPin,
  Clock,
  Layers,
  CloudSun,
  CheckCircle,
  TrendingUp,
  Zap,
  Book,
  ArrowUpRight,
  CircleQuestionMark,
  Box
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquare, CircleDot, CheckCircle2 } from 'lucide-react'

export const StatsOverview = ({ stats = {}, isLoading }) => {
  const navigate = useNavigate()
  const items = [
    {
      label: 'Assets',
      value: stats.farmlandCount || 0,
      sub: 'Registered Land',
      icon: MapPin,
      color: 'text-primary',
      bg: 'bg-primary/10',
      link: '/farmer/farmland'
    },
    {
      label: 'AI Intel',
      value: stats.predictionCount || 0,
      sub: 'Predictions',
      icon: Sprout,
      color: 'text-chart-2',
      bg: 'bg-chart-2/10',
      link: '/farmer/get-suggestion'
    },
    {
      label: 'Inventory',
      value: (stats.preHarvestCount || 0) + (stats.productCount || 0),
      sub: 'Products in mandi',
      icon: Leaf,
      color: 'text-chart-1',
      bg: 'bg-chart-1/10',
      link: '/farmer/mandi'
    },
    {
      label: 'Queries',
      value: stats.queriesCount || 0,
      sub: 'Ticket raised',
      icon: CircleQuestionMark,
      color: 'text-accent',
      bg: 'bg-accent/10',
      link: '/farmer/support'
    }
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {items.map((item, idx) => (
        <Card
          onClick={() => navigate(item.link)}
          key={idx}
          className='border-none shadow-sm bg-card rounded-3xl overflow-hidden group'
        >
          <CardContent className='p-6 flex items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-[10px] font-black text-muted-foreground uppercase tracking-widest'>
                {item.label}
              </p>
              {isLoading ? (
                <Skeleton className='h-8 w-12 bg-secondary' />
              ) : (
                <h3 className='text-3xl font-black text-foreground tracking-tighter'>
                  {item.value}
                </h3>
              )}
              <p className='text-[10px] font-bold text-muted-foreground/60'>
                {item.sub}
              </p>
            </div>
            <div
              className={`h-14 w-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}
            >
              <item.icon className='h-7 w-7' />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export const DetailedPredictionReport = ({ predictions = [], isLoading }) => {
  const navigate = useNavigate()

  if (isLoading)
    return <Skeleton className='h-150 w-full rounded-[2.5rem] bg-secondary' />

  if (!predictions?.length) {
    return (
      <Card className='h-96 flex flex-col items-center justify-center p-8 bg-transparent border-2 border-dashed border-border rounded-[2.5rem] text-center'>
        <div className='h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4'>
          <Zap className='h-8 w-8 text-muted-foreground/30' />
        </div>
        <p className='text-lg font-black text-foreground mb-1 tracking-tight'>
          No Active Intel
        </p>
        <Button
          size='sm'
          className='rounded-xl font-black uppercase text-[10px] tracking-widest h-10 px-6 mt-4 cursor-pointer'
          onClick={() => navigate('/farmer/get-suggestion')}
        >
          Get Suggestion
        </Button>
      </Card>
    )
  }

  const data = predictions[0] || {}
  const weather = data.weatherSnapshot || {}
  const facts = data.factsSnapshot || {}
  const result = data.result || []

  return (
    <Card className='border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-card transition-all'>
      <CardHeader className='border-b border-border/50 bg-secondary/10 p-8'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-primary' />
              <CardTitle className='text-xl font-black tracking-tight'>
                Cultivation Strategy
              </CardTitle>
            </div>
            <CardDescription className='font-bold text-muted-foreground/80 truncate max-w-63 sm:max-w-none'>
              Intel for{' '}
              <span className='text-primary font-black uppercase tracking-tighter'>
                {data.farmLandSnapshot?.name || 'Plot'}
              </span>
            </CardDescription>
          </div>
          <div className='flex items-center gap-2'>
            <Badge className='bg-background text-foreground border-border px-4 py-1.5 rounded-full font-black text-[10px] uppercase shadow-sm shrink-0 tracking-widest'>
              {weather.fetchedAt
                ? new Date(weather.fetchedAt).toLocaleDateString()
                : 'Live'}
            </Badge>
            <ArrowUpRight
              className='bg-secondary rounded-full p-2 w-10 h-10 cursor-pointer hover:bg-primary hover:text-white transition-colors'
              onClick={() => navigate(`/farmer/get-suggestion/${data._id}`)}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b border-border/50'>
          <div className='p-8 space-y-6'>
            <h4 className='text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2'>
              <CloudSun className='h-4 w-4' /> Environmental
            </h4>
            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  label: 'Temp',
                  val: `${Math.round(weather.temperature || 0)}°C`
                },
                { label: 'Humidity', val: `${weather.humidity || 0}%` },
                { label: 'Wind', val: `${weather.windSpeed || 0} km/h` },
                { label: 'Condition', val: weather.condition || 'N/A' }
              ].map(i => (
                <div
                  key={i.label}
                  className='bg-secondary/30 p-4 rounded-2xl border border-border/10'
                >
                  <p className='text-[10px] text-muted-foreground font-black uppercase mb-1'>
                    {i.label}
                  </p>
                  <p className='text-lg font-black text-foreground'>{i.val}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='p-8 space-y-4 bg-secondary/5'>
            <h4 className='text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2'>
              <Layers className='h-4 w-4' /> Land Metrics
            </h4>
            {[
              { label: 'Soil Type', val: facts.soilType },
              { label: 'Active Season', val: facts.season },
              { label: 'Irrigation', val: facts.irrigationLevel },
              { label: 'History', val: facts.previousCrop }
            ].map(i => (
              <div
                key={i.label}
                className='flex items-center justify-between p-3.5 bg-card border border-border/50 rounded-xl shadow-sm'
              >
                <span className='text-[11px] font-bold text-muted-foreground uppercase'>
                  {i.label}
                </span>
                <span className='text-xs font-black capitalize text-foreground'>
                  {i.val || 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='p-8'>
          <h4 className='text-sm font-black mb-6 uppercase tracking-[0.2em] text-foreground flex items-center gap-2'>
            Proprietary Suggestions
          </h4>
          <div className='rounded-2xl border border-border/50 overflow-x-auto shadow-sm'>
            <Table>
              <TableHeader className='bg-muted/50'>
                <TableRow className='border-border/50'>
                  <TableHead className='text-[10px] font-black uppercase py-4'>
                    Crop
                  </TableHead>
                  <TableHead className='text-[10px] font-black uppercase text-center'>
                    Compatibility
                  </TableHead>
                  <TableHead className='text-[10px] font-black uppercase'>
                    Drivers
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((crop, idx) => (
                  <TableRow
                    key={crop._id || idx}
                    className='border-border/50 hover:bg-secondary/10 transition-colors'
                  >
                    <TableCell className='py-5'>
                      <div className='font-black text-sm text-foreground'>
                        {crop.cropId?.name || 'Crop'}
                      </div>
                      <div className='flex items-center text-[10px] text-muted-foreground font-bold mt-1'>
                        <Clock className='mr-1 h-3 w-3' />{' '}
                        {crop.durationRange?.min || 0}-
                        {crop.durationRange?.max || 0} Days
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-col items-center gap-1.5'>
                        <span className='font-black text-xs text-primary'>
                          {crop.score || 0}%
                        </span>
                        <Progress
                          value={crop.score || 0}
                          className='h-1.5 w-16 bg-secondary'
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1.5 min-w-38'>
                        {(crop.reasons || []).slice(0, 2).map((reason, i) => (
                          <Badge
                            key={i}
                            variant='outline'
                            className='bg-background text-[9px] font-black uppercase py-0.5 border-primary/20 text-primary/80 whitespace-nowrap'
                          >
                            <CheckCircle className='mr-1 h-2.5 w-2.5' />{' '}
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const FarmlandTable = ({ farmlands = [], isLoading }) => {
  const navigate = useNavigate()
  if (isLoading)
    return <Skeleton className='h-105 w-full rounded-3xl bg-secondary' />

  if (farmlands.length === 0) {
    return (
      <Card className='h-96 flex flex-col items-center justify-center p-8 bg-transparent border-2 border-dashed border-border rounded-[2.5rem] text-center'>
        <div className='h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4'>
          <Tractor className='h-8 w-8 text-muted-foreground/30' />
        </div>
        <p className='text-lg font-black text-foreground mb-1 tracking-tight'>
          No Active Farmland
        </p>
        <Button
          size='sm'
          className='rounded-xl font-black uppercase text-[10px] tracking-widest h-10 px-6 mt-4 cursor-pointer'
          onClick={() => navigate('/farmer/farmland/add')}
        >
          Add Farmland
        </Button>
      </Card>
    )
  }
  return (
    <Card className='border-none shadow-sm rounded-3xl overflow-hidden h-105 flex flex-col bg-card'>
      <CardContent className='p-0 flex-1 overflow-hidden relative'>
        <ScrollArea className='h-full w-full'>
          <Table>
            <TableBody>
              {farmlands.map(land => (
                <TableRow
                  onClick={() => navigate(`/farmer/farmland/${land._id}`)}
                  key={land._id}
                  className='border-border/50 hover:bg-secondary/10 transition-colors cursor-default'
                >
                  <TableCell className='py-5 pl-6'>
                    <div className='font-black text-sm text-foreground truncate max-w-30'>
                      {land.name || 'Land'}
                    </div>
                    <div className='text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mt-1'>
                      {land.soilType || 'Clay'} Soil
                    </div>
                  </TableCell>
                  <TableCell className='text-right pr-6 shrink-0'>
                    <div className='text-xs font-black text-foreground whitespace-nowrap'>
                      {land.size?.value || 0} {land.size?.unit || 'Unit'}
                    </div>
                    <div className='text-[9px] font-bold text-muted-foreground uppercase mt-1'>
                      {land.location?.district || 'N/A'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export const HarvestActivityLog = ({ listings = [], isLoading }) => {
  const navigate = useNavigate()
  if (isLoading)
    return <Skeleton className='h-105 w-full rounded-3xl bg-secondary' />

  if (listings.length === 0) {
    return (
      <Card className='h-96 flex flex-col items-center justify-center p-8 bg-transparent border-2 border-dashed border-border rounded-[2.5rem] text-center'>
        <div className='h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4'>
          <Box className='h-8 w-8 text-muted-foreground/30' />
        </div>
        <p className='text-lg font-black text-foreground mb-1 tracking-tight'>
          No Active Product
        </p>
        <Button
          size='sm'
          className='rounded-xl font-black uppercase text-[10px] tracking-widest h-10 px-6 mt-4 cursor-pointer'
          onClick={() => navigate('/farmer/market')}
        >
          List a product
        </Button>
      </Card>
    )
  }

  return (
    <Card className='border-none shadow-sm rounded-3xl overflow-hidden h-105 flex flex-col bg-card'>
      <CardContent className='p-0 flex-1 overflow-hidden relative'>
        <ScrollArea className='h-full w-full'>
          <Table>
            <TableBody>
              {listings.map(item => (
                <TableRow
                  key={item._id}
                  className='border-border/50 hover:bg-secondary/10 transition-colors'
                >
                  <TableCell className='py-5 pl-6'>
                    <div className='font-black text-sm text-foreground whitespace-nowrap'>
                      {item.expectedHarvest
                        ? new Date(item.expectedHarvest).toLocaleDateString(
                            undefined,
                            { day: 'numeric', month: 'short' }
                          )
                        : 'N/A'}
                    </div>
                    <div className='text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1'>
                      Expected
                    </div>
                  </TableCell>
                  <TableCell className='text-right pr-6'>
                    <Badge
                      className='text-[9px] font-black uppercase h-6 rounded-full'
                      variant='outline'
                    >
                      {item.status || 'Open'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export const RecentQueries = ({ queries, isLoading }) => {
  const getStatusStyles = (status = '') => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-primary/20 text-primary border-primary'
      case 'open':
        return 'bg-accent/20 text-accent border-accent'
      default:
        return 'bg-secondary text-primary border-secondary'
    }
  }

  const getStatusIcon = (status = '') => {
    return status.toLowerCase() === 'resolved' ? (
      <CheckCircle2 size={14} className='mr-1' />
    ) : (
      <Clock size={14} className='mr-1' />
    )
  }

  return (
    <div className='w-full bg-card rounded-xl border shadow-sm overflow-hidden'>
      <div className='px-6 py-4 border-b flex items-center justify-between bg-muted/30'>
        <h3 className='font-semibold text-lg flex items-center gap-2'>
          <MessageSquare size={20} className='text-primary' />
          Recent Queries
        </h3>
      </div>

      <div className='divide-y'>
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className='p-4 flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <Skeleton className='w-24 h-5 bg-secondary' />
                <Skeleton className='w-16 h-4 bg-secondary' />
              </div>
              <Skeleton className='w-full h-4 bg-secondary' />
            </div>
          ))
        ) : queries && queries.length > 0 ? (
          queries.map(query => (
            <div
              key={query._id}
              className='p-4 hover:bg-muted/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4'
            >
              <div className='space-y-1 min-w-0 flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary tracking-widest border border-primary/20'>
                    {query.inquiry}
                  </span>
                  <span className='text-xs text-muted-foreground font-mono'>
                    ID: {query._id?.slice(-6).toUpperCase()}
                  </span>
                </div>
                <p className='text-sm font-medium text-foreground leading-snug truncate'>
                  {query.subject}
                </p>
              </div>

              <div className='flex items-center shrink-0'>
                <div
                  className={`flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyles(
                    query.status
                  )}`}
                >
                  {getStatusIcon(query.status)}
                  <span className='capitalize'>
                    {query.status || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='p-8 text-center text-muted-foreground text-sm'>
            No recent queries found.
          </div>
        )}
      </div>

      <div className='p-3 bg-muted/10 border-t text-center'>
        <Link
          className='text-xs font-bold text-primary hover:underline'
          to={'/farmer/support'}
        >
          View All Support Tickets
        </Link>
      </div>
    </div>
  )
}
