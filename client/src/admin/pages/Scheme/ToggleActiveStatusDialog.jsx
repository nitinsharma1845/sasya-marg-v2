import { useToggleSchemeStatus } from '@/admin/hooks/scheme.hooks'
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
import { PowerOff } from 'lucide-react'
import { useState } from 'react'

const ToggleActiveStatusDialog = ({ scheme }) => {
  const [open, setOpen] = useState(false)
  const toggle = useToggleSchemeStatus()

  const handleToggle = () => {
    toggle.mutate(scheme._id, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={scheme?.isActive ? 'destructive' : 'default'}>
          <PowerOff className='w-4 h-4' />{' '}
          {scheme?.isActive ? 'Deactivate' : 'Activate'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will {scheme?.isActive ? 'Deactivate' : 'Activate'} this
            scheme to all farmer who are eligible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            type='submit'
            onClick={handleToggle}
            variant={scheme?.isActive ? 'destructive' : 'default'}
          >
            {scheme?.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ToggleActiveStatusDialog
