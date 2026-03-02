import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle2,
  Coins,
  Droplets,
  Loader2,
  MapPin,
  Navigation,
  Ruler,
  Sprout,
  Tractor
} from 'lucide-react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useCreateFarmland } from '@/hooks/farmer.hooks'

const SelectionCard = ({ icon: Icon, label, selected, onClick, hasError }) => (
  <div
    onClick={onClick}
    className={`
      cursor-pointer relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all duration-200 h-24
      ${
        selected
          ? 'border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary'
          : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-secondary/20'
      }
      ${hasError ? 'border-destructive/50 bg-destructive/5' : ''}
    `}
  >
    <Icon
      className={`h-6 w-6 ${
        selected ? 'text-primary' : 'text-muted-foreground'
      }`}
    />
    <span className='text-xs font-bold uppercase tracking-wide text-center leading-tight'>
      {label}
    </span>
    {selected && (
      <div className='absolute top-1.5 right-1.5 rounded-full bg-primary p-0.5 text-white'>
        <CheckCircle2 className='h-3 w-3' />
      </div>
    )}
  </div>
)

const FarmlandForm = ({ onSuccess }) => {
  const [isLocationManula, setIsLocationManual] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const { mutate, isPending } = useCreateFarmland()
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      water: { type: 'normal' },
      farmingType: 'conventional',
      size: { unit: 'beegha' },
      location: null
    }
  })

  const watchedLocation = watch('location')
  const watchedUnit = watch('size.unit')
  const watchedSoil = watch('soilType')
  const watchedWaterSource = watch('water.source')
  const watchedWaterType = watch('water.type')
  const watechedFarmingType = watch('farmingType')

  const handleFetchLocation = () => {
    setIsDetectingLocation(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setValue('location', {
            coordinates: {
              lat: pos.coords.latitude,
              lon: pos.coords.longitude
            }
          })
          setIsDetectingLocation(false)
          toast.success('Location fetched !')
        },
        () => {
          setIsDetectingLocation(false)
          toast.success('Faild to get Location')
        }
      )
    }
  }

  const handleCreateFarmland = data => {
    const payload = {
      ...data
    }
    if (payload.budget) {
      payload.budget = Number(payload.budget)
    }

    if (payload.size.value) {
      payload.size.value = Number(payload.size.value)
    }

    mutate(payload, {
      onSuccess: data => {
        onSuccess(data.data._id)
      }
    })
  }

  return (
    <form
      className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'
      onSubmit={handleSubmit(handleCreateFarmland)}
    >
      <Card className={'border-border shadow-sm'}>
        <CardContent>
          <div className='flex items-center gap-2 mb-4 text-primary'>
            <MapPin className='h-5 w-5' />
            <h2 className='font-bold text-lg text-foreground'>Location</h2>
          </div>
          <div
            className={`
            rounded-xl p-6 flex flex-col items-center justify-center border-2 border-dashed transition-colors
            ${
              watchedLocation
                ? 'border-primary/50 bg-primary/5'
                : 'border-border hover:border-primary/30'
            }
          `}
          >
            {watchedLocation ? (
              <div className='text-center space-y-2'>
                <div className='h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-md'>
                  <CheckCircle2 className='h-6 w-6' />
                </div>
                <p className='font-bold text-foreground'>Location Locked</p>
                <div className='flex gap-2 flex-col justify-center, items-center'>
                  <Badge
                    variant='outline'
                    className='border-primary text-primary'
                  >
                    {watchedLocation.coordinates.lat.toFixed(4)},{' '}
                    {watchedLocation.coordinates.lon.toFixed(4)}
                  </Badge>
                  <Button
                    type='button'
                    variant='link'
                    onClick={handleFetchLocation}
                    className='text-xs h-auto p-0 text-muted-foreground cursor-pointer'
                  >
                    Update Location
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  disabled={isDetectingLocation}
                  onClick={handleFetchLocation}
                  type='button'
                  className='bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'
                >
                  {isDetectingLocation ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    <Navigation className='mr-2 h-4 w-4' />
                  )}
                  Detect GPS Location
                </Button>
                <span className='my-3 text-sm font-bold uppercase'>Or</span>

                <Button variant='ghost' type='button'>
                  Choose manually
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className={'border-border shadow-sm'}>
        <CardContent>
          <div className='flex items-center gap-2 text-primary'>
            <Ruler className='h-5 w-5' />
            <h2 className='font-bold text-lg text-foreground'>Land Details</h2>
          </div>

          <div className='space-y-4 mt-3'>
            <div className='space-y-1.4'>
              <label className={'text-sm font-medium text-foreground my-2'}>
                Farm Name
              </label>
              <Input
                {...register('name', { required: 'Farm name is required' })}
                placeholder='e.g. Riverside Plot'
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <span className='text-xs text-destructive'>
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className='grid space-y-1.5 gap-1'>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>
                  Size
                </label>
                <Input
                  type='number'
                  step='0.01'
                  {...register('size.value', {
                    valueAsNumber: true,
                    required: 'Size is required',
                    min: { value: 0.01, message: 'Invalid size' }
                  })}
                  placeholder='0.00'
                  className={errors.size?.value ? 'border-destructive' : ''}
                />
                {errors.size?.value && (
                  <span className='text-xs text-destructive'>
                    {errors.size.value.message}
                  </span>
                )}
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>
                  Unit
                </label>
                <div className='grid grid-cols-5 gap-1'>
                  {['beegha', 'hectare', 'sqft', 'sqm', 'acre'].map(u => (
                    <div
                      key={u}
                      onClick={() => setValue('size.unit', u)}
                      className={`cursor-pointer text-center text-xs py-2.5 rounded-md border capitalize ${
                        watchedUnit === u
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-input'
                      }`}
                    >
                      {u}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={'border-border shadow-sm'}>
        <CardContent className='p-6 space-y-6'>
          <div className='flex items-center gap-2 text-primary'>
            <Sprout className='h-5 w-5' />
            <h2 className='font-bold text-lg text-foreground'>Resources</h2>
          </div>

          <div className='space-y-3'>
            <label className='text-sm font-medium text-foreground'>
              Soil Type <span className='text-destructive'>*</span>
            </label>
            <input
              type='hidden'
              {...register('soilType', { required: 'Select soil type' })}
            />
            <div className='grid grid-cols-3 gap-3'>
              {[
                'sandy',
                'clay',
                'loamy',
                'silty',
                'black',
                'red',
                'laterite',
                'alluvial',
                'arid'
              ].map(type => (
                <SelectionCard
                  key={type}
                  icon={Sprout}
                  label={type}
                  selected={watchedSoil === type}
                  onClick={() =>
                    setValue('soilType', type, { shouldValidate: true })
                  }
                  hasError={errors.soilType}
                />
              ))}
            </div>
            {errors.soilType && (
              <span className='text-xs text-destructive'>
                {errors.soilType.message}
              </span>
            )}
          </div>

          <div className='space-y-3'>
            <label className='text-sm font-medium text-foreground'>
              Water Type <span className='text-destructive'>*</span>
            </label>
            <input
              type='hidden'
              {...register('water.type', { required: 'Select water type' })}
            />
            <div className='grid grid-cols-3 gap-3'>
              {['Fresh water', 'saline water', 'Hard water', 'Unknown'].map(
                type => (
                  <SelectionCard
                    key={type}
                    icon={Droplets}
                    label={type}
                    selected={watchedWaterType === type}
                    onClick={() =>
                      setValue('water.type', type, { shouldValidate: true })
                    }
                    hasError={errors.water?.type}
                  />
                )
              )}
            </div>
            {errors.water?.type && (
              <span className='text-xs text-destructive'>
                {errors.water.type.message}
              </span>
            )}
          </div>

          <div className='space-y-3'>
            <label className='text-sm font-medium text-foreground'>
              Water Source
            </label>
            <input
              type='hidden'
              {...register('water.source', { required: 'Select water source' })}
            />
            <div className='grid grid-cols-3 gap-3'>
              {[
                'Ground Water',
                'Canal',
                'Rainfed',
                'Well',
                'River',
                'Pond'
              ].map(source => (
                <SelectionCard
                  key={source}
                  icon={Droplets}
                  label={source}
                  selected={watchedWaterSource === source}
                  onClick={() =>
                    setValue('water.source', source, { shouldValidate: true })
                  }
                  hasError={errors.water?.source}
                />
              ))}
            </div>
            {errors.water?.source && (
              <span className='text-xs text-destructive'>
                {errors.water.source.message}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className={'Border-border shadow-sm'}>
        <CardContent className={'space-y-6'}>
          <div className='flex items-center gap-2 text-primary'>
            <Tractor className='h-5 w-5' />
            <h2 className='font-bold text-lg text-foreground'>Aditionals</h2>
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              Est. Budget (₹)
            </label>
            <div className='relative'>
              <Coins className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='number'
                {...register('budget', { valueAsNumber: true })}
                placeholder='Optional'
                className='pl-9'
              />
            </div>
          </div>

          <div className='space-y-3'>
            <label className='text-sm font-medium text-foreground'>
              Prefered farming type
            </label>
            <input
              type='hidden'
              {...register('farmingType', { required: 'Select farming type' })}
            />
            <div className='grid grid-cols-3 gap-3'>
              {['conventional', 'organic'].map(type => (
                <SelectionCard
                  key={type}
                  icon={Tractor}
                  label={type}
                  selected={watechedFarmingType === type}
                  onClick={() =>
                    setValue('farmingType', type, { shouldValidate: true })
                  }
                  hasError={errors.farmingType}
                />
              ))}
            </div>
            {errors.farmingType && (
              <span className='text-xs text-destructive'>
                {errors.farmingType.message}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Button
        type='submit'
        size='lg'
        className='w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg cursor-pointer'
      >
        {isPending ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <CheckCircle2 className='mr-2 h-4 w-4' />
        )}
        {isPending ? 'Registering Land...' : 'Save & Continue'}
      </Button>
    </form>
  )
}

export default FarmlandForm
