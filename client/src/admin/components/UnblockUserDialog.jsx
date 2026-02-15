import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useUnBlockFarmer } from '../hooks/admin.hooks'
import { useState } from 'react'

export default function UnblockUserDialog ({ user }) {
  const unBlockFarmer = useUnBlockFarmer()
  const [open, setOpen] = useState(false)

  const handleUnblockUser = () => {
    if (user.role === 'farmer') {
      unBlockFarmer.mutate(user._id)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='secondary'>Unblock User</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will restore access for <strong>{user.fullname}</strong>. They
            will be able to access the platform and their data immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUnblockUser}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            Unblock
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
