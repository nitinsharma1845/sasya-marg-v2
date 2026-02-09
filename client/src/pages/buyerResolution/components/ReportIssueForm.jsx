import ImageUploadPreview from '@/pages/listing/components/ImageUploadPreview'
import { Loader, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useReportProduct } from '@/hooks/productReport.hooks'
import { Button } from '@/components/ui/button'

const ReportIssueForm = () => {
  const [images, setImages] = useState([])
  const { mutate, isPending } = useReportProduct()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({ mode: 'onChange' })

  const issues = [
    'FAKE_PRODUCT',
    'MISLEADING_INFO',
    'PRICE_FRAUD',
    'DUPLICATE_LISTING',
    'SPAM',
    'OTHER'
  ]

  const reportProduct = data => {
    const formData = new FormData()

    formData.append('reason', data.reason)
    if (data?.description) {
      formData.append('description', data.description)
    }
    if (data?.refrence) {
      formData.append('refrence', data.refrence)
    }

    images.forEach(image => {
      if (image.file) {
        formData.append('images', image.file)
      }
    })

    mutate(formData, {
      onSuccess: () => {
        reset()
        setImages([])
      }
    })
  }

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-semibold mb-1'>Report an Issue</h2>
        <p className='text-sm text-muted-foreground'>
          Let us know about suspicious behavior, fake listings, or harassment.
        </p>
      </div>

      <form onSubmit={handleSubmit(reportProduct)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Issue Type</label>
            <select
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
              {...register('reason', { required: 'Reason is required' })}
            >
              {issues.map(issue => (
                <option key={issue}>{issue}</option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Reference (Optional)</label>
            <input
              {...register('refrence')}
              type='text'
              placeholder='Listing ID or User Name'
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Description</label>
          <textarea
            {...register('description')}
            rows={5}
            placeholder='Please describe what happened in detail...'
            className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none'
          ></textarea>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>
            Evidence (Screenshots/Photos)
          </label>
          <ImageUploadPreview images={images} setImages={setImages} />
        </div>

        <Button
        variant='destructive'
        className={"cursor-pointer"}
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? (
            <Loader className='w-4 h-4 mr-2 animate-spin' />
          ) : (
            <span className='flex gap-2 items-center'>
              <Send className='w-4 h-4 mr-2' /> Submit Report
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}

export default ReportIssueForm
