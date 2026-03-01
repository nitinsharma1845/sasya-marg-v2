import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Package, UploadCloud, Loader2 } from 'lucide-react'
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
import { useFetchFarmlands } from '@/hooks/farmer.hooks'
import ImageUploadPreview from '../ImageUploadPreview'
import { useCreateProductListing } from '@/hooks/listing.hooks'

const HarvestedForm = () => {
  const createListing = useCreateProductListing()
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
      category: '',
      farmlandId: '',
      description: '',
      stock: { value: '', unit: 'kg' },
      price: { value: '', unit: 'per_kg' }
    }
  })
  const [images, setImages] = useState([])
  const { data: farmlandData } = useFetchFarmlands({ status: 'active' })
  const farmlands = farmlandData?.data?.farmland || []

  const onSubmit = async data => {
    const formData = new FormData()

    // 1. Append simple text fields
    formData.append('title', data.title)
    formData.append('category', data.category)
    formData.append('farmlandId', data.farmlandId)
    formData.append('description', data.description)
    formData.append('stock[value]', data.stock.value)
    formData.append('stock[unit]', data.stock.unit)
    formData.append('price[value]', data.price.value)
    formData.append('price[unit]', data.price.unit)
    images.forEach(imageItem => {
      if (imageItem.file) {
        formData.append('images', imageItem.file)
      }
    })
    createListing.mutate(formData, {
      onSuccess: () => {
        reset()
        setImages([])
      }
    })
  }

  return (
    <Card className='border-border shadow-md'>
      <CardHeader className='border-b border-border pb-4'>
        <CardTitle className='flex items-center gap-2 text-accent'>
          <Package className='h-5 w-5' /> Sell Harvested Stock
        </CardTitle>
        <p className='text-sm text-accent/70'>
          List crops that are already harvested and ready for immediate
          delivery.
        </p>
      </CardHeader>
      <CardContent className='p-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label>Product Title</Label>
              <Input
                {...register('title', {
                  required: 'Product title is required'
                })}
                placeholder='e.g. Fresh Organic Tomatoes'
              />
              {errors.title && (
                <span className='text-destructive text-xs'>
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className='space-y-2'>
              <Label>Category</Label>
              <Controller
                name='category'
                control={control}
                rules={{ required: 'Product category is required' }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select type...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='vegetable'>Vegetable</SelectItem>
                      <SelectItem value='fruit'>Fruit</SelectItem>
                      <SelectItem value='grain'>Grain</SelectItem>
                      <SelectItem value='pulse'>Pulse</SelectItem>
                      <SelectItem value='oilseed'>Oilseed</SelectItem>
                      <SelectItem value='spice'>Spices</SelectItem>
                      <SelectItem value='other'>Others</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <span className='text-destructive text-xs'>
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Source Farmland</Label>
            <Controller
              name='farmlandId'
              control={control}
              rules={{ required: 'Specify farmland' }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Which land produced this?' />
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
            {errors.farmlandId && (
              <span className='text-destructive text-xs'>
                {errors.farmlandId.message}
              </span>
            )}
          </div>

          <div className='p-4 bg-muted/30 rounded-lg space-y-4 border border-border/50'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label>Available Stock</Label>
                <div className='flex gap-2'>
                  <Input
                    type='number'
                    step='0.01'
                    {...register('stock.value', { required: 'Value required' })}
                    placeholder='0.00'
                  />

                  <select
                    {...register('stock.unit')}
                    className='bg-background border rounded-md px-2 text-sm'
                  >
                    <option value='kg'>Kg</option>
                    <option value='quintal'>Quintal</option>
                    <option value='ton'>Ton</option>
                  </select>
                </div>
                {errors.stock?.value && (
                  <span className='text-destructive text-xs'>
                    {errors.stock?.value.message}
                  </span>
                )}

                {errors.stock?.unit && (
                  <span className='text-destructive text-xs'>
                    {errors.stock.unit.message}
                  </span>
                )}
              </div>

              <div className='space-y-2'>
                <Label>Selling Price</Label>
                <div className='flex gap-2'>
                  <Input
                    type='number'
                    {...register('price.value', {
                      required: 'value is required'
                    })}
                    placeholder='₹ 0.00'
                  />
                  <select
                    {...register('price.unit')}
                    className='bg-background border rounded-md px-2 text-sm'
                  >
                    <option value='per_kg'>/ Kg</option>
                    <option value='per_quintal'>/ Quintal</option>
                    <option value='per_ton'>/ Ton</option>
                  </select>
                </div>
                {errors.price?.value && (
                  <span className='text-destructive text-xs'>
                    {errors.price?.value.message}
                  </span>
                )}

                {errors.price?.unit && (
                  <span className='text-destructive text-xs'>
                    {errors.price.unit.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Description</Label>
            <Textarea
              {...register('description', {
                required: 'Description is required'
              })}
              placeholder='Details about freshness, packaging, etc.'
              className='h-24'
            />
            {errors.description && (
              <span className='text-destructive text-xs'>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className='space-y-2'>
            <Label>Product Photos</Label>
            <ImageUploadPreview images={images} setImages={setImages} />
          </div>

          <Button
            type='submit'
            className='w-full bg-primary hover:bg-primary/80 h-11 text-base cursor-pointer'
            disabled={createListing.isPending}
          >
            {createListing.isPending ? (
              <Loader2 className='animate-spin mr-2' />
            ) : (
              <UploadCloud className='mr-2 h-4 w-4' />
            )}
            Publish Product
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default HarvestedForm
