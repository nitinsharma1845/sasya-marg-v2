import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateBuyerAddress } from '@/hooks/buyer.hooks'
import {
  Building2,
  Loader2,
  MapPin,
  Navigation,
  Pencil,
  Plus,
  Save
} from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const UpdateAddressDialog = ({ address }) => {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useUpdateBuyerAddress()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      label: address?.label || '',
      addressLine: address?.addressLine || '',
      city: address?.city || '',
      state: address?.state || '',
      pincode: address?.pincode | ''
    }
  })

  const onSubmit = data => {
    mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={'icon-sm'}
          variant='outline'
          className='cursor-pointer rounded-full p-0.5'
        >
          {address ? (
            <Pencil />
          ) : (
            <>
            <Plus />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-125 bg-card border-border shadow-2xl'>
        <DialogHeader>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2.5 bg-primary/10 rounded-xl'>
              <MapPin className='h-6 w-6 text-primary' />
            </div>
            <div>
              <DialogTitle className='text-xl font-bold text-foreground'>
                {address ? 'Edit Address' : 'New Address'}
              </DialogTitle>
              <DialogDescription className='text-muted-foreground'>
                Where should we send your orders?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 mt-2'>
          <div className='space-y-4'>
            <div className='grid gap-2'>
              <Label htmlFor='label' className='text-foreground font-medium'>
                Address Label
              </Label>
              <div className='relative'>
                <div className='absolute left-3 top-2.5 text-muted-foreground'>
                  <MapPin className='h-4 w-4' />
                </div>
                <Input
                  id='label'
                  placeholder='e.g. Home, Office, Farmhouse'
                  className='pl-9 bg-secondary/20 border-input focus-visible:ring-primary focus-visible:border-primary transition-all'
                  {...register('label')}
                />
              </div>
              {errors.label && (
                <p className='text-xs text-destructive font-medium'>
                  {errors.label.message}
                </p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label
                htmlFor='addressLine'
                className='text-foreground font-medium'
              >
                Full Address
              </Label>
              <Textarea
                id='addressLine'
                placeholder='Street address, apartment, suite, landmark...'
                className='min-h-20 bg-secondary/20 border-input focus-visible:ring-primary focus-visible:border-primary resize-none transition-all'
                {...register('addressLine', {
                  required: 'Address is required'
                })}
              />
              {errors.addressLine && (
                <p className='text-xs text-destructive font-medium'>
                  {errors.addressLine.message}
                </p>
              )}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-6 gap-4'>
              <div className='col-span-2 sm:col-span-3 grid gap-2'>
                <Label htmlFor='city' className='text-foreground font-medium'>
                  City
                </Label>
                <div className='relative'>
                  <Building2 className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='city'
                    placeholder='City'
                    className='pl-9 bg-secondary/20 border-input focus-visible:ring-primary focus-visible:border-primary'
                    {...register('city', { required: 'City must be filled' })}
                  />
                </div>
                {errors.city && (
                  <p className='text-xs text-destructive font-medium'>
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className='col-span-2 sm:col-span-3 grid gap-2'>
                <Label htmlFor='state' className='text-foreground font-medium'>
                  State
                </Label>
                <div className='relative'>
                  <MapPin className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='state'
                    placeholder='State'
                    className='pl-9 bg-secondary/20 border-input focus-visible:ring-primary focus-visible:border-primary'
                    {...register('state', { required: 'State must be filled' })}
                  />
                </div>
                {errors.state && (
                  <p className='text-xs text-destructive font-medium'>
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div className='col-span-2 sm:col-span-6 grid gap-2'>
                <Label
                  htmlFor='pincode'
                  className='text-foreground font-medium'
                >
                  Pincode
                </Label>
                <div className='relative'>
                  <Navigation className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='pincode'
                    placeholder='000000'
                    type='number'
                    className='pl-9 bg-secondary/20 border-input focus-visible:ring-primary focus-visible:border-primary font-mono tracking-widest'
                    {...register('pincode', {
                      minLength: { value: 6, message: 'Invalid Pincode' },
                      maxLength: { value: 6, message: 'Invalid Pincode' }
                    })}
                  />
                </div>
                {errors.pincode && (
                  <p className='text-xs text-destructive font-medium'>
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className='gap-4 sm:gap-1 pt-2'>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type='submit'
              className='bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]'
              disabled={isPending || isSubmitting}
            >
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                <>
                  <Save className='mr-2 h-4 w-4' />
                  Save Address
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateAddressDialog
