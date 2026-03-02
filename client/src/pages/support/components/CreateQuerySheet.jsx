import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Sprout,
  Cloud,
  Wrench,
  IndianRupee,
  Loader2,
  CheckCircle2,
  PackageSearch,
  MessageSquareMore,
  User
} from 'lucide-react'
import { toast } from 'sonner'
import { usePostQuery, useUpdateQuery } from '@/hooks/query.hooks'
import { useAuthStore } from '@/store/useAuthStore'

const CreateQuerySheet = ({
  isOpen,
  onClose,
  editData = null,
  forBlock = false
}) => {
  const { user } = useAuthStore.getState()
  const updateMutation = useUpdateQuery()
  const { mutate, isPending: isCreatePending } = usePostQuery()

  const isEditMode = !!editData
  const isPending = isCreatePending || updateMutation.isPending

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      inquiry: 'crop',
      priority: 'medium',
      subject: '',
      message: ''
    }
  })

  const watchedInquiry = watch('inquiry')

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setValue('subject', editData.subject)
        setValue('message', editData.message)
        setValue('inquiry', editData.inquiry)
        setValue('priority', editData.priority)
      } else {
        reset({
          inquiry: 'crop',
          priority: 'medium',
          subject: '',
          message: ''
        })
      }
    }
  }, [isOpen, editData, setValue, reset])

  const onSubmit = data => {
    if (isEditMode) {
      const payload = {
        queryId: editData._id,
        payload: {
          subject: data.subject,
          message: data.message
        }
      }

      updateMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Query updated successfully')
          onClose()
        },
        onError: error => {
          toast.error(error.response?.data?.message || 'Failed to update query')
        }
      })
    } else {
      const payload = {
        ...data,
        fullname: user?.fullname || 'Farmer',
        email: user?.email || 'N/A',
        phone: user?.phone || 'N/A'
      }

      mutate(payload, {
        onSuccess: () => {
          toast.success('Query posted! Wait for reply')
          reset()
          onClose()
        },
        onError: err => {
          toast.error(err.response?.data?.message || 'Failed to post query')
        }
      })
    }
  }

  const inquiryTypes = [
    { id: 'crop', label: 'Crop Issue', icon: Sprout, color: 'text-chart-1' },
    { id: 'weather', label: 'Weather', icon: Cloud, color: 'text-chart-2' },
    {
      id: 'product',
      label: 'Product',
      icon: PackageSearch,
      color: 'text-accent'
    },
    {
      id: 'pricing',
      label: 'Mandi Price',
      icon: IndianRupee,
      color: 'text-chart-3'
    },
    { id: 'technical', label: 'App Help', icon: Wrench, color: 'text-chart-4' },
    {
      id: 'other',
      label: 'Other Issue',
      icon: MessageSquareMore,
      color: 'text-chart-5'
    }
  ]
  const blockedInquiryTypes = [
    { id: 'account', label: 'Account', icon: User, color: 'text-chart-1' }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent
        side='bottom'
        className='h-[90vh] rounded-t-xl sm:h-full sm:max-w-md sm:rounded-none sm:side-right overflow-y-auto px-5'
      >
        <SheetHeader className='mb-6 text-left'>
          <SheetTitle className='text-2xl font-bold text-foreground'>
            {isEditMode ? 'Update Query' : 'Ask Query'}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? 'You can update the Subject and Message while the query is Open.'
              : 'Describe your issue clearly. Our experts will get back to you shortly.'}

            {forBlock &&
              'Describe your issue clearly, paste exact issue posted on the block page, and also clearify your point regarding the the action of admin'}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 pb-8 p-1'>
          {!isEditMode && !forBlock && (
            <div className='space-y-3'>
              <label className='text-sm font-medium text-foreground'>
                Inquiry Type
              </label>
              <div className='grid grid-cols-2 gap-3'>
                {inquiryTypes.map(type => (
                  <div
                    key={type.id}
                    onClick={() => setValue('inquiry', type.id)}
                    className={`
                        cursor-pointer flex flex-col items-center justify-center rounded-lg border p-4 transition-all
                        ${
                          watchedInquiry === type.id
                            ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary'
                            : 'border-border bg-card hover:bg-secondary/50'
                        }
                    `}
                  >
                    <type.icon
                      className={`mb-2 h-6 w-6 ${
                        watchedInquiry === type.id ? 'text-primary' : type.color
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        watchedInquiry === type.id
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {type.label}
                    </span>
                    {watchedInquiry === type.id && (
                      <div className='absolute top-2 right-2'>
                        <CheckCircle2 className='h-3 w-3 text-primary' />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {forBlock && (
            <div className='space-y-3'>
              <label className='text-sm font-medium text-foreground mb-3'>
                Inquiry Type
              </label>
              <div className='grid grid-cols-2 gap-3 mt-3'>
                {blockedInquiryTypes.map(type => (
                  <div
                    key={type.id}
                    onClick={() => setValue('inquiry', type.id)}
                    className={`
                        cursor-pointer flex flex-col items-center justify-center rounded-lg border p-4 transition-all
                        ${
                          watchedInquiry === type.id
                            ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary'
                            : 'border-border bg-card hover:bg-secondary/50'
                        }
                    `}
                  >
                    <type.icon
                      className={`mb-2 h-6 w-6 ${
                        watchedInquiry === type.id ? 'text-primary' : type.color
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        watchedInquiry === type.id
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {type.label}
                    </span>
                    {watchedInquiry === type.id && (
                      <div className='absolute top-2 right-2'>
                        <CheckCircle2 className='h-3 w-3 text-primary' />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              Subject
            </label>
            <Input
              {...register('subject', { required: 'Subject is required' })}
              placeholder='Brief title of your issue'
              className={`bg-background ${
                errors.subject ? 'border-destructive' : ''
              }`}
            />
            {errors.subject && (
              <span className='text-xs text-destructive'>
                {errors.subject.message}
              </span>
            )}
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              Message
            </label>
            <Textarea
              {...register('message', {
                required: 'Please describe your issue'
              })}
              placeholder='Explain your problem in detail...'
              className={`min-h-30 bg-background resize-none ${
                errors.message ? 'border-destructive' : ''
              }`}
            />
            {errors.message && (
              <span className='text-xs text-destructive'>
                {errors.message.message}
              </span>
            )}
          </div>

          {!isEditMode && !forBlock && (
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-foreground'>
                Priority
              </label>
              <Controller
                name='priority'
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='bg-background'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='low'>Low - General Inquiry</SelectItem>
                      <SelectItem value='medium'>Medium - Need Help</SelectItem>
                      <SelectItem value='high'>
                        High - As soon as Possible
                      </SelectItem>
                      <SelectItem value='urgent'>
                        Urgent - Urgent Issue
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}

          <Button
            type='submit'
            disabled={isPending}
            className='w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 cursor-pointer'
          >
            {isPending ? (
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
            ) : isEditMode ? (
              'Update Query'
            ) : (
              'Submit Query'
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default CreateQuerySheet
