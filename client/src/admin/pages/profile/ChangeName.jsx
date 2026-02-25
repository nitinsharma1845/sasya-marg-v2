import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { User, UserCog, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useChangName } from '@/admin/hooks/admin.hooks'

const NameField = ({ register, errors, defaultValue }) => {
  return (
    <div className='space-y-2'>
      <Label
        htmlFor='fullname'
        className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'
      >
        New Display Name
      </Label>
      <div className='relative'>
        <Input
          {...register('fullname', {
            required: 'Full name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters'
            },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Name can only contain letters'
            }
          })}
          id='fullname'
          type='text'
          placeholder='Enter your full name'
          defaultValue={defaultValue}
          className='bg-muted/30 border-border focus:ring-primary h-11 pl-10'
        />
        <User className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
      </div>
      {errors.fullname && (
        <p className='text-[10px] font-bold mt-1 text-destructive uppercase tracking-tight'>
          {errors.fullname.message}
        </p>
      )}
    </div>
  )
}

const ChangeName = ({ currentName }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: { fullname: currentName }
  })
  const [open, setOpen] = useState(false)
  const change = useChangName()

  const handleUpdateName = data => {
    const payload = {
      newFullname: data.fullname
    }
    change.mutate(payload, {
      onSuccess: () => {
        setOpen(false)
        reset()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex flex-col items-center justify-center p-4 rounded-(--radius) bg-secondary hover:bg-border transition-all group border border-transparent hover:border-primary/20'>
          <User className='w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform' />
          <span className='text-[10px] font-bold uppercase tracking-tight text-center'>
            Update Name
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-100 bg-card border-border'>
        <DialogHeader>
          <div className='flex items-center gap-2 mb-2'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <UserCog className='w-5 h-5 text-primary' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              Change Identity
            </DialogTitle>
          </div>
          <DialogDescription className='text-muted-foreground text-xs font-medium'>
            Update your professional display name across the Sasya Marg
            platform.
          </DialogDescription>
        </DialogHeader>

        <form
          className='grid gap-6 py-4'
          onSubmit={handleSubmit(handleUpdateName)}
        >
          <NameField
            register={register}
            errors={errors}
            defaultValue={currentName}
          />

          <DialogFooter>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-primary text-primary-foreground hover:opacity-90 font-bold uppercase tracking-widest text-xs h-11 shadow-md'
            >
              <CheckCircle2 className='w-4 h-4 mr-2' />
              {isSubmitting ? 'Updating...' : 'Confirm Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeName
