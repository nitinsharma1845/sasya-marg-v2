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
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useModerateHarvestedListing } from '../hooks/moderation.hooks'

export default function ApproveListingDialog({ product }) {
  const [open, setOpen] = useState(false)
  const moderateProduct = useModerateHarvestedListing()

  const handleApprove = () => {
    const payload = {
      listingId: product._id,
      action: 'approved'
    }

    moderateProduct.mutate(payload, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className='bg-primary hover:bg-primary/90 text-primary-foreground'>
          <CheckCircle2 className='mr-2 h-4 w-4' /> Approve Listing
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
          <AlertDialogDescription>
            This will publish <strong>{product?.title}</strong> to the buyer
            marketplace. Buyers will be able to view and wishlist this listing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleApprove}
            className='bg-primary text-primary-foreground hover:bg-primary/90'
          >
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
