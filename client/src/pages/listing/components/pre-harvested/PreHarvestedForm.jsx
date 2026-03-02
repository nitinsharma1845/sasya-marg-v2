import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { CalendarIcon, UploadCloud, Sprout, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useFetchFarmlands } from '@/hooks/farmer.hooks'
import ImageUploadPreview from '../ImageUploadPreview'
import { useCreatePreHarvestListing } from '@/hooks/listing.hooks'

const PreHarvestForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      farmland: '',
      description: '',
      qualityGrade: 'A',
      expectedyeild: { value: '', unit: 'quintal' },
      expectedPrice: { value: '', unit: 'per_quintal' },
      minimumOrderQuantity: { value: '', unit: 'quintal' }
    }
  })

  const [images, setImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createListing = useCreatePreHarvestListing()

  const { data: farmlandData } = useFetchFarmlands({ status: 'active' })
  const farmlands = farmlandData?.data?.farmland || []

  const onSubmit = async data => {
    setIsSubmitting(true)
    const formData = new FormData()

    formData.append('payload[title]', data.title)
    formData.append('payload[farmland]', data.farmland)
    formData.append('payload[description]', data.description || '')
    formData.append('payload[qualityGrade]', data.qualityGrade)

    if (data.sowingDate) {
      formData.append('payload[sowingDate]', data.sowingDate.toISOString())
    }
    if (data.expectedHarvest) {
      formData.append(
        'payload[expectedHarvest]',
        data.expectedHarvest.toISOString()
      )
    }

    if (data.expectedyeild?.value) {
      formData.append('payload[expectedyeild][value]', data.expectedyeild.value)
      formData.append('payload[expectedyeild][unit]', data.expectedyeild.unit)
    }

    if (data.expectedPrice?.value) {
      formData.append('payload[expectedPrice][value]', data.expectedPrice.value)
      formData.append('payload[expectedPrice][unit]', data.expectedPrice.unit)
    }

    if (data.minimumOrderQuantity?.value) {
      formData.append(
        'payload[minimumOrderQuantity][value]',
        data.minimumOrderQuantity.value
      )
      formData.append(
        'payload[minimumOrderQuantity][unit]',
        data.minimumOrderQuantity.unit
      )
    }

    images.forEach(imageItem => {
      if (imageItem.file) {
        formData.append('images', imageItem.file)
      }
    })

    createListing.mutate(formData, {
      onSuccess: () => {
        reset()
        setImages([])
      },
      onSettled: () => setIsSubmitting(false)
    })
  }

  return (
    <Card className='border-border shadow-md'>
      <CardHeader className=' border-b border-border pb-4'>
        <CardTitle className='flex items-center gap-2 text-primary'>
          <Sprout className='h-5 w-5' /> New Pre-Harvest Listing
        </CardTitle>
        <p className='text-sm text-primary/70'>
          List crops that are still growing to secure buyers early.
        </p>
      </CardHeader>
      <CardContent className='p-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label>
                Listing Title <span className='text-destructive'>*</span>
              </Label>
              <Input
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 5,
                    message: 'Title must be at least 5 characters'
                  },
                  maxLength: {
                    value: 120,
                    message: 'Title must be under 120 characters'
                  }
                })}
                placeholder='e.g. Premium Sharbati Wheat - Upcoming Harvest'
              />
              {errors.title && (
                <span className='text-xs text-destructive'>
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className='space-y-2'>
              <Label>
                Select Farmland <span className='text-destructive'>*</span>
              </Label>
              <Controller
                name='farmland'
                control={control}
                rules={{ required: 'Specify farmland' }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Choose source land...' />
                    </SelectTrigger>
                    <SelectContent>
                      {farmlands.map(farm => (
                        <SelectItem key={farm._id} value={farm._id}>
                          {farm.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.farmland && (
                <span className='text-xs text-destructive'>
                  {errors.farmland.message}
                </span>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label>
                Sowing Date <span className='text-destructive'>*</span>
              </Label>
              <DatePicker
                name='sowingDate'
                control={control}
                placeholder='When did you sow?'
                required={true}
              />
              {errors.sowingDate && (
                <span className='text-xs text-destructive'>
                  Sowing date is required
                </span>
              )}
            </div>

            <div className='space-y-2'>
              <Label>
                Expected Harvest Date{' '}
                <span className='text-destructive'>*</span>
              </Label>
              <DatePicker
                name='expectedHarvest'
                control={control}
                placeholder='When will it be ready?'
                required={true}
              />
              {errors.expectedHarvest && (
                <span className='text-xs text-destructive'>
                  Harvest date is required
                </span>
              )}
            </div>
          </div>

          <div className='p-4 bg-muted/30 rounded-lg space-y-4 border border-border/50'>
            <h3 className='font-semibold text-sm text-muted-foreground uppercase tracking-wider'>
              Production Estimates
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <Label>Expected Yield</Label>
                <div className='flex gap-2'>
                  <Input
                    type='number'
                    step='0.01'
                    {...register('expectedyeild.value', {
                      required: 'Yield is required',
                      min: { value: 0.0001, message: 'Must be positive' }
                    })}
                    placeholder='0.00'
                  />
                  <select
                    {...register('expectedyeild.unit')}
                    className='bg-background border rounded-md px-2 text-sm'
                  >
                    <option value='quintal'>Quintal</option>
                    <option value='ton'>Ton</option>
                    <option value='kg'>Kg</option>
                  </select>
                </div>
                {errors.expectedyeild?.value && (
                  <span className='text-xs text-destructive'>
                    {errors.expectedyeild.value.message}
                  </span>
                )}
              </div>

              <div className='space-y-2'>
                <Label>Expected Price (₹)</Label>
                <div className='flex gap-2'>
                  <Input
                    type='number'
                    step='0.01'
                    {...register('expectedPrice.value', {
                      required: 'Price is required',
                      min: { value: 0.0001, message: 'Must be positive' }
                    })}
                    placeholder='0.00'
                  />
                  <select
                    {...register('expectedPrice.unit')}
                    className='bg-background border rounded-md px-2 text-sm'
                  >
                    <option value='per_quintal'>/ Quintal</option>
                    <option value='per_kg'>/ Kg</option>
                    <option value='per_ton'>/ Ton</option>
                  </select>
                </div>
                {errors.expectedPrice?.value && (
                  <span className='text-xs text-destructive'>
                    {errors.expectedPrice.value.message}
                  </span>
                )}
              </div>

              <div className='space-y-2'>
                <Label>Min Order Qty</Label>
                <div className='flex gap-2'>
                  <Input
                    type='number'
                    step='0.01'
                    {...register('minimumOrderQuantity.value', {
                      required: 'Min Qty is required',
                      min: { value: 0.0001, message: 'Must be positive' }
                    })}
                    placeholder='Min Qty'
                  />
                  <select
                    {...register('minimumOrderQuantity.unit')}
                    className='bg-background border rounded-md px-2 text-sm'
                  >
                    <option value='quintal'>Quintal</option>
                    <option value='kg'>Kg</option>
                  </select>
                </div>
                {errors.minimumOrderQuantity?.value && (
                  <span className='text-xs text-destructive'>
                    {errors.minimumOrderQuantity.value.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Quality Grade</Label>
            <Controller
              name='qualityGrade'
              control={control}
              render={({ field }) => (
                <div className='flex gap-4'>
                  {['A', 'B', 'C', 'organic'].map(grade => (
                    <label
                      key={grade}
                      className={`cursor-pointer md:px-4 px-2 py-2 rounded-md border text-sm font-medium transition-colors ${
                        field.value === grade
                          ? 'bg-primary/10 border-border text-primary'
                          : 'bg-background hover:bg-muted'
                      }`}
                    >
                      <input
                        type='radio'
                        {...field}
                        value={grade}
                        className='hidden'
                      />
                      {grade.toUpperCase()}
                    </label>
                  ))}
                </div>
              )}
            />
          </div>

          <div className='space-y-2'>
            <Label>Description</Label>
            <Textarea
              {...register('description')}
              placeholder='Describe your crop quality, irrigation method, etc.'
              className='h-24'
            />
          </div>

          <div className='space-y-2'>
            <Label>Crop Images</Label>
            <ImageUploadPreview images={images} setImages={setImages} />
          </div>

          <Button
            type='submit'
            className='w-full bg-primary hover:bg-primary/80 h-11 text-base cursor-pointer'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className='animate-spin mr-2' />
            ) : (
              <UploadCloud className='mr-2 h-4 w-4' />
            )}
            Publish Listing
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export const DatePicker = ({
  name,
  control,
  placeholder,
  required = false
}) => (
  <Controller
    name={name}
    control={control}
    rules={{ required: required }}
    render={({ field }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal cursor-pointer',
              !field.value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {field.value ? (
              format(field.value, 'PPP')
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          side='bottom'
          className='p-0 w-[--radix-popover-trigger-width] z-50'
        >
          <Calendar
            mode='single'
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )}
  />
)

export default PreHarvestForm
