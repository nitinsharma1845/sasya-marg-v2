import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Announcement from './Announcement'
import Campaign from './Campaign'

const AdminNotificationPage = () => {
  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Notifications & Marketing</h1>

      <Tabs defaultValue='announcement' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 mb-8'>
          <TabsTrigger value='announcement'>Announcements</TabsTrigger>
          <TabsTrigger value='email'>Email Campaign</TabsTrigger>
        </TabsList>

        <TabsContent value='announcement'>
          <Announcement />
        </TabsContent>

        <TabsContent value='email'>
          <Campaign />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminNotificationPage
