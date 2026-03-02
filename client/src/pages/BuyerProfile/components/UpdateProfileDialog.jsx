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
import { useUpdateBuyerProfile } from '@/hooks/buyer.hooks'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function UpdateProfileDialog({ user }) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: user?.email || '',
      fullname: user?.fullname || ''
    }
  })

  const { mutate: updateProfile } = useUpdateBuyerProfile()

  const onSubmit = (data) => {
    updateProfile(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 shadow-sm border-primary/20 hover:bg-primary/5 cursor-pointer">
          <Pencil className="h-4 w-4 text-primary" /> 
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 bg-card text-card-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Profile</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Make changes to your profile here. Click save when you&apos;re done.
            Phone number cannot be changed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fullname" className="text-foreground">
              Fullname
            </Label>
            <Input
              id="fullname"
              className="border-input focus-visible:ring-ring"
              {...register('fullname', { required: 'Fullname is required' })}
            />
            {errors.fullname && (
              <p className="text-xs text-destructive font-medium">
                {errors.fullname.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              className="border-input focus-visible:ring-ring"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address'
                }
              })}
            />
            {errors.email && (
              <p className="text-xs text-destructive font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="border-input">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}