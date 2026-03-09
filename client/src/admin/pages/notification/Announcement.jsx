import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Megaphone } from 'lucide-react'
import CreateAnnouncementDialog from './CreateAnnouncementDialog'

const Announcement = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='space-y-6'>
      <div className='border-b pb-5'>
        <h2 className='text-2xl font-bold tracking-tight'>Announcements</h2>
        <p className='text-muted-foreground text-sm'>
          Broadcast dashboard messages to farmers or buyers.
        </p>
      </div>

      <div className='flex items-center justify-center py-20'>
        <Button
          size='lg'
          onClick={() => setOpen(true)}
          className='gap-3 px-10 py-7 text-lg font-semibold shadow-lg'
        >
          <Megaphone size={22} />
          Create Announcement
        </Button>
      </div>

      <CreateAnnouncementDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

export default Announcement
